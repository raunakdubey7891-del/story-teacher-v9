import { useNavigate, Link } from 'react-router-dom'
import { Target, BookOpen, BarChart3, Dumbbell, AlertTriangle, Sparkles, Trophy, Award, Lock } from 'lucide-react'
import { curriculum } from '../data/curriculum'
import { useStore } from '../store'
import { findTopic } from '../lib/find'
import { card, btn, btnPlay, Bar, Page } from '../components/ui'

// Everything on this page comes from the student's real progress. Nothing is made up.
export default function Dashboard(){const {s,set}=useStore();const nav=useNavigate()
 const prog=Object.values(s.learningProgress);const mastered=prog.filter(x=>x==='mastered').length;const started=prog.filter(x=>x!=='not_started').length
 const results=Object.entries(s.quizResults);const sum=results.reduce((a,[,r])=>a+r.score,0),tot=results.reduce((a,[,r])=>a+r.total,0)
 const acc=tot?Math.round(sum/tot*100)+'%':'–'
 const best=Object.values(s.practiceBest||{});const cleared=best.reduce((n,b)=>n+Object.values(b).filter(v=>(v??0)>=4).length,0)
 const cls=curriculum.find(c=>c.id===s.selectedClass)||curriculum.find(c=>c.subjects.some(x=>x.chapters.some(ch=>ch.topics.some(t=>s.learningProgress[t.id]))))||curriculum[0]
 const subs:[string,number,number][]=cls.subjects.map(x=>{const ts=x.chapters.flatMap(ch=>ch.topics);const m=ts.filter(t=>s.learningProgress[t.id]==='mastered').length;return [x.name,ts.length?Math.round(m/ts.length*100):0,m]})
 const weak=Object.entries(s.weak||{}).flatMap(([id,cs])=>cs.map(concept=>({id,concept,f:findTopic(id)}))).filter(w=>w.f)
 const lastId=results.length?results[results.length-1][0]:undefined;const last=lastId?s.quizResults[lastId]:undefined;const lastF=lastId?findTopic(lastId):null
 const cur=s.selectedTopic?findTopic(s.selectedTopic):null
 const open=(id:string,to:string)=>{const f=findTopic(id);if(!f)return;set({selectedClass:f.cls.id,selectedSubject:f.sub.id,selectedChapter:f.ch.id,selectedTopic:f.topic.id});nav(to)}
 const stats:[any,string,string][]=[[Target,String(mastered),'topics mastered'],[BookOpen,String(started),'topics started'],[BarChart3,acc,'quiz accuracy'],[Dumbbell,String(cleared),'practice levels cleared']]
 const badges:[any,string,boolean][]=[[Sparkles,'First Lesson',started>0],[Trophy,'Quiz Master',results.some(([,r])=>r.score/r.total>=.8)],[Dumbbell,'Practice Pro',cleared>=3],[Award,'Concept Crusher',mastered>=3]]
 return <Page><div className="rounded-xl bg-gradient-to-r from-brand/35 via-surface to-surface border border-white/10 text-ink p-6 md:p-10 mb-8 flex flex-wrap items-center justify-between gap-4"><div><h1 className="font-display font-black text-3xl md:text-5xl">{started?'Welcome back! 👋':'Welcome! 👋'}</h1>
   <p className="text-ink/75 mt-1">{cur?`Next up: ${cur.sub.name} · ${cur.ch.name} · ${cur.topic.name}`:'Pick a class and start your first story.'}</p></div>
   <Link className={btnPlay} to={cur?'/learn':'/classes'}>{cur?'Continue →':'Start learning →'}</Link></div>
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{stats.map(([I,v,t])=><div key={t} className={card+' !p-5'}><I className="text-brand"/><p className="font-display text-2xl font-bold mt-2">{v}</p><p className="text-sm text-ink/60">{t}</p></div>)}</div>
  <div className="grid lg:grid-cols-5 gap-6 mt-8"><div className="lg:col-span-3"><h2 className="font-display text-xl md:text-2xl font-extrabold mb-4">Your progress · {cls.name}</h2><div className="grid sm:grid-cols-2 gap-4">{subs.map(([n,p,m])=><div key={n} className={card+' !p-5'}><p className="font-bold">{n}</p><p className="text-sm text-ink/60 mb-3">{m} mastered · {p}% complete</p><Bar v={p}/></div>)}</div></div>
   <div className="lg:col-span-2"><h2 className="font-display text-xl md:text-2xl font-extrabold mb-4">Needs attention</h2>
    {weak.length===0&&<div className={card}><p className="font-bold">Nothing yet 🎉</p><p className="text-sm text-ink/60">Concepts you miss in a quiz or practice will show up here.</p></div>}
    {weak.slice(0,6).map(w=><div key={w.id+w.concept} className={card+' mb-3'}><p className="flex items-center gap-2 font-bold"><AlertTriangle className="text-amber" size={18}/>{w.concept}</p><p className="text-sm text-ink/60 mb-4">{w.f!.sub.name} • {w.f!.topic.name}</p><button className={btn} onClick={()=>open(w.id,'/reteach')}>Practice Now</button></div>)}
    {last&&lastF&&<div className={card+' mt-4'}><p className="text-sm text-ink/60">Latest quiz · {lastF.topic.name}</p><p className="font-display text-2xl">{last.score} / {last.total}</p></div>}</div></div>
  <h2 className="font-display text-xl md:text-2xl font-extrabold mt-10 mb-4">Achievements</h2><div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{badges.map(([I,t,on])=><div key={t} className={card+` !p-5 text-center ${on?'':'opacity-50'}`}><span className="mx-auto grid place-items-center w-12 h-12 rounded-full bg-sun/20 text-sun">{on?<I/>:<Lock size={20}/>}</span><p className="font-bold mt-2 text-sm">{t}</p></div>)}</div></Page>}
