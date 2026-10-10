import { Link } from 'react-router-dom'
import { Check, AlertTriangle } from 'lucide-react'
import { useStore } from '../store'
import { useCtx } from '../hooks/useCtx'
import { card, btn, btn2, Bar, Page, Empty } from '../components/ui'

export default function Result(){const {topic}=useCtx();const {s}=useStore();const r=topic&&s.quizResults[topic.id];if(!r)return <Page><Empty/></Page>
 const pct=Math.round(r.score/r.total*100);const C=2*Math.PI*54
 return <Page><div className="max-w-3xl mx-auto text-center"><h1 className="font-display text-4xl">{pct>=80?'Great work!':pct>=50?'Good effort!':'Keep going!'}</h1>
  <div className="relative w-44 h-44 mx-auto my-6"><svg viewBox="0 0 120 120" className="-rotate-90" role="img" aria-label={`${pct} percent`}><circle cx="60" cy="60" r="54" fill="none" strokeWidth="10" className="stroke-ink/10"/><circle cx="60" cy="60" r="54" fill="none" strokeWidth="10" strokeLinecap="round" className="stroke-mint" strokeDasharray={C} strokeDashoffset={C*(1-pct/100)}/></svg>
   <div className="absolute inset-0 grid place-items-center"><div><p className="font-display text-4xl font-bold">{r.score} / {r.total}</p><p className="font-bold text-mint">{pct}%</p></div></div></div>
  <div className="grid sm:grid-cols-2 gap-4 text-left"><div className={card}><p className="font-bold mb-3">You understood</p>{r.correct.length?r.correct.map(x=><p key={x} className="flex gap-2 mb-1"><Check className="text-mint" size={18}/>{x}</p>):<p className="text-ink/60">Nothing yet. Try the story again.</p>}</div>
   <div className={card}><p className="font-bold mb-3">Needs a little more practice</p>{r.missed.length?r.missed.map(x=><p key={x} className="flex gap-2 mb-1"><AlertTriangle className="text-amber" size={18}/>{x}</p>):<p>Nothing! 🎉</p>}</div></div>
  <div className={card+' mt-4 text-left'}><p className="font-bold mb-3">Concept mastery</p>{[...r.correct.map(x=>[x,100]),...r.missed.map(x=>[x,35])].map(([x,v])=><div key={x as string} className="mb-3"><div className="flex justify-between text-sm mb-1"><span>{x}</span><span className="text-ink/60">{v}%</span></div><Bar v={v as number}/></div>)}</div>
  <div className="flex flex-wrap gap-3 justify-center mt-6">{r.missed.length>0&&<Link className={btn} to="/reteach">Re-learn Weak Topics</Link>}<Link className={r.missed.length?btn2:btn} to="/practice">Practise</Link><Link className={btn2} to="/quiz">Try Quiz Again</Link><Link className={btn2} to="/learn">Back to Topic</Link></div></div></Page>}
