import { useNavigate } from 'react-router-dom'
import { Brain, Dumbbell, BookText, Repeat } from 'lucide-react'
import { topicContent } from '../data/curriculum'
import { useStore } from '../store'
import { useCtx } from '../hooks/useCtx'
import { card, Page, Grid, Empty, Hero, Tile } from '../components/ui'

// Story, Practice, Quiz and Re-learn all work for every topic. Their questions are built from that topic's own story.
export default function Learn(){const {cls,sub,ch,topic}=useCtx();const nav=useNavigate();const {s,say}=useStore()
 if(!topic||!cls||!sub||!ch)return <Page><Empty/></Page>
 const c=topicContent[topic.id];const has=!!c&&c.scenes.length>=2
 const weak=(s.weak?.[topic.id]||[]).length;const quizzed=!!s.quizResults[topic.id];const best=s.practiceBest?.[topic.id]||{}
 const modes:[any,string,string,string,string][]=[
  [BookText,'Story','Learn the concept through an engaging story.','/story','bg-sun/30 text-amber'],
  [Dumbbell,'Practice','Pick Easy, Medium or Hard and practise this topic.','/practice','bg-mint/20 text-mint'],
  [Brain,'Quiz','A mixed quiz on this topic. Easy to hard.','/quiz','bg-coral/10 text-coral'],
  [Repeat,'Re-learn',weak?`Review ${weak} concept${weak>1?'s':''} you missed.`:'Revisit any scene and check it again.','/reteach','bg-soft text-ink']]
 const tag=(t:string)=>t==='Story'?(!quizzed&&!Object.keys(best).length?'Start here':''):t==='Re-learn'?(weak?'Recommended':''):t==='Practice'?(Object.keys(best).length?`Best: ${Object.entries(best).map(([l,v])=>`${l[0]} ${v}/5`).join(' · ')}`:''):quizzed?`Last: ${s.quizResults[topic.id].score}/${s.quizResults[topic.id].total}`:''
 return <Page><Hero crumbs={[[cls.name,'/classes'],[sub.name,'/chapters'],[ch.name,'/topics'],[topic.name,'/learn']]} title="How do you want to learn?" sub={`${cls.name} · ${sub.name} · ${ch.name} · ${topic.name}`}/>
  <Grid>{modes.map(([I,t,d,to,tone])=>{const tg=tag(t);return <button key={t} className={card+' relative'} onClick={()=>has?nav(to):say('No lesson for this topic yet')}>
   {tg&&<span className={`absolute top-4 right-4 text-xs font-bold rounded-full px-3 py-1 ${t==='Re-learn'?'bg-coral/10 text-coral':'bg-sun/40 text-amber'}`}>{tg}</span>}
   <Tile tone={tone}><I/></Tile><p className="font-display text-xl mt-4">{t}</p><p className="text-sm text-ink/60 mt-1">{d}</p></button>})}</Grid>
  {!has&&<p className="mt-6 text-ink/60 bg-surface rounded-xl border border-line/60 p-4">There is no lesson for this topic yet.</p>}</Page>}
