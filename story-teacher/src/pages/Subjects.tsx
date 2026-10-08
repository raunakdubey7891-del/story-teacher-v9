import { useNavigate } from 'react-router-dom'
import { BookOpen, ArrowLeft, ArrowRight, Calculator, FlaskConical, Globe, Languages, Terminal, Landmark, Library } from 'lucide-react'
import { useStore } from '../store'
import type { Subject } from '../types/curriculum'
import { useCtx } from '../hooks/useCtx'
import { card, btn, btn2, Bar, Page, Grid, Empty, Hero, Tile } from '../components/ui'

const subjectIcon=(n:string):any=>{const k=n.toLowerCase();return /math/.test(k)?Calculator:/science|physics|chem|bio/.test(k)?FlaskConical:/social|history|politic|geograph/.test(k)?Globe:/hindi|language|rhyme/.test(k)?Languages:/english/.test(k)?BookOpen:/computer|\bai\b/.test(k)?Terminal:/account|business|econom/.test(k)?Landmark:Library}

export default function Subjects(){const {s,set}=useStore();const {cls}=useCtx();const nav=useNavigate()
 if(!cls)return <Page><Empty/></Page>
 const list=cls.subjects
 const stats=(x:Subject)=>{const t=x.chapters.flatMap(c=>c.topics);const m=t.filter(y=>s.learningProgress[y.id]==='mastered').length;return {t:t.length,m,p:t.length?Math.round(m/t.length*100):0}}
 const crumbs:[string,string][]=[['Home','/'],[cls.name,'/classes'],['Subjects','/subjects']]
 const all=list.map(stats);const tot=all.reduce((n,x)=>n+x.t,0);const done=all.reduce((n,x)=>n+x.m,0);const overall=tot?Math.round(done/tot*100):0
 return <Page><Hero crumbs={crumbs} title="Choose a subject" sub={`${cls.name} curriculum`}/>
  <div className={card+' flex flex-wrap items-center justify-between gap-4 mb-6'}><div><p className="text-sm text-ink/60">Overall {cls.name} progress</p><p className="font-display text-xl">{done} of {tot} topics mastered</p></div><div className="w-full sm:w-64"><p className="text-right font-bold mb-1">{overall}%</p><Bar v={overall}/></div></div>
  <Grid>{list.map((x,k)=>{const st=all[k];const I=subjectIcon(x.name);const next=x.chapters.find(c=>c.topics.some(t=>s.learningProgress[t.id]!=='mastered'))
   return <div key={x.id} className={card+' flex flex-col'}><div className="flex items-center justify-between"><Tile tone="bg-sun/30 text-amber"><I/></Tile><span className="text-xs font-bold rounded-full bg-mint/15 text-mint px-3 py-1">{st.p}% complete</span></div>
    <p className="font-display text-xl mt-4">{x.name}</p><p className="text-sm text-ink/60">{x.chapters.length} chapters · {st.t} topics</p>
    {next&&<p className="text-sm bg-soft rounded-lg px-3 py-2 my-3">Up next: {next.name}</p>}<Bar v={st.p}/>
    <button className={(st.p?btn:btn2)+' mt-4 justify-center'} onClick={()=>{set({selectedSubject:x.id,selectedChapter:undefined});nav('/chapters')}}>{st.p?'Continue learning':'Start learning'} <ArrowRight size={16}/></button></div>})}</Grid></Page>}
