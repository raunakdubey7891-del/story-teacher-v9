import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { topicContent } from '../data/curriculum'
import { useStore } from '../store'
import { useCtx } from '../hooks/useCtx'
import { siblingScenes } from '../lib/find'
import { buildQuiz } from '../lib/questions'
import QuestionCard from '../components/QuestionCard'
import { btn, Bar, Page, Empty } from '../components/ui'

// Quiz: 6 questions on this topic, 2 easy, 2 medium, 2 hard. A fresh set each time.
export default function Quiz(){const {topic,cls}=useCtx();const {s,set}=useStore();const nav=useNavigate()
 const base=useRef(Date.now()).current;const [i,setI]=useState(0);const [pick,setPick]=useState<number|null>(null);const [ans,setAns]=useState<boolean[]>([])
 const c=topic?topicContent[topic.id]:undefined
 const qs=useMemo(()=>c&&topic?buildQuiz(c,siblingScenes(topic.id),{seed:`${topic.id}|quiz|${base}`,early:cls?.level==='Early Learning'}):[],[topic?.id])
 if(!c||!topic||!qs.length)return <Page><Empty/></Page>
 const q=qs[i];const last=i+1===qs.length
 const next=()=>{const a=[...ans,pick===q.answer];if(!last){setAns(a);setI(i+1);setPick(null);return}
  const bad=Array.from(new Set(qs.filter((_,k)=>!a[k]).map(x=>x.concept)));const good=Array.from(new Set(qs.filter((_,k)=>a[k]).map(x=>x.concept))).filter(x=>!bad.includes(x))
  const score=a.filter(Boolean).length
  set({quizResults:{...s.quizResults,[topic.id]:{score,total:a.length,correct:good,missed:bad}},weak:{...s.weak,[topic.id]:bad},
   learningProgress:{...s.learningProgress,[topic.id]:score/a.length>=.8?'mastered':'learning'}});nav('/result')}
 return <Page><div className="max-w-2xl mx-auto"><div className="flex items-center justify-between"><h1 className="font-display text-3xl">{topic.name} Quiz</h1></div>
  <p className="my-3 text-sm text-ink/60">Question {i+1} of {qs.length}</p><Bar v={(i+(pick!==null?1:0))/qs.length*100}/>
  <QuestionCard q={q} pick={pick} onPick={setPick} badge={q.level}/>
  <div className="text-right mt-4"><button className={btn} disabled={pick===null} onClick={next}>{last?'See result':'Next'} <ArrowRight size={16}/></button></div></div></Page>}
