import { useNavigate } from 'react-router-dom'
import { ArrowRight, BookText } from 'lucide-react'
import { useStore } from '../store'
import { useCtx } from '../hooks/useCtx'
import { card, btn, Page, Grid, Empty, Hero, Tile, badge } from '../components/ui'

export default function Topics(){const {s,set}=useStore();const {cls,sub,ch}=useCtx();const nav=useNavigate()
 if(!ch||!cls||!sub)return <Page><Empty/></Page>
 const lab={not_started:'Not started',learning:'Learning',mastered:'Mastered'}
 const done=ch.topics.filter(t=>s.learningProgress[t.id]==='mastered').length
 return <Page><Hero crumbs={[[cls.name,'/classes'],[sub.name,'/chapters'],[ch.name,'/topics']]} title={ch.name} sub={`${ch.topics.length} topics · ${done} mastered`}/>
  <Grid>{ch.topics.map(t=>{const st=s.learningProgress[t.id]||'not_started';return <div key={t.id} className={card+' flex flex-col'}>
   <div className="flex items-center justify-between"><Tile tone="bg-sun/30 text-amber"><BookText/></Tile><span className={`text-xs font-bold rounded-full px-3 py-1 ${badge[st]}`}>{lab[st]}</span></div>
   <p className="font-display text-xl mt-4">{t.name}</p><p className="text-sm text-ink/70 mt-1">{t.description}</p><div className="flex flex-wrap gap-2 my-3">{t.subtopics.map(x=><span key={x} className="text-xs bg-soft rounded-full px-3 py-1">{x}</span>)}</div>
   <button className={btn+' mt-auto self-start'} onClick={()=>{set({selectedTopic:t.id});nav('/learn')}}>Learn Topic <ArrowRight size={16}/></button></div>})}</Grid></Page>}
