import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useStore } from '../store'
import { useCtx } from '../hooks/useCtx'
import { card, btn, btn2, Bar, Page, Grid, Empty, Hero } from '../components/ui'

export default function Chapters(){const {s,set}=useStore();const {cls,sub}=useCtx();const [q,setQ]=useState('');const nav=useNavigate()
 if(!cls||!sub)return <Page><Empty/></Page>
 const list=sub.chapters.map((c,i)=>({c,i})).filter(({c})=>c.name.toLowerCase().includes(q.toLowerCase()))
 return <Page><Hero crumbs={[[cls.name,'/classes'],[sub.name,'/subjects'],['Chapters','/chapters']]} title={sub.name} sub="Choose a chapter to continue learning."/>
  <input aria-label="Search chapters" placeholder="Search chapters..." value={q} onChange={e=>setQ(e.target.value)} className="w-full max-w-md rounded-full border border-line bg-surface px-5 py-3 mb-6"/>
  {list.length===0?<div className={card+' text-center'}><p className="font-bold">No chapters match “{q}”</p><button className={btn2+' mt-3'} onClick={()=>setQ('')}>Clear search</button></div>
  :<Grid>{list.map(({c,i})=>{const m=c.topics.filter(t=>s.learningProgress[t.id]==='mastered').length;const p=Math.round(m/c.topics.length*100)
   return <div key={c.id} className={card+' flex flex-col'}><div className="flex items-center justify-between"><span className="grid place-items-center w-12 h-12 rounded-xl bg-sun text-deep font-display text-xl">{i+1}</span><span className="text-xs font-bold rounded-full bg-mint/15 text-mint px-3 py-1">{p}%</span></div>
    <p className="font-display text-xl mt-4">{c.name}</p><p className="text-sm text-ink/60 mb-3">{c.topics.length} topics · {m} mastered</p><Bar v={p}/>
    <button className={btn+' mt-4 justify-center'} onClick={()=>{set({selectedChapter:c.id,selectedTopic:undefined});nav('/topics')}}>{p?'Continue':'Start chapter'} <ArrowRight size={16}/></button></div>})}</Grid>}</Page>}
