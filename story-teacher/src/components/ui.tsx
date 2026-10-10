import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { themeFor } from './SceneArt'

// ---------- buttons and panels ----------
export const card='bg-surface rounded-lg border border-white/5 p-6 text-left transition duration-200 hover:border-white/20'
export const btn='inline-flex items-center gap-2 rounded-md bg-brand text-white font-bold px-6 py-2.5 hover:bg-brand-hover active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed'
export const btn2='inline-flex items-center gap-2 rounded-md bg-white/15 text-white font-bold px-6 py-2.5 hover:bg-white/25 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed'
// The white "Play" button used on hero banners.
export const btnPlay='inline-flex items-center gap-2 rounded-md bg-white text-black font-extrabold px-7 py-2.5 hover:bg-white/80 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed'
// Width classes for items that sit inside a horizontal <Row>.
export const rowItem='shrink-0 snap-start'

// ---------- per-class and per-subject artwork helpers ----------
export const classIcon:Record<string,string>={'Play Group':'🧸','Nursery':'🎨','LKG':'🔤','UKG':'🎒','Class 1':'🌱','Class 2':'🚀','Class 3':'🧭','Class 4':'🔭','Class 5':'🏆'}
const classTone:Record<string,[string,string]>={'Play Group':['#7C3AED','#DB2777'],'Nursery':['#0EA5E9','#6366F1'],'LKG':['#F59E0B','#EF4444'],'UKG':['#10B981','#0EA5E9'],'Class 1':['#16A34A','#065F46'],'Class 2':['#F43F5E','#7C3AED'],'Class 3':['#2563EB','#1E3A8A'],'Class 4':['#9333EA','#312E81'],'Class 5':['#EAB308','#B45309']}
export const toneOf=(className:string):[string,string]=>classTone[className]||['#334155','#0F172A']
export const subjectEmoji=(n:string)=>{const k=n.toLowerCase();return /math|number/.test(k)?'🔢':/science|physics|chem|bio/.test(k)?'🔬':/social|history|politic|geograph/.test(k)?'🌏':/hindi/.test(k)?'अ':/english/.test(k)?'📚':/evs|environment/.test(k)?'🌳':/computer|\bai\b/.test(k)?'💻':/account|business|econom/.test(k)?'💰':/rhyme|language/.test(k)?'🎵':'📘'}

// A flat gradient poster with one big emoji. Fills a positioned parent.
export const ToneArt=({tone,emoji,size='text-6xl'}:{tone:[string,string];emoji:string;size?:string})=>
 <div className="absolute inset-0 grid place-items-center" style={{background:`linear-gradient(145deg,${tone[0]},${tone[1]})`}} aria-hidden>
  <span className={`${size} drop-shadow-[0_8px_12px_rgba(0,0,0,.45)] select-none`}>{emoji}</span></div>

// A small still from a story: themed sky, hills and the scene's emoji. Pass "relative ..." or "absolute inset-0" in className.
export const Thumb=({emoji,subject='',early=false,className='',size='text-4xl sm:text-5xl'}:{emoji:string;subject?:string;early?:boolean;className?:string;size?:string})=>{
 const th=themeFor(subject,early,emoji||'');const a=Array.from(new Intl.Segmenter().segment(emoji||'📖'),x=>x.segment).filter(x=>x.trim()).slice(0,3)
 return <div className={`overflow-hidden ${className}`} style={{background:`linear-gradient(180deg,${th.sky[0]},${th.sky[1]} 75%)`}} aria-hidden>
  <svg className="absolute inset-x-0 bottom-0 w-full h-[42%]" viewBox="0 0 400 200" preserveAspectRatio="none"><path d="M0 80 Q70 10 150 70 T300 60 T400 85 V200 H0Z" fill={th.hill1}/><path d="M0 120 Q90 60 190 110 T400 100 V200 H0Z" fill={th.hill2}/></svg>
  <div className={`absolute inset-x-0 bottom-[14%] flex justify-center gap-1 ${size} leading-none`}>{a.map((x,i)=><span key={i} className="drop-shadow-[0_6px_8px_rgba(0,0,0,.5)]">{x}</span>)}</div></div>}

// ---------- progress, breadcrumbs, layout ----------
export const Bar=({v}:{v:number})=><div className="h-1.5 rounded-full bg-white/15 overflow-hidden"><div className="h-1.5 rounded-full bg-brand" style={{width:v+'%'}}/></div>
export const Crumbs=({items}:{items:[string,string][]})=><nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-ink/60 mb-4">
 {items.map(([l,to],i)=><span key={l} className="flex items-center gap-1">{i>0&&<ChevronRight size={14}/>}<Link className="hover:text-ink underline-offset-2 hover:underline" to={to}>{l}</Link></span>)}</nav>
