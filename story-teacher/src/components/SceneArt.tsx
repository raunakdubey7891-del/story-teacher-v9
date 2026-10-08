import { useMemo } from 'react'

// An illustrated, animated storybook scene built from the scene's emoji: sky, sun or moon, drifting clouds, hills and a ground strip,
// with the emoji "actors" popping in and bobbing. No image files are needed, so it works offline and loads instantly.
type Theme={sky:[string,string];hill1:string;hill2:string;ground:string;night?:boolean}
const themes:Record<string,Theme>={
 maths:{sky:['#16215C','#3B54B0'],hill1:'#33519F',hill2:'#263F82',ground:'#1B2E66'},
 english:{sky:['#3F1A58','#8B3F8E'],hill1:'#7B3A80',hill2:'#5F2D66',ground:'#45214E'},
 evs:{sky:['#0C3F3B','#1F7F66'],hill1:'#2B8F63',hill2:'#1F7050',ground:'#165339'},
 hindi:{sky:['#52230F','#BC6A2D'],hill1:'#A9582A',hill2:'#83431F',ground:'#5E2F15'},
 early:{sky:['#271D63','#6C4DBA'],hill1:'#5E49AB',hill2:'#483889',ground:'#33276D'},
 night:{sky:['#0A1138','#2B3A8C'],hill1:'#2C4290',hill2:'#203374',ground:'#16245A',night:true}}
export const themeFor=(subject:string,early:boolean,emoji:string):Theme=>{
 if(/🌙|⭐|🌌|😴/.test(emoji))return themes.night
 const k=subject.toLowerCase()
 return /math|number/.test(k)?themes.maths:/english/.test(k)?themes.english:/evs|environment/.test(k)?themes.evs:/hindi/.test(k)?themes.hindi:early?themes.early:themes.evs}

const seg=(s:string)=>Array.from(new Intl.Segmenter().segment(s),x=>x.segment).filter(x=>x.trim())
const rand=(seed:number)=>{let t=seed+0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}

export default function SceneArt({emoji,label,subject,early,seed}:{emoji:string;label:string;subject:string;early:boolean;seed:number}){
 const th=themeFor(subject,early,emoji)
 const actors=useMemo(()=>seg(emoji).slice(0,6),[emoji])
 const n=actors.length||1
 const big=n<=1?150:n<=2?120:n<=3?100:n<=4?84:70
 const sun=useMemo(()=>({x:12+rand(seed)*70}),[seed])
 const stars=useMemo(()=>Array.from({length:14},(_,i)=>({x:rand(seed*7+i)*100,y:rand(seed*13+i)*55,d:rand(seed*3+i)*2.4,s:8+rand(seed*5+i)*10})),[seed])
 return <div role="img" aria-label={label} className="relative w-full h-full min-h-[300px] lg:min-h-[460px] overflow-hidden rounded-2xl" style={{background:`linear-gradient(180deg,${th.sky[0]} 0%,${th.sky[1]} 70%)`}}>
  {stars.map((s,i)=><span key={i} className="st-star absolute text-ink" style={{left:s.x+'%',top:s.y+'%',fontSize:s.s,animationDelay:s.d+'s'}} aria-hidden>✦</span>)}
  <span className="st-sun absolute" style={{left:sun.x+'%',top:'7%',width:84,height:84,borderRadius:'50%',background:'radial-gradient(circle,#FFF4C2 28%,rgba(255,214,102,.55) 52%,rgba(255,214,102,0) 72%)'}} aria-hidden/>
  {[0,1,2].map(i=><span key={i} className="st-cloud absolute text-5xl opacity-25" style={{top:`${8+i*14}%`,left:0,animationDuration:`${38+i*14}s`,animationDelay:`-${i*13}s`,filter:'brightness(.8)'}} aria-hidden>☁️</span>)}
  <svg className="absolute inset-x-0 bottom-0 w-full h-[46%]" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden>
   <path d="M0 80 Q70 10 150 70 T300 60 T400 85 V200 H0Z" fill={th.hill1}/>
   <path d="M0 120 Q90 60 190 110 T400 100 V200 H0Z" fill={th.hill2}/>
   <rect y="150" width="400" height="50" fill={th.ground}/></svg>
  <div className="absolute inset-x-0 bottom-[12%] flex items-end justify-center gap-1 sm:gap-3 px-4 flex-wrap">
   {actors.map((a,i)=><span key={seed+'-'+i} className="st-actor leading-none select-none" style={{fontSize:big,animationDelay:`${i*.12}s, ${i*.35}s`}} aria-hidden>{a}</span>)}</div>
  {[0,1,2,3].map(i=><span key={i} className="st-star absolute text-yellow-200" style={{left:`${10+rand(seed+i)*80}%`,top:`${20+rand(seed*2+i)*30}%`,animationDelay:i*.5+'s',fontSize:14+i*3}} aria-hidden>✨</span>)}
 </div>}
