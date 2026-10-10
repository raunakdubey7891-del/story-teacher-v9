import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play } from 'lucide-react'
import { useStore } from '../store'
import { useCtx } from '../hooks/useCtx'
import { topicContent } from '../data/curriculum'
import { card, btn2, Page, Empty, Hero, Thumb, toneOf, subjectEmoji } from '../components/ui'

// Chapters are shown like episodes of a series: number, still, title, progress.
export default function Chapters(){const {s,set}=useStore();const {cls,sub}=useCtx();const [q,setQ]=useState('');const nav=useNavigate()
 if(!cls||!sub)return <Page><Empty/></Page>
 const list=sub.chapters.map((c,i)=>({c,i})).filter(({c})=>c.name.toLowerCase().includes(q.toLowerCase()))
 return <Page><Hero crumbs={[[cls.name,'/classes'],[sub.name,'/subjects'],['Chapters','/chapters']]} title={sub.name} sub="Choose a chapter to continue learning." tone={toneOf(cls.name)} emoji={subjectEmoji(sub.name)}/>
  <div className="flex flex-wrap items-center justify-between gap-3 mb-3"><h2 className="font-display text-xl md:text-2xl font-extrabold">Chapters</h2>
   <input aria-label="Search chapters" placeholder="Search chapters..." value={q} onChange={e=>setQ(e.target.value)} className="w-full sm:w-72 rounded-md border border-white/15 bg-soft px-4 py-2 focus:outline-none focus:border-white/60"/></div>
  {list.length===0?<div className={card+' text-center'}><p className="font-bold">No chapters match “{q}”</p><button className={btn2+' mt-3'} onClick={()=>setQ('')}>Clear search</button></div>
  :<ol className="border-t border-white/10">{list.map(({c,i})=>{const m=c.topics.filter(t=>s.learningProgress[t.id]==='mastered').length;const p=Math.round(m/c.topics.length*100)
   const emoji=topicContent[c.topics[0]?.id]?.scenes[0]?.emoji||subjectEmoji(sub.name)
   return <li key={c.id} className="border-b border-white/10"><button className="group w-full flex items-center gap-3 sm:gap-5 p-3 sm:p-4 text-left rounded-md hover:bg-white/5 transition" onClick={()=>{set({selectedChapter:c.id,selectedTopic:undefined});nav('/topics')}}>
    <span className="hidden sm:block w-10 text-center font-display text-3xl font-black text-ink/40" aria-hidden>{i+1}</span>
    <span className="relative block w-36 sm:w-52 aspect-video shrink-0 rounded-md overflow-hidden ring-1 ring-white/10"><Thumb className="absolute inset-0" emoji={emoji} subject={sub.name} early={cls.level==='Early Learning'}/>
     <span className="absolute inset-0 grid place-items-center bg-black/0 group-hover:bg-black/40 transition"><Play className="opacity-0 group-hover:opacity-100 transition" fill="currentColor" size={32}/></span>
     <span className="absolute bottom-0 inset-x-0 h-1 bg-white/25"><span className="block h-full bg-brand" style={{width:p+'%'}}/></span></span>
    <span className="flex-1 min-w-0"><span className="flex items-baseline justify-between gap-3"><span className="font-bold sm:text-lg">{i+1}. {c.name}</span><span className="text-xs font-bold text-mint shrink-0">{p}%</span></span>
     <span className="block text-sm text-ink/60 mt-1">{c.topics.length} topics · {m} mastered</span>
     <span className="mt-2 inline-block text-sm font-bold text-ink/90 group-hover:text-white">{p?'Continue':'Start chapter'} →</span></span></button></li>})}</ol>}</Page>}
