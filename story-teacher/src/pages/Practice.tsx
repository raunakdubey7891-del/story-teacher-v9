import { useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, RotateCcw, Trophy } from 'lucide-react'
import { topicContent } from '../data/curriculum'
import { useStore } from '../store'
import { useCtx } from '../hooks/useCtx'
import { siblingScenes } from '../lib/find'
import { buildQuestions, LEVELS, LEVEL_INFO } from '../lib/questions'
import type { Level } from '../types/curriculum'
import QuestionCard from '../components/QuestionCard'
import { card, btn, btn2, Bar, Hero, Page, Empty } from '../components/ui'

const COUNT=5
export default function Practice(){const [sp]=useSearchParams();const lv=sp.get('level') as Level|null
 return lv&&LEVELS.includes(lv)?<Run key={lv} level={lv}/>:<Picker/>}

function Picker(){const {cls,sub,ch,topic}=useCtx();const {s}=useStore();const nav=useNavigate()
 if(!topic||!cls||!sub||!ch||!topicContent[topic.id])return <Page><Empty/></Page>
 const best=s.practiceBest?.[topic.id]||{}
 return <Page><Hero crumbs={[[cls.name,'/classes'],[sub.name,'/chapters'],[ch.name,'/topics'],[topic.name,'/learn']]} title="Choose your level" sub={`Practice · ${topic.name}`}/>
  <div className="grid gap-5 md:grid-cols-3">{LEVELS.map((l,k)=>{const b=best[l];return <button key={l} className={card+' relative'} onClick={()=>nav(`/practice?level=${l}`)}>
   {b!==undefined&&<span className="absolute top-4 right-4 text-xs font-bold rounded-full bg-sun/40 text-amber px-3 py-1">Best {b}/{COUNT}</span>}
   <span className={`grid place-items-center w-12 h-12 rounded-xl text-2xl ${LEVEL_INFO[l].tone}`} aria-hidden>{LEVEL_INFO[l].emoji}</span>
   <p className="font-display text-xl mt-4">{l}</p><p className="text-sm text-ink/60 mt-1">{LEVEL_INFO[l].blurb}</p>
   <p className="text-xs text-ink/50 mt-3">{COUNT} questions · {k===0?'Start here':k===1?'Needs the story':'Think carefully'}</p></button>})}</div></Page>}

function Run({level}:{level:Level}){const {topic,cls,sub,ch}=useCtx();const {s,set}=useStore();const nav=useNavigate()
 const base=useRef(Date.now()).current;const [attempt,setAttempt]=useState(0)
 const [i,setI]=useState(0);const [pick,setPick]=useState<number|null>(null);const [ans,setAns]=useState<boolean[]>([]);const [hint,setHint]=useState(false);const [done,setDone]=useState(false)
 const c=topic?topicContent[topic.id]:undefined
 const qs=useMemo(()=>c&&topic?buildQuestions(c,siblingScenes(topic.id),level,{count:COUNT,seed:`${topic.id}|${base}|${attempt}`,early:cls?.level==='Early Learning'}):[],[topic?.id,level,attempt])
 if(!c||!topic||!cls||!sub||!ch||!qs.length)return <Page><Empty/></Page>
 const q=qs[i];const last=i+1===qs.length;const score=ans.filter(Boolean).length
 const next=()=>{const a=[...ans,pick===q.answer];setAns(a)
  if(!last){setI(i+1);setPick(null);setHint(false);return}
  const good=qs.filter((_,k)=>a[k]).map(x=>x.concept),bad=qs.filter((_,k)=>!a[k]).map(x=>x.concept)
  const sc=a.filter(Boolean).length;const wk=new Set(s.weak?.[topic.id]||[]);good.forEach(x=>bad.includes(x)||wk.delete(x));bad.forEach(x=>wk.add(x))
  const old=s.practiceBest?.[topic.id]||{}
  set({weak:{...s.weak,[topic.id]:Array.from(wk)},practiceBest:{...s.practiceBest,[topic.id]:{...old,[level]:Math.max(old[level]??0,sc)}},
   learningProgress:{...s.learningProgress,[topic.id]:s.learningProgress[topic.id]||'learning'}});setDone(true)}
 const again=()=>{setAttempt(a=>a+1);setI(0);setPick(null);setAns([]);setHint(false);setDone(false)}
 if(done){const missed=Array.from(new Set(qs.filter((_,k)=>!ans[k]).map(x=>x.concept)));const li=LEVELS.indexOf(level);const nl=LEVELS[li+1];const pass=score>=4
  return <Page><div className="max-w-2xl mx-auto text-center"><Trophy className="mx-auto text-sun" size={56}/><h1 className="font-display text-4xl mt-3">{pass?'Level cleared! 🎉':score>=3?'Good effort!':'Keep practising!'}</h1>
   <p className="text-ink/60 mt-1">{level} · {topic.name}</p><p className="font-display text-5xl font-bold my-5">{score} / {qs.length}</p>
   {missed.length>0&&<div className={card+' text-left'}><p className="font-bold mb-2">Review these</p>{missed.map(x=><p key={x} className="mb-1">• {x}</p>)}</div>}
   {pass&&nl&&<p className="mt-4 text-mint font-bold">You are ready for {nl}!</p>}
   <div className="flex flex-wrap gap-3 justify-center mt-6">{pass&&nl&&<button className={btn} onClick={()=>nav(`/practice?level=${nl}`)}>Try {nl} <ArrowRight size={16}/></button>}
    {missed.length>0&&<button className={pass&&nl?btn2:btn} onClick={()=>nav('/reteach')}>Re-learn weak concepts</button>}
    <button className={btn2} onClick={again}><RotateCcw size={16}/> New {level} questions</button><button className={btn2} onClick={()=>nav('/practice')}>Change level</button><button className={btn2} onClick={()=>nav('/learn')}>Back to topic</button></div></div></Page>}
 return <Page><div className="max-w-2xl mx-auto"><div className="flex items-center justify-between gap-3"><h1 className="font-display text-3xl">{topic.name}</h1><span className={`text-xs font-bold rounded-full px-3 py-1 ${LEVEL_INFO[level].tone}`}>{LEVEL_INFO[level].emoji} {level}</span></div>
  <p className="my-3 text-sm text-ink/60">Practice · Question {i+1} of {qs.length}</p><Bar v={(i+(pick!==null?1:0))/qs.length*100}/>
  <QuestionCard q={q} pick={pick} onPick={setPick} showHint={hint} onHint={()=>setHint(true)}/>
  <div className="text-right mt-4"><button className={btn} disabled={pick===null} onClick={next}>{last?'Finish':'Next'} <ArrowRight size={16}/></button></div></div></Page>}
