import { X, CircleCheck, Lightbulb } from 'lucide-react'
import type { Question } from '../types/curriculum'
import { card } from './ui'

// One question with options, optional hint, and instant feedback. Used by Practice, Quiz and Re-learn.
export default function QuestionCard({q,pick,onPick,showHint,onHint,badge}:{q:Question;pick:number|null;onPick:(k:number)=>void;showHint?:boolean;onHint?:()=>void;badge?:string}){
 const done=pick!==null;const ok=pick===q.answer
 return <div className={card+' mt-5'}>
  {badge&&<span className="inline-block text-xs font-bold rounded bg-white/10 text-ink/80 px-2.5 py-1 mb-3">{badge}</span>}
  <p className="text-xl font-semibold mb-5 leading-snug">{q.q}</p>
  <div className="grid gap-3" role="group" aria-label="Answer options">{q.options.map((o,k)=>{
   const st=!done?'border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/50':k===q.answer?'border-mint bg-mint/10':k===pick?'border-brand bg-brand/10':'border-white/5 opacity-50'
   return <button key={o+k} disabled={done} onClick={()=>onPick(k)} className={`flex items-center gap-3 rounded-md border px-4 py-3 text-left font-semibold transition ${st}`}>
    <span className="grid place-items-center w-8 h-8 rounded bg-white/10 text-sm shrink-0">{'ABCD'[k]}</span><span className="flex-1">{o}</span>
    {done&&k===q.answer&&<CircleCheck className="text-mint"/>}{done&&k===pick&&k!==q.answer&&<X className="text-brand"/>}</button>})}</div>
  {!done&&onHint&&q.hint&&<div className="mt-4">{showHint?<p className="text-sm bg-sun/15 rounded-md p-3 flex gap-2"><Lightbulb size={18} className="text-amber shrink-0"/>{q.hint}</p>
   :<button onClick={onHint} className="text-sm font-bold text-amber underline underline-offset-2">Need a hint?</button>}</div>}
  {done&&<div className={`mt-4 rounded-md p-4 ${ok?'bg-mint/10':'bg-brand/10'}`} role="status"><p className="font-bold">{ok?'Correct! 🎉':'Not quite.'}</p>
   {!ok&&<p className="text-sm">The answer is “{q.options[q.answer]}”.</p>}{q.why&&<p className="text-sm text-ink/70 mt-1">{q.why}</p>}</div>}</div>}
