import type { TopicContent } from '../../types/curriculum'
// Optional quiz, strong/weak concepts and re-learn lesson for a story, keyed by 'class|subject|chapter|topic'.
// Stories without an entry here are story-only for now.
export const quizzes: Record<string, Partial<Pick<TopicContent,'questions'|'strong'|'weak'|'reteach'>>> = {
 'Class 1|EVS|Plants|Introduction to Plants': {
  questions: [
   {type:'MCQ',q:'What does a seed need to start growing?',options:['Water and warmth','Loud music','Plastic','A toy'],answer:0,concept:'What seeds need'},
   {type:'MCQ',q:'Which part of the seed grows down into the soil first?',options:['Root','Leaf','Flower','Fruit'],answer:0,concept:'Roots'},
   {type:'True/False',q:'Plants need sunlight to grow.',options:['True','False'],answer:0,concept:'Sunlight'},
   {type:'MCQ',q:'A small green shoot pushes up toward which of these?',options:['Light','A rock','A wall','The dark'],answer:0,concept:'Shoot'},
   {type:'Application',q:'Meena forgot to water her seed pot for many days. What will most likely happen?',options:['The seed grows well','The seed may not grow','The pot becomes a tree','Nothing at all'],answer:1,concept:'Water'}],
  strong:['What seeds need','Roots','Sunlight'],weak:['Shoot','Water'],
  reteach:{concept:'Why seeds need water',visual:'🌰 + 💧 + ☀️ → 🌱',card:'Think of a seed as a sleepy child. Water is like a morning drink that wakes the seed up so it can start to grow.',
   q:'What does water do for the seed?',options:['Helps it wake up and grow','Makes it fly','Turns it into a stone','Keeps it asleep forever'],answer:0}}}
