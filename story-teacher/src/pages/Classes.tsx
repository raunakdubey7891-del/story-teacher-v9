import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { curriculum, levels, topicContent } from '../data/curriculum'
import { useStore } from '../store'
import { findTopic } from '../lib/find'
import { Crumbs, Page, Poster, Row, ToneArt, Thumb, classIcon, toneOf, rowItem } from '../components/ui'

export default function Classes(){const {s,set}=useStore();const nav=useNavigate();const [q,setQ]=useState('');const [stage,setStage]=useState('All')
 const pick=(id:string)=>{set({selectedClass:id,selectedSubject:undefined});nav('/subjects')}
 // "Continue learning" shelf: the topic the student last opened, if any.
 const cur=s.selectedTopic?findTopic(s.selectedTopic):null
 const st=cur?s.learningProgress[cur.topic.id]:undefined
 const resume=()=>{if(!cur)return;set({selectedClass:cur.cls.id,selectedSubject:cur.sub.id,selectedChapter:cur.ch.id,selectedTopic:cur.topic.id});nav('/learn')}
 return <Page><Crumbs items={[['Home','/'],['Choose Class','/classes']]}/><h1 className="font-display font-black text-4xl md:text-5xl">What are you learning today?</h1><p className="text-ink/60 mt-2 mb-6">Choose your class to get stories and lessons that match your syllabus.</p>
  <input aria-label="Search classes" placeholder="Search class or stage..." value={q} onChange={e=>setQ(e.target.value)} className="w-full max-w-md rounded-md border border-white/15 px-4 py-2.5 mb-4 bg-soft focus:outline-none focus:border-white/60"/>
  <div className="flex flex-wrap gap-2 mb-8">{['All',...levels].map(l=><button key={l} onClick={()=>setStage(l)} aria-pressed={stage===l} className={`rounded-full px-4 py-1.5 text-sm font-semibold border transition ${stage===l?'bg-white text-black border-white':'bg-transparent border-white/25 text-ink/80 hover:border-white/60'}`}>{l}</button>)}</div>
  {cur&&!q&&stage==='All'&&<Row title="Continue learning"><Poster className={'w-64 sm:w-72 '+rowItem} art={<Thumb className="absolute inset-0" emoji={topicContent[cur.topic.id]?.scenes[0]?.emoji||'📖'} subject={cur.sub.name} early={cur.cls.level==='Early Learning'}/>} title={cur.topic.name} sub={`${cur.cls.name} · ${cur.sub.name} · ${cur.ch.name}`} progress={st==='mastered'?100:st==='learning'?50:4} onClick={resume}/></Row>}
  {levels.filter(l=>stage==='All'||l===stage).map(l=>{const items=curriculum.filter(c=>c.level===l&&c.name.toLowerCase().includes(q.toLowerCase()));if(!items.length)return null
   return <Row key={l} title={l}>{items.map(c=><Poster key={c.id} className={'w-40 sm:w-48 '+rowItem} aspect="aspect-[3/4]" art={<ToneArt tone={toneOf(c.name)} emoji={classIcon[c.name]||'📘'} size="text-6xl sm:text-7xl"/>} title={c.name} sub={c.blurb} onClick={()=>pick(c.id)}/>)}</Row>})}
  {curriculum.every(c=>!c.name.toLowerCase().includes(q.toLowerCase()))&&<p className="text-ink/60">No class matches “{q}”. Try “Class 3” or “Nursery”.</p>}</Page>}
