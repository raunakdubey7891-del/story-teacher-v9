import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { curriculum, levels } from '../data/curriculum'
import { useStore } from '../store'
import { card, Crumbs, Page } from '../components/ui'

const icon:Record<string,string>={'Play Group':'🧸','Nursery':'🎨','LKG':'🔤','UKG':'🎒','Class 1':'🌱','Class 2':'🚀','Class 3':'🧭','Class 4':'🔭','Class 5':'🏆'}
export default function Classes(){const {set}=useStore();const nav=useNavigate();const [q,setQ]=useState('');const [stage,setStage]=useState('All')
 const pick=(id:string)=>{set({selectedClass:id,selectedSubject:undefined});nav('/subjects')}
 return <Page><Crumbs items={[['Home','/'],['Choose Class','/classes']]}/><h1 className="font-display text-4xl md:text-5xl">What are you learning today?</h1><p className="text-ink/60 mt-2 mb-6">Choose your class to get stories and lessons that match your syllabus.</p>
  <input aria-label="Search classes" placeholder="Search class or stage..." value={q} onChange={e=>setQ(e.target.value)} className="w-full max-w-md rounded-full border border-line px-5 py-3 mb-4 bg-surface"/>
  <div className="flex flex-wrap gap-2 mb-8">{['All',...levels].map(l=><button key={l} onClick={()=>setStage(l)} className={`rounded-full px-4 py-1.5 text-sm font-semibold border ${stage===l?'bg-sun text-deep border-ink':'bg-surface border-line'}`}>{l}</button>)}</div>
  {levels.filter(l=>stage==='All'||l===stage).map(l=>{const items=curriculum.filter(c=>c.level===l&&c.name.toLowerCase().includes(q.toLowerCase()));if(!items.length)return null
   return <section key={l} className="mb-10"><h2 className="font-display text-2xl mb-4">{l}</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
   {items.map(c=><button key={c.id} onClick={()=>pick(c.id)} className={card}>
    <span className="text-4xl block mb-3" aria-hidden>{icon[c.name]||'📘'}</span><p className="font-display text-xl font-extrabold">{c.name}</p><p className="text-sm mt-1 text-ink/60">{c.blurb}</p></button>)}</div></section>})}
  {curriculum.every(c=>!c.name.toLowerCase().includes(q.toLowerCase()))&&<p className="text-ink/60">No class matches “{q}”. Try “Class 3” or “Nursery”.</p>}</Page>}
