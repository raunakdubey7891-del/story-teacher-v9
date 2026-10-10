import { useNavigate } from 'react-router-dom'
import { Brain, Dumbbell, BookText, Repeat } from 'lucide-react'
import { topicContent } from '../data/curriculum'
import { useStore } from '../store'
import { useCtx } from '../hooks/useCtx'
import SceneArt from '../components/SceneArt'
import { card, Page, Grid, Empty, Hero, Tile, toneOf, subjectEmoji } from '../components/ui'

// Story, Practice, Quiz and Re-learn all work for every topic. Their questions are built from that topic's own story.
export default function Learn(){const {cls,sub,ch,topic}=useCtx();const nav=useNavigate();const {s,say}=useStore()
 if(!topic||!cls||!sub||!ch)return <Page><Empty/></Page>
 const c=topicContent[topic.id];const has=!!c&&c.scenes.length>=2
 const weak=(s.weak?.[topic.id]||[]).length;const quizzed=!!s.quizResults[topic.id];const best=s.practiceBest?.[topic.id]||{}
 const modes:[any,string,string,string,string][]=[
  [BookText,'Story','Learn the concept through an engaging story.','/story','bg-brand/20 text-brand'],
  [Dumbbell,'Practice','Pick Easy, Medium or Hard and practise this topic.','/practice','bg-mint/20 text-mint'],
  [Brain,'Quiz','A mixed quiz on this topic. Easy to hard.','/quiz','bg-sun/20 text-sun'],
  [Repeat,'Re-learn',weak?`Review ${weak} concept${weak>1?'s':''} you missed.`:'Revisit any scene and check it again.','/reteach','bg-white/10 text-ink']]
 const tag=(t:string)=>t==='Story'?(!quizzed&&!Object.keys(best).length?'Start here':''):t==='Re-learn'?(weak?'Recommended':''):t==='Practice'?(Object.keys(best).length?`Best: ${Object.entries(best).map(([l,v])=>`${l[0]} ${v}/5`).join(' · ')}`:''):quizzed?`Last: ${s.quizResults[topic.id].score}/${s.quizResults[topic.id].total}`:''
 const first=c?.scenes[0]
 return <Page><Hero crumbs={[[cls.name,'/classes'],[sub.name,'/chapters'],[ch.name,'/topics'],[topic.name,'/learn']]} title={topic.name} sub={`${cls.name} · ${sub.name} · ${ch.name}`} tone={toneOf(cls.name)} emoji={first?undefined:subjectEmoji(sub.name)}
   art={first?<SceneArt fill emoji={first.emoji} label={first.title} subject={sub.name} early={cls.level==='Early Learning'} seed={1+topic.name.length}/>:undefined}>
   <p className="mt-3 text-ink/80 max-w-xl">{topic.description}</p></Hero>
  <h2 className="font-display text-xl md:text-2xl font-extrabold mb-4">How do you want to learn?</h2>
  <Grid>{modes.map(([I,t,d,to,tone])=>{const tg=tag(t);return <button key={t} className={card+' relative hover:bg-soft hover:-translate-y-0.5'} onClick={()=>has?nav(to):say('No lesson for this topic yet')}>
   {tg&&<span className={`absolute top-4 right-4 text-xs font-bold rounded px-2 py-1 ${t==='Re-learn'?'bg-brand/20 text-brand':'bg-white/10 text-ink'}`}>{tg}</span>}
   <Tile tone={tone}><I/></Tile><p className="font-display font-extrabold text-xl mt-4">{t}</p><p className="text-sm text-ink/60 mt-1">{d}</p></button>})}</Grid>
  {!has&&<p className="mt-6 text-ink/60 bg-surface rounded-lg border border-white/10 p-4">There is no lesson for this topic yet.</p>}</Page>}
