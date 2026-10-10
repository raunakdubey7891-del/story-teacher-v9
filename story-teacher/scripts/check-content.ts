// Sanity checks for the curriculum content.  node --experimental-strip-types scripts/check-content.ts
import { curriculum, topicContent } from '../src/data/curriculum.ts'
import { buildQuestions, buildQuiz, focusQuestion, LEVELS } from '../src/lib/questions.ts'
const errs:string[]=[];let topics=0,scenes=0
const ids=new Set<string>()
const names=curriculum.map(c=>c.name)
const emojiOnly=/^[\p{Extended_Pictographic}\p{Emoji_Component}\u200d\ufe0f\u20e3]+$/u
const titles=new Map<string,string>()
curriculum.forEach(c=>c.subjects.forEach(s=>s.chapters.forEach(ch=>ch.topics.forEach(t=>{
 topics++;if(ids.has(t.id))errs.push('dup id '+t.id);ids.add(t.id)
 const tc=topicContent[t.id];const where=`${c.name}/${s.name}/${ch.name}/${t.name}`
 if(!tc){errs.push('no content '+where);return}
 if(!t.description||t.description.length<20)errs.push('weak description '+where)
 if(tc.scenes.length<4)errs.push('few scenes '+where)
 const dup=titles.get(tc.storyTitle);if(dup&&dup.split('/')[0]===c.name)errs.push(`dup story title in class: ${tc.storyTitle}`);titles.set(tc.storyTitle,where)
 tc.scenes.forEach((sc,i)=>{scenes++;if(!emojiOnly.test(sc.emoji))errs.push(`bad emoji "${sc.emoji}" in ${where} scene ${i+1}`);if(!sc.title||sc.text.length<20)errs.push(`short scene ${where} #${i+1}`)})})))) 
// Every topic must produce valid practice (3 levels), quiz and re-learn questions.
let qsets=0
curriculum.forEach(c=>c.subjects.forEach(s=>{const all=s.chapters.flatMap(ch=>ch.topics.flatMap(t=>topicContent[t.id].scenes))
 s.chapters.forEach(ch=>ch.topics.forEach(t=>{const tc=topicContent[t.id];const ex=all.filter(x=>!tc.scenes.includes(x));const early=c.level==='Early Learning';const where=`${c.name}/${s.name}/${t.name}`
  const valid=(q:any,tag:string)=>{if(!q.options[q.answer]||new Set(q.options).size!==q.options.length||q.options.length<2)errs.push(`bad question (${tag}) ${where}: ${q.q}`)}
  LEVELS.forEach(lv=>{const qs=buildQuestions(tc,ex,lv,{seed:t.id,early});qsets++;if(qs.length<5)errs.push(`only ${qs.length} ${lv} questions in ${where}`);qs.forEach(q=>valid(q,lv))})
  const qz=buildQuiz(tc,ex,{seed:t.id,early});if(qz.length<6)errs.push(`quiz has ${qz.length} questions in ${where}`);qz.forEach(q=>valid(q,'quiz'))
  tc.scenes.forEach((_,i)=>valid(focusQuestion(tc,ex,i,0,early),'re-learn'))}))}))
console.log('question sets checked:',qsets)
console.log('classes:',names.join(', '));console.log('topics:',topics,'scenes:',scenes)
curriculum.forEach(c=>console.log(' ',c.name.padEnd(10),c.subjects.map(s=>`${s.name} ${s.chapters.reduce((n,x)=>n+x.topics.length,0)}`).join(' | ')))
if(errs.length){console.log('\nPROBLEMS:');errs.forEach(e=>console.log(' -',e));process.exit(1)}else console.log('\nAll checks passed')
