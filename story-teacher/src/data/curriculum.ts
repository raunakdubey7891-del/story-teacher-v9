import type { Chapter, SchoolClass, Subject, TopicContent, Scene } from '../types/curriculum'
import type { SubjectDef } from './classes/types.ts'
import { quizzes } from './stories/quizzes.ts'
import { playGroup } from './classes/play-group.ts'
import { nursery } from './classes/nursery.ts'
import { lkg } from './classes/lkg.ts'
import { ukg } from './classes/ukg.ts'
import { class1 } from './classes/class-1.ts'
import { class2 } from './classes/class-2.ts'
import { class3 } from './classes/class-3.ts'
import { class4 } from './classes/class-4.ts'
import { class5 } from './classes/class-5.ts'

// Curriculum is Play Group to Class 5 only. Each class has its own file in src/data/classes/.
// Every topic has a description and a story whose scenes follow that description.
const slug=(s:string)=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'x'
const toScene=(s:string):Scene=>{const [emoji,title,...t]=s.split('|');return {emoji,title,text:t.join('|')}}

const classes:[string,string,string,SubjectDef[]][]=[
 ['Play Group','Early Learning','Sounds, songs and big, friendly ideas',playGroup],
 ['Nursery','Early Learning','Letters, colours, shapes and numbers',nursery],
 ['LKG','Early Learning','First words, counting and my world',lkg],
 ['UKG','Early Learning','Ready for big school',ukg],
 ['Class 1','Primary','Build strong foundations',class1],
 ['Class 2','Primary','Bigger numbers, richer stories',class2],
 ['Class 3','Primary','Think, measure and explore',class3],
 ['Class 4','Primary','Understand how things work',class4],
 ['Class 5','Primary','Ready for middle school',class5]]

// Topic content is keyed by curriculum topic id. AI/Supabase later returns this same shape.
export const topicContent:Record<string,TopicContent>={}

export const curriculum:SchoolClass[]=classes.map(([name,level,blurb,defs])=>{
 const cid=slug(name)
 const subjects:Subject[]=defs.map(([sName,chs])=>{
  const sid=`${cid}__${slug(sName)}`
  const chapters:Chapter[]=chs.map(([cName,tps],ci)=>{
   const chid=`${sid}__c${ci+1}`
   return {id:chid,name:cName,topics:tps.map(([tName,description,storyTitle,scenes],ti)=>{
    const id=`${chid}__t${ti+1}`
    const base:TopicContent={storyTitle,scenes:scenes.map(toScene),questions:[],strong:[],weak:[]}
    topicContent[id]={...base,...quizzes[`${name}|${sName}|${cName}|${tName}`]}
    // Subtopics are the story's own scene titles, so what the card promises is what the slides teach.
    return {id,name:tName,description,subtopics:base.scenes.map(s=>s.title)}})}})
  return {id:sid,name:sName,chapters}})
 return {id:cid,name,level,blurb,subjects}})

export const levels=['Early Learning','Primary']
