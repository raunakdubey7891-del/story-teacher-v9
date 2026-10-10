import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from './supabase'

// Supabase Auth: email + password and Google. Without Supabase keys the app runs as a local guest (no login needed).
export const authEnabled=!!supabase
export type AuthResult={error?:string;needsConfirm?:boolean}
type AuthCtx={user:User|null;loading:boolean;signUp:(name:string,email:string,password:string)=>Promise<AuthResult>;signIn:(email:string,password:string)=>Promise<AuthResult>;google:()=>Promise<AuthResult>;signOut:()=>Promise<void>}
const Ctx=createContext<AuthCtx>(null as any)

const nice=(m:string)=>{const x=m.toLowerCase()
 if(x.includes('invalid login'))return 'Wrong email or password.'
 if(x.includes('already registered'))return 'This email is already registered. Please sign in.'
 if(x.includes('not confirmed'))return 'Please confirm your email first, then sign in.'
 if(x.includes('password')&&x.includes('characters'))return 'Password is too short.'
 if(x.includes('rate limit')||x.includes('too many'))return 'Too many tries. Please wait a minute and try again.'
 if(x.includes('provider')&&x.includes('not enabled'))return 'Google sign-in is not turned on yet.'
 return m}

export function AuthProvider({children}:{children:ReactNode}){
 const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(authEnabled)
 useEffect(()=>{if(!supabase)return;let off=false
  supabase.auth.getSession().then(({data})=>{if(!off){setUser(data.session?.user??null);setLoading(false)}}).catch(()=>{if(!off)setLoading(false)})
  const {data:sub}=supabase.auth.onAuthStateChange((_e,session)=>{setUser(session?.user??null);setLoading(false)})
  return()=>{off=true;sub.subscription.unsubscribe()}},[])

 const signIn=async(email:string,password:string):Promise<AuthResult>=>{if(!supabase)return {error:'Sign-in is not set up yet.'}
  const {error}=await supabase.auth.signInWithPassword({email,password});if(error)return {error:nice(error.message),needsConfirm:/not confirmed/i.test(error.message)};return {}}

 // After sign-up the student is signed in straight away (turn "Confirm email" off in Supabase, see DEPLOY.md).
 // If confirmation is still on, we try to sign in anyway and explain what to do.
 const signUp=async(name:string,email:string,password:string):Promise<AuthResult>=>{if(!supabase)return {error:'Sign-up is not set up yet.'}
  const {data,error}=await supabase.auth.signUp({email,password,options:{data:{full_name:name}}})
  if(error)return {error:nice(error.message)}
  if(data.user&&data.user.identities&&data.user.identities.length===0)return {error:'This email is already registered. Please sign in.'}
  if(data.session)return {}
  const r=await signIn(email,password)
  return r.error?{needsConfirm:true,error:'Account created. Check your email to confirm it, then sign in.'}:r}

 const google=async():Promise<AuthResult>=>{if(!supabase)return {error:'Sign-in is not set up yet.'}
  const {error}=await supabase.auth.signInWithOAuth({provider:'google',options:{redirectTo:`${window.location.origin}/classes`}});return error?{error:nice(error.message)}:{}}

 const signOut=async()=>{if(supabase)await supabase.auth.signOut();setUser(null)}
 return <Ctx.Provider value={{user,loading,signUp,signIn,google,signOut}}>{children}</Ctx.Provider>}
export const useAuth=()=>useContext(Ctx)
