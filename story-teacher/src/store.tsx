import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react'
import type { QuizResult, Status, PracticeBest } from './types/curriculum'
import { curriculum, topicContent } from './data/curriculum'
import { dbEnabled, fetchCurriculum, fetchContent, fetchProgress, saveTopicStatus, saveQuizResult, setDbUser } from './lib/db'
import { useAuth } from './lib/auth'
// Local state + localStorage always work (one saved state per signed-in student).
// When Supabase is configured and a student is signed in, data is also loaded from / saved to the database.
export type AppState={selectedClass?:string;selectedStream?:string;selectedSubject?:string;selectedChapter?:string;selectedTopic?:string;
 learningProgress:Record<string,Status>;quizResults:Record<string,QuizResult>;
 weak:Record<string,string[]>;practiceBest:Record<string,PracticeBest>}
const init:AppState={learningProgress:{},quizResults:{},weak:{},practiceBest:{}}
const keyFor=(uid?:string)=>`story-teacher:${uid||'guest'}`
const load=(uid?:string):AppState=>{try{const raw=localStorage.getItem(keyFor(uid))??(uid?null:localStorage.getItem('story-teacher'));return {...init,...JSON.parse(raw||'{}')}}catch{return init}}
const Ctx=createContext<{s:AppState;set:(p:Partial<AppState>)=>void;toast:string;say:(m:string)=>void;db:boolean}>(null as any)

// A new StoreInner is mounted whenever the student signs in or out, so one student never sees another's progress.
export const StoreProvider=({children}:{children:ReactNode})=>{const {user}=useAuth()
 return <StoreInner key={user?.id||'guest'} uid={user?.id}>{children}</StoreInner>}

function StoreInner({uid,children}:{uid?:string;children:ReactNode}){
 const sync=dbEnabled&&!!uid;setDbUser(uid??null)
 const [s,setS]=useState(()=>load(uid));const [toast,setToast]=useState('');const [ready,setReady]=useState(!sync);const [,setVer]=useState(0)
 const synced=useRef<{progress:Record<string,Status>;results:Record<string,QuizResult>}>({progress:{},results:{}})
 useEffect(()=>{localStorage.setItem(keyFor(uid),JSON.stringify(s))},[s])
 useEffect(()=>{if(toast){const t=setTimeout(()=>setToast(''),2200);return()=>clearTimeout(t)}},[toast])
 // 1. Hydrate from the database once.
 useEffect(()=>{if(!sync)return;let off=false
  ;(async()=>{const [cur,prog]=await Promise.all([fetchCurriculum(),fetchProgress()]);if(off)return
   if(cur)curriculum.splice(0,curriculum.length,...cur)
   if(prog){synced.current={progress:{...prog.progress},results:{...prog.results}};setS(o=>({...o,learningProgress:{...o.learningProgress,...prog.progress},quizResults:{...o.quizResults,...prog.results}}))}
   setReady(true);setVer(v=>v+1)})().catch(()=>{if(!off){setToast('Database unreachable. Using local data.');setReady(true)}})
  return()=>{off=true}},[])
 // 2. Load lesson content.
 useEffect(()=>{if(!sync||!ready)return
  fetchContent().then(c=>{if(c){Object.assign(topicContent,c);setVer(v=>v+1)}}).catch(()=>{})},[ready])
 // 3. Push progress and quiz results as they change.
 useEffect(()=>{if(!sync||!ready)return
  Object.entries(s.learningProgress).forEach(([id,st])=>{if(synced.current.progress[id]!==st){synced.current.progress[id]=st;saveTopicStatus(id,st).catch(()=>setToast('Could not save progress'))}})
  Object.entries(s.quizResults).forEach(([id,r])=>{if(synced.current.results[id]!==r){synced.current.results[id]=r;saveQuizResult(id,r).catch(()=>setToast('Could not save quiz result'))}})},[s.learningProgress,s.quizResults,ready])
 return <Ctx.Provider value={{s,set:p=>setS(o=>({...o,...p})),toast,say:setToast,db:sync}}>{children}
  {toast&&<div role="status" className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-soft text-ink border border-line px-5 py-3 rounded-full shadow-xl z-50">{toast}</div>}</Ctx.Provider>}
export const useStore=()=>useContext(Ctx)
