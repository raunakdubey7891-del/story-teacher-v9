import { Link, useNavigate } from 'react-router-dom'
import { Play, Info } from 'lucide-react'
import { useAuth, authEnabled } from '../lib/auth'
import { curriculum } from '../data/curriculum'
import { useStore } from '../store'
import { card, btn2, btnPlay, Poster, Row, ToneArt, classIcon, toneOf, rowItem } from '../components/ui'
import SceneArt from '../components/SceneArt'

export default function Landing(){const {user}=useAuth();const {set}=useStore();const nav=useNavigate();const guest=authEnabled&&!user
 const stages:[string,string,string,string,[string,string]][]=[['Early Learning','Play Group · Nursery · LKG · UKG','Sensory tales, rhymes and playful phonics.','🧸',toneOf('Play Group')],['Primary School','Class 1–5','Illustrated fables, number stories and first science.','🏆',toneOf('Class 3')]]
 const why=['Curriculum-aware','Age-appropriate','Personalized pace','Learn through stories','Concept-level assessment']
 const steps=[['Choose your class','From Play Group to Class 5.'],['Select your topic','Every chapter follows your syllabus.'],['Learn via story','Concepts told as short scenes.'],['Take a quick quiz','Check what stuck.'],['Fix weak points','Simpler re-teaching for gaps.']]
 // Same selection the Classes page makes. Signed-out visitors are sent to sign up first.
 const open=(id:string)=>{if(guest){nav('/signup');return}set({selectedClass:id,selectedSubject:undefined});nav('/subjects')}
 return <>
 <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-paper">
  <div className="absolute inset-y-0 right-0 w-full md:w-[78%]"><SceneArt fill emoji="🌰🌱☀️" label="A seed grows into a plant" subject="EVS" early={false} seed={3}/></div>
  <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/75 md:via-paper/45 to-transparent"/><div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-paper to-transparent"/>
  <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 pb-28 pt-32"><div className="max-w-2xl">
   <span className="inline-block rounded bg-brand text-white text-[11px] font-extrabold tracking-widest px-2 py-1 mb-4">NEP 2020 PEDAGOGICAL FRAMEWORK</span>
   <h1 className="font-display font-black text-5xl md:text-7xl leading-[1.02] drop-shadow-xl">Learn Anything. <span className="text-brand">Remember</span> Everything.</h1>
   <p className="mt-5 text-lg md:text-xl text-ink/85 max-w-xl">Story Teacher turns your school lessons into stories, then helps you practise, quiz and re-learn what you missed.</p>
   <p className="mt-4 text-sm text-ink/70 flex flex-wrap items-center gap-x-3 gap-y-1"><span className="text-mint font-bold">100% curriculum mapped</span><span>4 ways to learn</span><span>Play Group–5</span></p>
   <div className="mt-7 flex flex-wrap gap-3">{guest?<><Link className={btnPlay} to="/signup"><Play size={20} fill="currentColor"/>Sign up free</Link><Link className={btn2} to="/signin"><Info size={20}/>Sign in</Link></>
    :<><Link className={btnPlay} to="/classes"><Play size={20} fill="currentColor"/>Start Learning</Link><Link className={btn2} to="/dashboard"><Info size={20}/>My Progress</Link></>}</div></div>
   <p className="hidden sm:block absolute right-8 bottom-28 text-xs text-ink/70 text-right">Now showing<br/><span className="font-bold text-ink text-sm">The Seed that Slept</span><br/>Class 1 · EVS · Plants</p></div></section>

 <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-20 relative z-10">
  <Row title="Browse by class" sub="From Play Group to Class 5">{curriculum.map(c=>
   <Poster key={c.id} className={'w-36 sm:w-44 '+rowItem} aspect="aspect-[3/4]" art={<ToneArt tone={toneOf(c.name)} emoji={classIcon[c.name]||'📘'} size="text-6xl sm:text-7xl"/>} title={c.name} sub={c.blurb} onClick={()=>open(c.id)}/>)}</Row>

  <div className="mt-10"><Row title="How Story Teacher works" sub="Five steps from syllabus to understanding.">{steps.map(([t,d],i)=>
   <div key={t} className={'flex items-end w-64 '+rowItem}><span className="top-num text-[9rem] -mr-5 relative z-0" aria-hidden>{i+1}</span>
    <div className={card+' relative z-10 !p-4 flex-1 h-36'}><p className="font-bold">{t}</p><p className="text-sm text-ink/60 mt-1">{d}</p></div></div>)}</Row></div>

  <h2 className="font-display text-xl md:text-2xl font-extrabold mt-10 mb-3">Built for every student</h2>
  <div className="grid gap-4 md:grid-cols-2">{stages.map(([t,s,d,e,tone])=><Link to="/classes" key={t} className="group relative overflow-hidden rounded-lg min-h-[180px] flex items-end p-6 ring-1 ring-white/10 hover:ring-white/50 transition" style={{background:`linear-gradient(120deg,${tone[0]},${tone[1]})`}}>
   <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[7rem] opacity-40 group-hover:scale-110 transition" aria-hidden>{e}</span><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
   <div className="relative"><p className="text-xs font-bold text-white/80">{s}</p><p className="font-display font-black text-2xl mt-1">{t}</p><p className="text-sm text-white/80 mt-1 max-w-xs">{d}</p></div></Link>)}</div>

  <h2 className="font-display text-xl md:text-2xl font-extrabold mt-12 mb-3">Why Story Teacher?</h2><div className="flex flex-wrap gap-2">{why.map(t=><span key={t} className="bg-soft border border-white/10 rounded-full px-4 py-1.5 text-sm font-semibold">{t}</span>)}</div>
  <div className="grid md:grid-cols-2 gap-4 mt-5"><div className={card}><p className="font-bold mb-2 text-coral">The rote-learning burden</p><p className="text-sm text-ink/70">Memorising dry definitions without context, then forgetting them within days.</p></div><div className={card}><p className="font-bold mb-2 text-mint">The Story Teacher way</p><p className="text-sm text-ink/70">Narrative anchors, concept-level quizzes and simpler re-teaching when a concept is weak.</p></div></div>

  <section className="mt-12 relative overflow-hidden rounded-xl bg-gradient-to-br from-brand/40 via-surface to-surface border border-white/10 p-8 md:p-12"><p className="font-display font-extrabold text-2xl md:text-3xl max-w-2xl leading-snug">“If a child cannot learn the way we teach, maybe we should teach the way they remember: <span className="text-brand">through stories.</span>”</p>
   <Link className={btnPlay+' mt-6'} to={guest?'/signup':'/classes'}><Play size={20} fill="currentColor"/>{guest?'Create your free account':'Start Learning Now'}</Link></section></div>
 </>}
