import { Link } from 'react-router-dom'
import { useAuth, authEnabled } from '../lib/auth'
import { card, btn, btn2, Bar, Page } from '../components/ui'
import SceneArt from '../components/SceneArt'

export default function Landing(){const {user}=useAuth();const guest=authEnabled&&!user;const stages=[['Early Learning','Play Group · Nursery · LKG · UKG','Sensory tales, rhymes and playful phonics.'],['Primary School','Class 1–5','Illustrated fables, number stories and first science.']]
 const why=['Curriculum-aware','Age-appropriate','Personalized pace','Learn through stories','Concept-level assessment']
 return <><Page>
 <section className="grid lg:grid-cols-2 gap-10 items-center py-6"><div><span className="inline-block rounded-full bg-sun/30 text-amber text-xs font-bold px-3 py-1 mb-5">NEP 2020 pedagogical framework</span>
  <h1 className="font-display text-5xl md:text-6xl font-bold leading-[1.1]">Learn Anything. <i className="text-amber">Remember</i> Everything.</h1>
  <p className="mt-5 text-lg text-ink/70 max-w-lg">Story Teacher turns your school lessons into stories, then helps you practise, quiz and re-learn what you missed.</p>
  <div className="mt-8 flex flex-wrap gap-3">{guest?<><Link className={btn} to="/signup">Sign up free</Link><Link className={btn2} to="/signin">Sign in</Link></>:<><Link className={btn} to="/classes">Start Learning</Link><Link className={btn2} to="/dashboard">My Progress</Link></>}</div>
  <div className="mt-8 flex gap-8">{[['100%','Curriculum mapped'],['4','Ways to learn'],['Play Group–5','Every class']].map(([a,b])=><div key={b}><p className="font-display text-xl font-bold">{a}</p><p className="text-xs text-ink/60">{b}</p></div>)}</div></div>
  <div className={card+' bg-surface'}><p className="text-xs text-ink/60">Class 1 / EVS / Plants</p><h3 className="font-display text-2xl mt-3">The Seed that Slept</h3>
   <div className="mt-4 h-60"><SceneArt emoji="🌰🌱☀️" label="A seed grows into a plant" subject="EVS" early={false} seed={3}/></div><p className="font-display text-lg mt-4 text-ink/80">“Let’s learn how a seed grows through a story.”</p><div className="mt-3"><Bar v={40}/></div>
   <Link to="/classes" className={btn+' mt-4 w-full justify-center'}>Start story · 4 mins</Link></div></section>
 <h2 className="font-display text-3xl mt-16 mb-2">How Story Teacher works</h2><p className="text-ink/60 mb-6">Five steps from syllabus to understanding.</p>
 <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">{[['Choose your class','From Play Group to Class 5.'],['Select your topic','Every chapter follows your syllabus.'],['Learn via story','Concepts told as short scenes.'],['Take a quick quiz','Check what stuck.'],['Fix weak points','Simpler re-teaching for gaps.']].map(([t,d],i)=><li key={t} className={card+' !p-5'}><span className="grid place-items-center w-9 h-9 rounded-lg bg-sun text-deep font-bold">{i+1}</span><p className="font-bold mt-3">{t}</p><p className="text-sm text-ink/60">{d}</p></li>)}</ol>
 <h2 className="font-display text-3xl mt-16 mb-6">Built for every student</h2>
 <div className="grid gap-5 md:grid-cols-2">{stages.map(([t,s,d])=><Link to="/classes" key={t} className={card}><p className="text-xs text-amber font-bold">{s}</p><p className="font-display text-xl mt-1">{t}</p><p className="text-sm text-ink/60 mt-2">{d}</p></Link>)}</div>
 <h2 className="font-display text-3xl mt-16 mb-6">Why Story Teacher?</h2><div className="flex flex-wrap gap-3">{why.map(t=><span key={t} className="bg-surface border border-line/60 rounded-lg px-4 py-2 font-semibold">{t}</span>)}</div>
 <div className="grid md:grid-cols-2 gap-5 mt-6"><div className={card}><p className="font-bold mb-2 text-coral">The rote-learning burden</p><p className="text-sm text-ink/70">Memorising dry definitions without context, then forgetting them within days.</p></div><div className={card}><p className="font-bold mb-2 text-mint">The Story Teacher way</p><p className="text-sm text-ink/70">Narrative anchors, concept-level quizzes and simpler re-teaching when a concept is weak.</p></div></div>
 <section className="mt-16 rounded-2xl bg-gradient-to-br from-soft to-surface border border-line text-ink p-8 md:p-12"><p className="font-display text-2xl md:text-3xl max-w-2xl leading-snug">“If a child cannot learn the way we teach, maybe we should teach the way they remember: <i className="text-sun">through stories.</i>”</p><Link className="inline-block mt-6 rounded-full bg-sun text-deep font-bold px-6 py-3" to={guest?'/signup':'/classes'}>{guest?'Create your free account':'Start Learning Now'}</Link></section></Page>
 </>}
