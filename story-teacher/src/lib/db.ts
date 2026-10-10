import { supabase } from './supabase'
import type { SchoolClass, TopicContent, QuizResult, Status } from '../types/curriculum'
// Every database call lives here. Pages never talk to Supabase directly.
export const dbEnabled=!!supabase
const check=(e:any)=>{if(e)throw e}
// The student id is the signed-in Supabase user's id. store.tsx sets it; row-level security (see supabase/schema.sql) does the rest.
let uid:string|null=null;let ready:Promise<unknown>|null=null
export const setDbUser=(id:string|null)=>{if(uid!==id){uid=id;ready=null}}
const me=()=>{if(!uid)throw new Error('Not signed in');return uid}
const ensureStudent=()=>ready||(ready=Promise.resolve(supabase!.from('students').upsert({id:me()})).then(r=>check(r.error)))

export async function fetchCurriculum():Promise<SchoolClass[]|null>{
 if(!supabase)return null
 const [c,s,ch,t]=await Promise.all(['classes','subjects','chapters','topics'].map(n=>supabase!.from(n).select('*').order('sort').limit(5000)))
 check(c.error||s.error||ch.error||t.error)
 if(!c.data?.length)return null
 return c.data.map((k:any)=>({id:k.id,name:k.name,level:k.level,blurb:k.blurb,
  subjects:s.data!.filter((x:any)=>x.class_id===k.id).map((x:any)=>({id:x.id,name:x.name,stream:x.stream||undefined,
   chapters:ch.data!.filter((y:any)=>y.subject_id===x.id).map((y:any)=>({id:y.id,name:y.name,
    topics:t.data!.filter((z:any)=>z.chapter_id===y.id).map((z:any)=>({id:z.id,name:z.name,description:z.description||'',subtopics:z.subtopics||[]}))}))}))}))}

// Lesson content per topic (English).
export async function fetchContent():Promise<Record<string,TopicContent>|null>{
 if(!supabase)return null
 const {data,error}=await supabase.from('topic_content').select('topic_id,language,content').eq('language','English')
 check(error);const out:Record<string,TopicContent>={}
 ;(data||[]).forEach((r:any)=>{out[r.topic_id]=r.content})
 return out}

export async function fetchProgress(){
 if(!supabase)return null
 await ensureStudent();const id=me()
 const [p,r]=await Promise.all([supabase.from('topic_progress').select('topic_id,status').eq('student_id',id),
  supabase.from('quiz_results').select('*').eq('student_id',id).order('created_at')])
 check(p.error||r.error)
 const progress:Record<string,Status>={};const results:Record<string,QuizResult>={}
 ;(p.data||[]).forEach((x:any)=>{progress[x.topic_id]=x.status})
 ;(r.data||[]).forEach((x:any)=>{results[x.topic_id]={score:x.score,total:x.total,correct:x.correct,missed:x.missed}})
 return {progress,results}}

export async function saveTopicStatus(topicId:string,status:Status){
 if(!supabase)return;await ensureStudent()
 check((await supabase.from('topic_progress').upsert({student_id:me(),topic_id:topicId,status,updated_at:new Date().toISOString()},{onConflict:'student_id,topic_id'})).error)}

export async function saveQuizResult(topicId:string,r:QuizResult){
 if(!supabase)return;await ensureStudent();const student_id=me()
 check((await supabase.from('quiz_results').insert({student_id,topic_id:topicId,score:r.score,total:r.total,correct:r.correct,missed:r.missed})).error)
 // Weak concepts are tracked in their own table, separate from progress.
 check((await supabase.from('weak_concepts').delete().eq('student_id',student_id).eq('topic_id',topicId)).error)
 if(r.missed.length)check((await supabase.from('weak_concepts').insert(r.missed.map(concept=>({student_id,topic_id:topicId,concept})))).error)}
