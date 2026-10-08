import { X, CircleCheck, Lightbulb } from 'lucide-react'
import type { Question } from '../types/curriculum'
import { card } from './ui'

// One question with options, optional hint, and instant feedback. Used by Practice, Quiz and Re-learn.
export default function QuestionCard({q,pick,onPick,showHint,onHint,badge}:{q:Question;pick:number|null;onPick:(k:number)=>void;showHint?:boolean;onHint?:()=>void;badge?:string}){
 const done=pick!==null;const ok=pick===q.answer
 return <div className={card+' mt-5'}>
  {badge&&<span className="inline-block text-xs font-bold rounded-full bg-sun/30 text-amber px-3 py-1 mb-3">{badge}</span>}
  <p className="text-xl font-semibold mb-5 leading-snug">{q.q}</p>
  <div className="grid gap-3" role="group" aria-label="Answer options">{q.options.map((o,k)=>{
   const st=!done?'border-line hover:border-ink bg-surface':k===q.answer?'border-mint bg-mint/10':k===pick?'border-coral bg-coral/10':'border-line/50 opacity-60'
   return <button key={o+k} disabled={done} onClick={()=>onPick(k)} className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left font-semibold transition ${st}`}>
    <span className="grid place-items-center w-8 h-8 rounded-lg bg-soft text-sm shrink-0">{'ABCD'[k]}</span><span className="flex-1">{o}</span>
    {done&&k===q.answer&&<CircleCheck className="text-mint"/>}{done&&k===pick&&k!==q.answer&&<X className="text-coral"/>}</button>})}</div>
  {!done&&onHint&&q.hint&&<div className="mt-4">{showHint?<p className="text-sm bg-sun/15 rounded-xl p-3 flex gap-2"><Lightbulb size={18} className="text-amber shrink-0"/>{q.hint}</p>
   :<button onClick={onHint} className="text-sm font-bold text-amber underline underline-offset-2">Need a hint?</button>}</div>}
  {done&&<div className={`mt-4 rounded-xl p-4 ${ok?'bg-mint/10':'bg-coral/10'}`} role="status"><p className="font-bold">{ok?'Correct! 🎉':'Not quite.'}</p>
   {!ok&&<p className="text-sm">The answer is “{q.options[q.answer]}”.</p>}{q.why&&<p className="text-sm text-ink/70 mt-1">{q.why}</p>}</div>}</div>}
