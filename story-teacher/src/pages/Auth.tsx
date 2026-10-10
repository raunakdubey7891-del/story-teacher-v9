import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth, authEnabled } from '../lib/auth'
import { card, btn, btn2, Page } from '../components/ui'

const field='w-full rounded-md border border-white/10 bg-soft px-4 py-3 focus:outline-none focus:border-white/60'
const GoogleG=()=><svg width="20" height="20" viewBox="0 0 48 48" aria-hidden><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"/><path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>

// One page for both sign in (/signin) and sign up (/signup). Once a user exists, they are sent straight into the app.
export default function Auth(){const loc=useLocation();const nav=useNavigate();const {user,signIn,signUp,google}=useAuth()
 const signup=loc.pathname==='/signup';const from=(loc.state as {from?:string}|null)?.from||'/classes'
 const [name,setName]=useState('');const [email,setEmail]=useState('');const [pw,setPw]=useState('');const [err,setErr]=useState('');const [busy,setBusy]=useState(false)
 useEffect(()=>{if(user)nav(from,{replace:true})},[user])
 useEffect(()=>{setErr('')},[signup])
 const submit=async(e:FormEvent)=>{e.preventDefault();setErr('')
  if(signup&&!name.trim())return setErr('Please enter your name.')
  if(pw.length<8)return setErr('Password must be at least 8 characters.')
  setBusy(true);const r=signup?await signUp(name.trim(),email.trim(),pw):await signIn(email.trim(),pw);setBusy(false);if(r.error)setErr(r.error)}
 const g=async()=>{setErr('');setBusy(true);const r=await google();if(r.error){setBusy(false);setErr(r.error)}}
 if(!authEnabled)return <Page><div className={card+' max-w-md mx-auto text-center'}><p className="font-display text-2xl">Accounts are not set up yet</p>
  <p className="text-ink/60 mt-2">Add your Supabase keys to turn on sign up and sign in. Until then you can keep learning on this device.</p><Link className={btn+' mt-5'} to="/classes">Continue learning</Link></div></Page>
 return <Page><div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,#4a0a10_0%,#0B0B0F_60%)]" aria-hidden/><div className="max-w-md mx-auto"><div className="rounded-lg bg-black/75 border border-white/10 backdrop-blur p-8 sm:p-10 shadow-2xl shadow-black/60">
  <div className="font-display font-black text-2xl tracking-tight text-brand mb-5">STORY<span className="text-ink">TEACHER</span></div>
  <h1 className="font-display font-black text-3xl">{signup?'Create your account':'Welcome back'}</h1>
  <p className="text-ink/60 mt-1 mb-6">{signup?'It takes a few seconds. You will be signed in right away.':'Sign in to continue your stories.'}</p>
  <button type="button" onClick={g} disabled={busy} className={btn2+' w-full justify-center'}><GoogleG/>{signup?'Sign up with Google':'Sign in with Google'}</button>
  <div className="flex items-center gap-3 my-5 text-xs text-ink/50"><span className="h-px flex-1 bg-line"/>or use email<span className="h-px flex-1 bg-line"/></div>
  <form onSubmit={submit} className="grid gap-4" noValidate>
   {signup&&<label className="grid gap-1 text-sm font-semibold">Your name<input className={field} value={name} onChange={e=>setName(e.target.value)} autoComplete="name" placeholder="Aarav"/></label>}
   <label className="grid gap-1 text-sm font-semibold">Email<input className={field} type="email" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email" required placeholder="you@example.com"/></label>
   <label className="grid gap-1 text-sm font-semibold">Password<input className={field} type="password" value={pw} onChange={e=>setPw(e.target.value)} autoComplete={signup?'new-password':'current-password'} required minLength={8} placeholder="At least 8 characters"/></label>
   {err&&<p role="alert" className="rounded-md bg-brand/15 text-coral font-semibold text-sm p-3">{err}</p>}
   <button className={btn+' justify-center'} disabled={busy||!email||!pw}>{busy?'Please wait…':signup?'Sign up':'Sign in'}</button></form>
  <p className="text-sm text-ink/60 mt-5 text-center">{signup?'Already have an account? ':'New here? '}<Link className="font-bold text-ink hover:underline underline-offset-2" to={signup?'/signin':'/signup'} state={loc.state}>{signup?'Sign in':'Create an account'}</Link></p></div></div></Page>}
