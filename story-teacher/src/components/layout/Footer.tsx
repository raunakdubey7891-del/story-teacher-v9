import { Link } from 'react-router-dom'

const Footer=()=><footer className="mt-16 bg-paper border-t border-white/10 pb-24 md:pb-10"><div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 text-sm text-ink/55">
 <p className="font-display font-black text-xl tracking-tight text-brand">STORY<span className="text-ink">TEACHER</span></p>
 <ul className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-6 max-w-xl"><li><Link className="hover:underline" to="/classes">Choose a class</Link></li><li><Link className="hover:underline" to="/subjects">Subjects</Link></li><li><Link className="hover:underline" to="/dashboard">My progress</Link></li><li><Link className="hover:underline" to="/">Home</Link></li></ul>
 <p className="mt-6 max-w-md">Stories, practice, quizzes and re-learning for every class from Play Group to Class 5. Age-appropriate content and curriculum-first learning, in English.</p></div></footer>

export default Footer
