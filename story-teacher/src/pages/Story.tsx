import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, ArrowLeft, ArrowRight, Volume2, VolumeX } from 'lucide-react'
import SceneArt from '../components/SceneArt'
import { topicContent } from '../data/curriculum'
import { useStore } from '../store'
import { useCtx } from '../hooks/useCtx'
import { card, btn, btn2, Crumbs, Page, Empty } from '../components/ui'


export default function Story(){const {topic,cls,sub}=useCtx();const [i,setI]=useState(0);const [talk,setTalk]=useState(false);const nav=useNavigate();const {set,s}=useStore()
 const c=topic&&topicContent[topic.id];const n=c?c.scenes.length:0
 useEffect(()=>{const h=(e:KeyboardEvent)=>{if(e.key==='ArrowRight')setI(x=>Math.min(x+1,n));if(e.key==='ArrowLeft')setI(x=>Math.max(x-1,0))};window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h)},[n])
 useEffect(()=>{setI(0)},[topic?.id])
 const speak=(t:string)=>{if(!('speechSynthesis' in window))return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang=/[ऀ-ॿ]/.test(t)?'hi-IN':'en-IN';u.rate=.85;u.pitch=1.15;window.speechSynthesis.speak(u)}
 useEffect(()=>{if(talk&&c&&i<n){const sc=c.scenes[i];speak(sc.title+'. '+sc.text)}if(!talk&&'speechSynthesis' in window)window.speechSynthesis.cancel()},[talk,i])
 useEffect(()=>()=>{if('speechSynthesis' in window)window.speechSynthesis.cancel()},[])
 if(!c||!topic)return <Page><Empty/></Page>;const sc=c.scenes[Math.min(i,n-1)];const end=i>=n
 return <Page><Crumbs items={[[topic.name,'/learn']]}/><div className="grid lg:grid-cols-5 gap-6">
  {/* The "player": scene artwork with a title strip, a seek bar made of scene segments, and the read-aloud toggle. */}
  <div className="lg:col-span-3"><div className="relative rounded-lg overflow-hidden bg-black shadow-2xl shadow-black/70 ring-1 ring-white/10">
   {end?<div className="bg-gradient-to-br from-brand/50 via-surface to-black grid place-items-center min-h-[300px] lg:min-h-[460px] p-8 text-center"><div><Trophy className="mx-auto text-sun" size={64}/><p className="font-display font-black text-3xl mt-4">Story complete! 🎉</p><p className="text-ink/70 mt-2">You finished “{c.storyTitle}”</p></div></div>
   :<SceneArt emoji={sc.emoji} label={sc.title} subject={sub?.name||''} early={cls?.level==='Early Learning'} seed={i+1+topic.name.length}/>}
   <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 sm:px-5 pt-16 pb-4">
    {!end&&<><p className="text-xs font-bold text-white/70">Scene {i+1} of {n}</p><p className="font-display font-extrabold text-xl md:text-2xl">{sc.title}</p></>}
    <div className="flex items-center gap-3 mt-3"><div className="flex gap-1.5 flex-1" aria-label={`Scene ${Math.min(i+1,n)} of ${n}`}>{c.scenes.map((_,k)=><button key={k} aria-label={`Go to scene ${k+1}`} onClick={()=>setI(k)} className="group flex-1 py-2"><span className={`block h-1 rounded-full transition group-hover:h-1.5 ${k<=i?'bg-brand':'bg-white/30'}`}/></button>)}</div>
     <button onClick={()=>setTalk(t=>!t)} aria-pressed={talk} aria-label={talk?'Turn read-aloud off':'Turn read-aloud on'} className={`shrink-0 grid place-items-center w-10 h-10 rounded-full transition ${talk?'bg-white text-black':'bg-white/15 hover:bg-white/25'}`}>{talk?<Volume2 size={20}/>:<VolumeX size={20}/>}</button></div></div></div></div>
  <div className="lg:col-span-2 flex flex-col"><p className="text-sm text-ink/60">{topic.name} · {cls?.name} • {sub?.name}</p><h1 className="font-display font-black text-3xl md:text-4xl mt-1">{c.storyTitle}</h1><p className="text-sm text-ink/75 mt-2 mb-4">{topic.description}</p>
   <div className={card+' flex-1'}>{end?<><h2 className="font-display text-2xl mb-4">What did you learn?</h2><div className="flex flex-wrap gap-2 mb-6">{(c.strong.length?c.strong:c.scenes.map(x=>x.title)).map(x=><span key={x} className="rounded-full bg-white/10 px-4 py-2 font-semibold">{x}</span>)}</div>
    <div className="flex flex-wrap gap-3"><button className={btn} onClick={()=>{set({learningProgress:{...s.learningProgress,[topic.id]:s.learningProgress[topic.id]||'learning'}});nav('/practice')}}>Practise <ArrowRight size={16}/></button><button className={btn2} onClick={()=>{set({learningProgress:{...s.learningProgress,[topic.id]:s.learningProgress[topic.id]||'learning'}});nav('/quiz')}}>Take the Quiz</button></div></>
    :<><p className="text-sm text-ink/60">Scene {i+1} of {n}</p><h2 className="font-display font-extrabold text-2xl mt-1">{sc.title}</h2><p className="text-xl mt-3 leading-relaxed">{sc.text}</p></>}</div>
   <div className="flex justify-between mt-4"><button className={btn2} disabled={i===0} onClick={()=>setI(i-1)}><ArrowLeft size={16}/> Previous</button>{!end&&<button className={btn} onClick={()=>setI(i+1)}>Next <ArrowRight size={16}/></button>}</div></div></div></Page>}
