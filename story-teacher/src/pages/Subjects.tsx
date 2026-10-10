import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useStore } from '../store'
import type { Subject } from '../types/curriculum'
import { useCtx } from '../hooks/useCtx'
import { topicContent } from '../data/curriculum'
import { card, btn, btn2, Bar, Page, Grid, Empty, Hero, Thumb, toneOf, classIcon, subjectEmoji } from '../components/ui'

export default function Subjects(){const {s,set}=useStore();const {cls}=useCtx();const nav=useNavigate()
 if(!cls)return <Page><Empty/></Page>
 const list=cls.subjects;const early=cls.level==='Early Learning'
 const stats=(x:Subject)=>{const t=x.chapters.flatMap(c=>c.topics);const m=t.filter(y=>s.learningProgress[y.id]==='mastered').length;return {t:t.length,m,p:t.length?Math.round(m/t.length*100):0}}
 const crumbs:[string,string][]=[['Home','/'],[cls.name,'/classes'],['Subjects','/subjects']]
 const all=list.map(stats);const tot=all.reduce((n,x)=>n+x.t,0);const done=all.reduce((n,x)=>n+x.m,0);const overall=tot?Math.round(done/tot*100):0
 return <Page><Hero crumbs={crumbs} title="Choose a subject" sub={`${cls.name} curriculum`} tone={toneOf(cls.name)} emoji={classIcon[cls.name]}>
   <div className="mt-5 max-w-sm"><div className="flex justify-between text-sm mb-1.5"><span className="text-ink/80">{done} of {tot} topics mastered</span><span className="font-bold">{overall}%</span></div><Bar v={overall}/></div></Hero>
  <h2 className="font-display text-xl md:text-2xl font-extrabold mb-4">{cls.name} subjects</h2>
  <Grid>{list.map((x,k)=>{const st=all[k];const next=x.chapters.find(c=>c.topics.some(t=>s.learningProgress[t.id]!=='mastered'))
   const firstEmoji=topicContent[x.chapters[0]?.topics[0]?.id]?.scenes[0]?.emoji
   return <div key={x.id} className={card+' !p-0 overflow-hidden flex flex-col hover:-translate-y-0.5'}>
    <div className="relative aspect-video"><Thumb className="absolute inset-0" emoji={firstEmoji||subjectEmoji(x.name)} subject={x.name} early={early} size="text-5xl sm:text-6xl"/>
     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/><span className="absolute top-3 right-3 text-xs font-bold rounded bg-black/60 px-2 py-1">{st.p}% complete</span>
     <p className="absolute bottom-3 left-4 right-4 font-display font-black text-2xl drop-shadow">{x.name}</p>
     <div className="absolute bottom-0 inset-x-0 h-1 bg-white/25"><div className="h-full bg-brand" style={{width:st.p+'%'}}/></div></div>
    <div className="p-5 flex flex-col flex-1"><p className="text-sm text-ink/60">{x.chapters.length} chapters · {st.t} topics</p>
     {next&&<p className="text-sm text-ink/80 mt-2">Up next: <span className="font-semibold">{next.name}</span></p>}
     <button className={(st.p?btn:btn2)+' mt-4 justify-center'} onClick={()=>{set({selectedSubject:x.id,selectedChapter:undefined});nav('/chapters')}}>{st.p?'Continue learning':'Start learning'} <ArrowRight size={16}/></button></div></div>})}</Grid></Page>}