// The top bar is fixed, so pages start below it.
export const Page=({children}:{children:ReactNode})=><main className="max-w-7xl mx-auto px-4 sm:px-8 pt-24 pb-10 min-h-[70vh]">{children}</main>
export const Grid=({children}:{children:ReactNode})=><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
export const Empty=()=><div className={card+' text-center'}><p className="font-bold">Nothing selected yet</p><Link className={btn+' mt-4'} to="/classes">Choose a class</Link></div>

// Title banner used at the top of browse pages. Give it a tone + emoji, or an "art" backdrop (for example a SceneArt with fill).
export const Hero=({crumbs,title,sub,tone=['#262633','#0B0B0F'],emoji,art,children}:{crumbs:[string,string][];title:string;sub?:string;tone?:[string,string];emoji?:string;art?:ReactNode;children?:ReactNode})=>
 <div className="relative overflow-hidden rounded-xl mb-8 min-h-[220px] md:min-h-[290px] flex items-end ring-1 ring-white/10" style={{background:`linear-gradient(120deg,${tone[0]},${tone[1]})`}}>
  {art?<div className="absolute inset-y-0 right-0 w-full md:w-3/5" aria-hidden>{art}</div>
   :emoji&&<span className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 text-[7rem] md:text-[11rem] opacity-40 select-none" aria-hidden>{emoji}</span>}
  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent"/><div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-paper/80 to-transparent"/>
  <div className="relative z-10 p-6 md:p-10 max-w-2xl w-full">
   <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-ink/70 mb-3">{crumbs.map(([l,to],i)=><span key={l} className="flex items-center gap-1">{i>0&&<ChevronRight size={14}/>}<Link className="hover:text-ink hover:underline" to={to}>{l}</Link></span>)}</nav>
   <h1 className="font-display font-black text-3xl md:text-5xl leading-tight">{title}</h1>{sub&&<p className="text-ink/80 mt-2 md:text-lg">{sub}</p>}{children}</div></div>

export const Tile=({children,tone='bg-white/10 text-ink'}:{children:ReactNode;tone?:string})=><span className={`grid place-items-center w-12 h-12 rounded-full ${tone}`}>{children}</span>
export const badge={not_started:'bg-white/10 text-ink',learning:'bg-sun/25 text-amber',mastered:'bg-mint/20 text-mint'}

// ---------- shelves and posters ----------
// A titled, horizontally scrolling shelf. Swipe on touch screens, arrow buttons on desktop.
export const Row=({title,sub,children}:{title:string;sub?:string;children:ReactNode})=>{
 const r=useRef<HTMLDivElement>(null)
 const go=(d:number)=>r.current?.scrollBy({left:d*r.current.clientWidth*.85,behavior:'smooth'})
 return <section className="mb-6 group/row"><h2 className="font-display text-xl md:text-2xl font-extrabold">{title}</h2>{sub&&<p className="text-sm text-ink/55 mt-0.5">{sub}</p>}
  <div className="relative mt-3">
   <button aria-label="Scroll left" onClick={()=>go(-1)} className="hidden md:grid absolute -left-4 sm:-left-8 top-0 bottom-0 z-20 w-12 place-items-center bg-gradient-to-r from-black/70 to-transparent opacity-0 group-hover/row:opacity-100 focus-visible:opacity-100 transition"><ChevronLeft size={32}/></button>
   <div ref={r} className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x scroll-smooth py-4 -my-4 -mx-4 px-4 sm:-mx-8 sm:px-8">{children}</div>
   <button aria-label="Scroll right" onClick={()=>go(1)} className="hidden md:grid absolute -right-4 sm:-right-8 top-0 bottom-0 z-20 w-12 place-items-center bg-gradient-to-l from-black/70 to-transparent opacity-0 group-hover/row:opacity-100 focus-visible:opacity-100 transition"><ChevronRight size={32}/></button></div></section>}

// A poster tile: artwork, optional badge, a red progress line along the bottom, then title and a short line of text.
type PosterProps={art:ReactNode;title:string;sub?:string;progress?:number;badge?:ReactNode;onClick?:()=>void;to?:string;className?:string;aspect?:string}
export const Poster=({art,title,sub,progress,badge,onClick,to,className='',aspect='aspect-video'}:PosterProps)=>{
 const inner=<><span className={`relative block ${aspect} overflow-hidden rounded-md bg-soft ring-1 ring-white/10 group-hover:ring-white/60 transition shadow-lg shadow-black/40`}>{art}
   <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"/>{badge&&<span className="absolute top-2 right-2">{badge}</span>}
   {progress!==undefined&&<span className="absolute bottom-0 inset-x-0 h-1 bg-white/25"><span className="block h-full bg-brand" style={{width:progress+'%'}}/></span>}</span>
  <span className="block font-bold mt-2 leading-tight">{title}</span>{sub&&<span className="block text-xs text-ink/55 mt-0.5 line-clamp-2">{sub}</span>}</>
 const c=`group block text-left transition duration-200 hover:scale-[1.04] focus-visible:scale-[1.04] ${className}`
 return to?<Link to={to} className={c}>{inner}</Link>:<button type="button" onClick={onClick} className={c}>{inner}</button>}
