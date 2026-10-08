import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { BookOpen, Menu, X, LogOut } from 'lucide-react'
import { useAuth, authEnabled } from '../../lib/auth'
import { btn, btn2 } from '../ui'

export default function Nav(){const [open,setOpen]=useState(false);const {user,signOut}=useAuth();const nav=useNavigate()
 const links:[string,string][]=[['Learn','/classes'],['My Progress','/dashboard'],['Subjects','/subjects']]
 const name=(user?.user_metadata?.full_name as string|undefined)||user?.email||'Student'
 const out=async()=>{setOpen(false);await signOut();nav('/')}
 const small='!px-4 !py-2 text-sm'
 return <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-ink/10"><div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
  <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold"><BookOpen className="text-sun"/>Story Teacher</Link>
  <nav className="hidden md:flex gap-8 font-semibold">{links.map(([l,t])=><NavLink key={l} to={t} className={({isActive})=>`px-4 py-1.5 rounded-lg ${isActive?'bg-sun text-deep':'hover:bg-ink/5'}`}>{l}</NavLink>)}</nav>
  <div className="flex items-center gap-3">
   {authEnabled&&(user?<><div className="w-9 h-9 rounded-full bg-sun grid place-items-center font-bold" title={name} aria-label={`Signed in as ${name}`}>{name[0].toUpperCase()}</div>
     <button onClick={out} className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-ink/70 hover:text-ink"><LogOut size={16}/>Sign out</button></>
    :<div className="hidden sm:flex items-center gap-2"><Link className={btn2+' '+small} to="/signin">Sign in</Link><Link className={btn+' '+small} to="/signup">Sign up</Link></div>)}
   {!authEnabled&&<div className="w-9 h-9 rounded-full bg-sun grid place-items-center font-bold" aria-label="Student profile">A</div>}
   <button className="md:hidden" aria-label="Menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></div>
  {open&&<div className="md:hidden px-5 pb-4 flex flex-col gap-3 font-semibold">{links.map(([l,t])=><Link key={l} to={t} onClick={()=>setOpen(false)}>{l}</Link>)}
   {authEnabled&&(user?<button className="text-left" onClick={out}>Sign out</button>:<><Link to="/signin" onClick={()=>setOpen(false)}>Sign in</Link><Link to="/signup" onClick={()=>setOpen(false)}>Sign up</Link></>)}</div>}</header>}
