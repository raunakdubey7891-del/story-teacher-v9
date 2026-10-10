import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useStore } from '../store'
import { useCtx } from '../hooks/useCtx'
import { topicContent } from '../data/curriculum'
import { card, btn, Page, Grid, Empty, Hero, Thumb, toneOf, subjectEmoji, badge } from '../components/ui'

export default function Topics(){const {s,set}=useStore();const {cls,sub,ch}=useCtx();const nav=useNavigate()
 if(!ch||!cls||!sub)return <Page><Empty/></Page>
 const lab={not_started:'Not started',learning:'Learning',mastered:'Mastered'}
 const done=ch.topics.filter(t=>s.learningProgress[t.id]==='mastered').length
 const early=cls.level==='Early Learning'
 return <Page><Hero crumbs={[[cls.name,'/classes'],[sub.name,'/chapters'],[ch.name,'/topics']]} title={ch.name} sub={`${ch.topics.length} topics · ${done} mastered`} tone={toneOf(cls.name)} emoji={subjectEmoji(sub.name)}/>
  <h2 className="font-display text-xl md:text-2xl font-extrabold mb-4">Topics</h2>
  <Grid>{ch.topics.map(t=>{const st=s.learningProgress[t.id]||'not_started';const emoji=topicContent[t.id]?.scenes[0]?.emoji||subjectEmoji(sub.name)
   return <div key={t.id} className={card+' !p-0 overflow-hidden flex flex-col hover:-translate-y-0.5'}>
    <div className="relative aspect-video"><Thumb className="absolute inset-0" emoji={emoji} subject={sub.name} early={early} size="text-5xl sm:text-6xl"/><span className={`absolute top-3 right-3 text-xs font-bold rounded px-2 py-1 backdrop-blur ${badge[st]}`}>{lab[st]}</span>
     <div className="absolute bottom-0 inset-x-0 h-1 bg-white/25"><div className="h-full bg-brand" style={{width:st==='mastered'?'100%':st==='learning'?'50%':'0%'}}/></div></div>
    <div className="p-5 flex flex-col flex-1"><p className="font-display font-extrabold text-xl">{t.name}</p><p className="text-sm text-ink/70 mt-1">{t.description}</p>
     <div className="flex flex-wrap gap-2 my-3">{t.subtopics.map(x=><span key={x} className="text-xs bg-white/10 rounded-full px-3 py-1">{x}</span>)}</div>
     <button className={btn+' mt-auto self-start'} onClick={()=>{set({selectedTopic:t.id});nav('/learn')}}>Learn Topic <ArrowRight size={16}/></button></div></div>})}</Grid></Page>}
