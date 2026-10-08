import { Link } from 'react-router-dom'

const Footer=()=><footer className="border-t border-line/60 mt-12 bg-surface"><div className="max-w-6xl mx-auto px-5 py-10 grid gap-8 md:grid-cols-4 text-sm">
 <div className="md:col-span-2"><p className="font-display text-xl font-bold">Story Teacher</p><p className="text-ink/60 mt-2 max-w-sm">Stories, practice, quizzes and re-learning for every class from Play Group to Class 5.</p></div>
 <div><p className="font-bold mb-2">Learn</p><ul className="space-y-1 text-ink/60"><li><Link to="/classes">Choose a class</Link></li><li><Link to="/subjects">Subjects</Link></li><li><Link to="/dashboard">My progress</Link></li></ul></div>
 <div><p className="font-bold mb-2">Built for students</p><p className="text-ink/60">Age-appropriate content and curriculum-first learning, in English.</p></div></div></footer>

export default Footer
