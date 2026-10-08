// Compact content format. One file per class, so every class has its own topics and stories.
// Scene string: 'emoji|scene title|scene text'.
export type TopicDef = [name: string, description: string, storyTitle: string, scenes: string[]]
export type ChapterDef = [name: string, topics: TopicDef[]]
export type SubjectDef = [name: string, chapters: ChapterDef[]]
