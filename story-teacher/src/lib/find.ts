import { curriculum, topicContent } from '../data/curriculum'
import type { Scene } from '../types/curriculum'

// Look up a topic (and where it lives) from its id.
export function findTopic(id:string){
 for(const cls of curriculum)for(const sub of cls.subjects)for(const ch of sub.chapters){const topic=ch.topics.find(t=>t.id===id);if(topic)return {cls,sub,ch,topic}}
 return null}

// Scenes from the same chapter, then the same subject. Used as believable wrong answers for the generated questions.
export function siblingScenes(id:string):Scene[]{
 const f=findTopic(id);if(!f)return []
 const near=f.ch.topics.filter(t=>t.id!==id).flatMap(t=>topicContent[t.id]?.scenes||[])
 const far=f.sub.chapters.filter(x=>x.id!==f.ch.id).flatMap(x=>x.topics.flatMap(t=>topicContent[t.id]?.scenes||[]))
 return [...near,...far.slice(0,40)]}
