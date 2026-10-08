import type { Level, Question, Scene, TopicContent } from '../types/curriculum'

// Practice, quiz and re-learn questions are built from the topic's own story scenes,
// so every topic gets questions that match what its story actually taught.
// A scene title is the "concept". Questions are seeded, so a new seed gives a fresh set.

export const LEVELS: Level[] = ['Easy','Medium','Hard']
export const LEVEL_INFO: Record<Level,{emoji:string;blurb:string;tone:string}> = {
 Easy:{emoji:'🌱',blurb:'Warm-up. Spot what happened in each scene and say true or false.',tone:'bg-mint/20 text-mint'},
 Medium:{emoji:'🌿',blurb:'Fill in the missing word or number from the story.',tone:'bg-sun/40 text-amber'},
 Hard:{emoji:'🌳',blurb:'Match sentences to scenes, put scenes in order and finish tricky sentences.',tone:'bg-coral/10 text-coral'}}

type R = ()=>number
function hash(s:string){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function rng(seed:string):R{let a=hash(seed)||1;return()=>{a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296}}
function shuffle<T>(a:T[],r:R):T[]{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
const uniq=<T,>(a:T[])=>Array.from(new Set(a))
const pick=<T,>(a:T[],r:R)=>a[Math.floor(r()*a.length)]

const STOP=new Set('the and with that this from they them have will were what when which there their then than each into also some said does because about would could very just your you are was for but not can all any has had his her him she its our out one two too who how why over under again once only more most such many much those these been being while where after before other every both'.split(' '))

type Tok={text:string;start:number;end:number;kind:'num'|'word'|'name'}
function tokens(sentence:string):Tok[]{
 const out:Tok[]=[];const re=/\d[\d,./]*\d|\d|[\p{L}\p{M}]+(?:[’'-][\p{L}\p{M}]+)*/gu;let m:RegExpExecArray|null;let seen=0
 while((m=re.exec(sentence))){seen++;let t=m[0];const start=m.index
  if(/^\d/.test(t)){out.push({text:t,start,end:start+t.length,kind:'num'});continue}
  t=t.replace(/[’']s$/,'')
  const latin=/^[A-Za-z]/.test(t);const name=latin&&/^[A-Z]/.test(t)&&seen>1
  const content=latin?(t.length>=4&&!STOP.has(t.toLowerCase())):t.length>=3
  if(name||content)out.push({text:t,start,end:start+t.length,kind:name?'name':'word'})}
 return out}

function sentencesOf(text:string){const all=text.split(/(?<=[.!?।])\s+/).map(s=>s.trim()).filter(Boolean)
 const good=all.filter(s=>!s.endsWith('?')&&s.split(/\s+/).length>=4);return good.length?good:all}

function numDistractors(t:string,n:number,r:R,hard:boolean):string[]{
 if(t.includes('/')){const [a,b]=t.split('/').map(Number);if(!isFinite(a)||!isFinite(b))return []
  return shuffle(uniq([`${b}/${a}`,`${a}/${b+1}`,`${a}/${Math.max(1,b-1)}`,`${a+1}/${b}`,`1/${b+2}`,`${a+2}/${b+1}`]).filter(x=>x!==t),r).slice(0,n)}
 const comma=t.includes(',');const dec=(t.split('.')[1]||'').length;const v=parseFloat(t.replace(/,/g,''));if(!isFinite(v))return []
 const deltas=dec?(hard?[.5,-.5,1,-1]:[.5,-.5,1,-1,2,-2]):(hard?[1,-1,2,-2,10,-10]:[1,-1,2,-2,10,-10,100,-100])
 const small=Math.max(2,v/2);const near=deltas.filter(d=>Math.abs(d)<=small);const rest=deltas.filter(d=>Math.abs(d)>small)
 const fmt=(x:number)=>comma?x.toLocaleString('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec}):x.toFixed(dec)
 return uniq([...shuffle(near,r),...shuffle(rest,r)].map(d=>v+d).filter(x=>x>0&&x!==v).map(fmt)).filter(x=>x!==t).slice(0,n)}

function wordsFrom(scenes:Scene[]){const words:string[]=[],names:string[]=[]
 scenes.forEach(s=>sentencesOf(s.text).forEach(se=>tokens(se).forEach(t=>{if(t.kind==='word')words.push(t.text.toLowerCase());else if(t.kind==='name')names.push(t.text)})))
 return {words:uniq(words),names:uniq(names)}}

export function sceneForConcept(c:TopicContent,concept:string):number{
 const k=concept.toLowerCase();let i=c.scenes.findIndex(s=>s.title.toLowerCase()===k);if(i>=0)return i
 const w=tokens(concept).map(t=>t.text.toLowerCase());let best=0,bi=0
 c.scenes.forEach((s,j)=>{const hay=(s.title+' '+s.text).toLowerCase();const sc=w.filter(x=>hay.includes(x)).length;if(sc>best){best=sc;bi=j}})
 return bi}

function makeGen(c:TopicContent,extra:Scene[],seed:string,early:boolean){
 const r=rng(seed);const sc=c.scenes;const n=sc.length
 const near=wordsFrom(sc);const far=wordsFrom(extra)
 const sents=sc.map(s=>sentencesOf(s.text))
 const titles=sc.map(s=>s.title);const extraTitles=uniq(extra.map(s=>s.title)).filter(t=>!titles.includes(t))
 const why=(i:number)=>`${sc[i].emoji} ${sc[i].title}: ${sc[i].text}`
 const hint=(i:number)=>`Think back to the scene “${sc[i].title}”.`
 const meta=(i:number,level:Level)=>({concept:sc[i].title,level,hint:hint(i),why:why(i)})
 const mk=(type:Question['type'],q:string,correct:string,wrong:string[],count:number,i:number,level:Level):Question|null=>{
  const w=uniq(wrong.filter(x=>x&&x!==correct));if(w.length<count-1)return null
  const opts=shuffle([correct,...w.slice(0,count-1)],r);return {type,q,options:opts,answer:opts.indexOf(correct),...meta(i,level)}}
 const sentenceAt=(i:number,lap:number)=>sents[i][lap%sents[i].length]
 const otherSentences=(i:number)=>{const own=new Set(sents[i]);const a=shuffle(sents.flatMap((s,j)=>j===i?[]:s),r).filter(x=>!own.has(x));
  const b=shuffle(extra.flatMap(s=>sentencesOf(s.text)),r).filter(x=>!own.has(x));return [...a,...b]}
 const keyOf=(sentence:string,prefer:'num'|'word'):Tok|null=>{const ts=tokens(sentence);const nums=ts.filter(t=>t.kind==='num');const words=ts.filter(t=>t.kind!=='num')
  if(prefer==='num'&&nums.length)return pick(nums,r);if(words.length)return pick(words,r);return nums.length?pick(nums,r):null}
 const wordWrong=(tok:Tok,sentence:string,n:number)=>{
  const sl=sentence.toLowerCase();const a=tok.text.toLowerCase();const latin=/^[A-Za-z]/.test(tok.text);const wantName=tok.kind==='name'
  const ok=(w:string)=>w.toLowerCase()!==a&&!sl.includes(w.toLowerCase())&&/^[A-Za-z]/.test(w)===latin
  const pool=[...shuffle(wantName?near.names:near.words,r),...shuffle(wantName?far.names:far.words,r)].filter(ok)
  const fit=(w:string)=>Math.abs(w.length-tok.text.length)<=3;const sorted=[...pool.filter(fit),...pool.filter(w=>!fit(w))]
  const up=/^[A-Z]/.test(tok.text);const fixed=sorted.map(w=>wantName?w:up?w[0].toUpperCase()+w.slice(1):w.toLowerCase())
  return uniq(fixed).slice(0,n)}
 const wrongFor=(tok:Tok,sentence:string,n:number,hard:boolean)=>tok.kind==='num'?numDistractors(tok.text,n,r,hard):wordWrong(tok,sentence,n)
 const blank=(s:string,t:Tok)=>s.slice(0,t.start)+'_____'+s.slice(t.end)

 const recall=(i:number,lap:number)=>{const s=sentenceAt(i,lap);return mk('MCQ',`Which sentence is from the scene “${sc[i].title}”?`,s,otherSentences(i),3,i,'Easy')}
 const tf=(i:number,lap:number,falsy:boolean)=>{const s=sentenceAt(i,lap)
  if(falsy){const t=keyOf(s,'word');if(t){const w=wrongFor(t,s,1,false)[0];if(w){const bad=s.slice(0,t.start)+w+s.slice(t.end);return mk('True/False',`True or false: ${bad}`,'False',['True'],2,i,'Easy')}}}
  const q=mk('True/False',`True or false: ${s}`,'True',['False'],2,i,'Easy');if(q)q.options=['True','False'],q.answer=0;if(q&&falsy===false)return q;return q}
 const cloze=(i:number,lap:number,prefer:'num'|'word',count:number,level:Level,hard=false)=>{const s=sentenceAt(i,lap);const t=keyOf(s,prefer);if(!t)return null
  return mk('MCQ',`${hard?'Complete the sentence':'Fill in the blank'}: ${blank(s,t)}`,t.text,wrongFor(t,s,count+2,hard),count,i,level)}
 const noSpoil=(q:Question|null,h:string)=>{if(q)q.hint=h;return q}
 const match=(i:number,lap:number)=>noSpoil(mk('Application',`Which scene is this from? “${sentenceAt(i,lap)}”`,titles[i],[...shuffle(titles.filter((_,j)=>j!==i),r),...shuffle(extraTitles,r)],4,i,'Hard'),'Replay the story in your head and ask which scene says this.')
 const next=(i:number)=>i>=n-1?null:noSpoil(mk('Application',`In the story “${c.storyTitle}”, which scene comes right after “${titles[i]}”?`,titles[i+1],[...shuffle(titles.filter((_,j)=>j!==i&&j!==i+1),r),...shuffle(extraTitles,r)],4,i+1,'Hard'),'Go through the story one scene at a time, in order.')
 const opt=(level:Level)=>level==='Easy'?3:early?3:4
 return {r,n,recall,tf,cloze,match,next,opt,sents}}

function run(c:TopicContent,extra:Scene[],level:Level,count:number,seed:string,early:boolean):Question[]{
 const g=makeGen(c,extra,`${seed}|${level}`,early);const order=shuffle(c.scenes.map((_,i)=>i),g.r);const out:Question[]=[];const seen=new Set<string>()
 for(let k=0;out.length<count&&k<count*10;k++){
  const i=order[k%g.n];const lap=Math.floor(k/g.n);const step=k+lap
  let q:Question|null=null
  if(level==='Easy')q=step%2===0?g.recall(i,lap):g.tf(i,lap,(k+lap)%4>=2)
  else if(level==='Medium')q=step%2===0?g.cloze(i,lap,'word',g.opt('Medium'),'Medium'):g.cloze(i,lap,'num',g.opt('Medium'),'Medium')
  else{const t=step%3;q=t===0?g.match(i,lap):t===1?g.next(i):g.cloze(i,lap,'num',4,'Hard',true)
   if(!q)q=g.cloze(i,lap,'word',4,'Hard',true)}
  if(q&&!seen.has(q.q)){seen.add(q.q);out.push(q)}}
 return out}

// Practice: one level, a fresh set of questions each time.
export function buildQuestions(c:TopicContent,extra:Scene[],level:Level,o:{count?:number;seed:string;early?:boolean}):Question[]{
 const count=o.count??5;const curated=level==='Medium'?(c.questions||[]).slice(0,2).map(q=>({...q,level:'Medium' as Level})):[]
 const gen=run(c,extra,level,count,o.seed,!!o.early)
 return [...curated,...gen].slice(0,count)}

// Quiz: a mix of all three levels, easy first and hard last.
export function buildQuiz(c:TopicContent,extra:Scene[],o:{seed:string;early?:boolean}):Question[]{
 const e=!!o.early;const used=new Set<string>();const out:Question[]=[]
 ;([['Easy',2],['Medium',2],['Hard',2]] as [Level,number][]).forEach(([lv,n])=>{
  buildQuestions(c,extra,lv,{count:n+3,seed:o.seed,early:e}).forEach(q=>{if(out.filter(x=>x.level===lv).length<n&&!used.has(q.q)){used.add(q.q);out.push({...q,level:lv})}})})
 return out}

// Re-learn: a short check on one concept (scene). Each attempt asks something different.
export function focusQuestion(c:TopicContent,extra:Scene[],idx:number,attempt:number,early:boolean):Question{
 const g=makeGen(c,extra,`focus-${idx}-${attempt}`,early)
 const tries=[()=>g.cloze(idx,attempt,'word',3,'Easy'),()=>g.recall(idx,attempt),()=>g.tf(idx,attempt,attempt%2===1),()=>g.cloze(idx,attempt,'num',3,'Easy')]
 for(let k=0;k<tries.length;k++){const q=tries[(attempt+k)%tries.length]();if(q)return q}
 const s=c.scenes[idx];return {type:'True/False',q:`True or false: ${s.text}`,options:['True','False'],answer:0,concept:s.title,level:'Easy',hint:`Think back to “${s.title}”.`,why:`${s.emoji} ${s.title}: ${s.text}`}}
