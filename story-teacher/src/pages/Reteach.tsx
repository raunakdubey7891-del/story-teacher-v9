import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lightbulb, ArrowRight, BookOpen } from 'lucide-react'
import { topicContent } from '../data/curriculum'
import { useStore } from '../store'
import { useCtx } from '../hooks/useCtx'
import { siblingScenes } from '../lib/find'
import { focusQuestion, sceneForConcept } from '../lib/questions'
import QuestionCard from '../components/QuestionCard'
import { card, btn, btn2, Hero, Page, Empty } from '../components/ui'

// Re-learn works through the concepts (scenes) you missed in this topic: read it again, then a short check.
// With nothing missed, you can pick any scene of the topic to revisit.
export default function Reteach(){const {topic,cls,sub,ch}=useCtx();const {s,set,say}=useStore();const nav=useNavigate()
 const c=topic?topicContent[topic.id]:undefined
 const missed=topic?(s.weak?.[topic.id]||s.quizResults[topic.id]?.missed||[]):[]
 const [queue,setQueue]=useState<string[]|null>(missed.length?missed:null)
 const [pos,setPos]=useState(0);const [phase,setPhase]=useState<'learn'|'check'>('learn');const [attempt,setAttempt]=useState(0)
 const [pick,setPick]=useState<number|null>(null);const [hint,setHint]=useState(false);const [finished,setFinished]=useState(false)
 const idx=queue&&c?sceneForConcept(c,queue[pos]):0
 const q=useMemo(()=>c&&topic&&queue?focusQuestion(c,siblingScenes(topic.id),idx,attempt,cls?.level==='Early Learning'):null,[topic?.id,queue,pos,attempt])
 if(!c||!topic||!cls||!sub||!ch)return <Page><Empty/></Page>
 const crumbs:[string,string][]=[[cls.name,'/classes'],[sub.name,'/chapters'],[ch.name,'/topics'],[topic.name,'/learn']]

 if(!queue)return <Page><Hero crumbs={crumbs} title="Re-learn" sub={`Nothing is marked as weak in ${topic.name}. Pick a scene to revisit.`}/>
  <div className="grid gap-4 sm:grid-cols-2">{c.scenes.map(sc=><button key={sc.title} className={card} onClick={()=>setQueue([sc.title])}><span className="text-3xl" aria-hidden>{sc.emoji}</span><p className="font-display text-xl mt-2">{sc.title}</p><p className="text-sm text-ink/60 mt-1">Read it again and take a quick check.</p></button>)}</div>
  <div className="mt-6"><button className={btn2} onClick={()=>setQueue(c.scenes.map(x=>x.title))}><BookOpen size={16}/> Revise the whole story</button></div></Page>

 const sc=c.scenes[idx];const total=queue.length;const last=pos+1>=total
 const finish=()=>{const wk=(s.weak?.[topic.id]||[]).filter(x=>!queue.includes(x))
  const hadWeak=(s.weak?.[topic.id]||missed).length>0
  set({weak:{...s.weak,[topic.id]:wk},learningProgress:{...s.learningProgress,[topic.id]:hadWeak&&!wk.length?'mastered':(s.learningProgress[topic.id]||'learning')}})
  if(hadWeak&&!wk.length)say('Concept mastered. Nice work!');setFinished(true)}
 const go=()=>{if(last){finish();return}setPos(pos+1);setPhase('learn');setAttempt(0);setPick(null);setHint(false)}

 if(finished)return <Page><div className="max-w-2xl mx-auto text-center"><p className="text-6xl">🎉</p><h1 className="font-display text-4xl mt-3">You’ve got it!</h1>
  <p className="text-ink/60 mt-2">You revised {total} concept{total>1?'s':''} in {topic.name}.</p>
  <div className="flex flex-wrap gap-3 justify-center mt-6"><button className={btn} onClick={()=>nav('/quiz')}>Take the Quiz</button><button className={btn2} onClick={()=>nav('/practice')}>Practise</button><button className={btn2} onClick={()=>nav('/dashboard')}>My Progress</button></div></div></Page>

 return <Page><div className="max-w-2xl mx-auto"><h1 className="font-display text-4xl">Let’s look at this again.</h1><p className="text-ink/60 mt-2">Concept {pos+1} of {total}</p>
  <p className="font-bold text-xl text-coral mb-5">{sc.title}</p>
  {phase==='learn'?<><div className={card+' bg-sun/15'}><p className="flex items-center gap-2 font-bold mb-2"><Lightbulb className="text-amber"/>Read it slowly</p>
    <p className="text-6xl text-center my-4" aria-hidden>{sc.emoji}</p><p className="text-lg leading-relaxed">{sc.text}</p></div>
   {c.reteach&&sceneForConcept(c,c.reteach.concept)===idx&&<div className={card+' mt-4'}><p className="font-bold mb-1">Think of it this way</p><p>{c.reteach.card}</p>{c.reteach.visual&&<p className="mt-3 text-3xl text-center" aria-hidden>{c.reteach.visual}</p>}</div>}
   <div className="mt-5"><button className={btn} onClick={()=>{setPhase('check');setPick(null);setHint(false)}}>I’ve read it. Check me <ArrowRight size={16}/></button></div></>
  :q&&<><h2 className="font-display text-2xl mt-2">Quick check</h2>
   <QuestionCard q={q} pick={pick} onPick={setPick} showHint={hint} onHint={()=>setHint(true)}/>
   <div className="mt-5 flex flex-wrap gap-3 justify-end">{pick!==null&&pick===q.answer?<button className={btn} onClick={go}>{last?'Finish':'Next concept'} <ArrowRight size={16}/></button>
    :pick!==null?<><button className={btn2} onClick={()=>{setPhase('learn')}}>Read it again</button><button className={btn} onClick={()=>{setAttempt(a=>a+1);setPick(null);setHint(false)}}>Try another question</button></>:null}</div></>}
  </div></Page>}
