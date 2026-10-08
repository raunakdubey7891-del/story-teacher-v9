import { curriculum } from '../data/curriculum'
import { useStore } from '../store'

export function useCtx(){const {s}=useStore();const cls=curriculum.find(c=>c.id===s.selectedClass);const sub=cls?.subjects.find(x=>x.id===s.selectedSubject)
 const ch=sub?.chapters.find(x=>x.id===s.selectedChapter);const topic=ch?.topics.find(x=>x.id===s.selectedTopic);return {cls,sub,ch,topic}}
