import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Home, LayoutGrid, Library, BarChart3, LogOut, ChevronDown } from 'lucide-react'
import { useAuth, authEnabled } from '../../lib/auth'
import { btn, btn2 } from '../ui'

// Top bar: transparent over the page, turns solid once you scroll. On phones the main links move to a bottom tab bar.
export default function Nav(){const [scrolled,setScrolled]=useState(false);const [menu,setMenu]=useState(false);const {user,signOut}=useAuth();const nav=useNavigate();const loc=useLocation()
 const links:[string,string,any][]=[['Home','/',Home],['Learn','/classes',LayoutGrid],['Subjects','/subjects',Library],['My Progress','/dashboard',BarChart3]]
 const name=(user?.user_metadata?.full_name as string|undefined)||user?.email||'Student'
 useEffect(()=>{const h=()=>setScrolled(window.scrollY>24);h();window.addEventListener('scroll',h,{passive:true});return()=>window.removeEventListener('scroll',h)},[])
 useEffect(()=>{setMenu(false)},[loc.pathname])
 const out=async()=>{setMenu(false);await signOut();nav('/')}
 const small='!px-4 !py-1.5 text-sm'
 const avatar=(l:string)=><span className="w-8 h-8 rounded-md bg-brand grid place-items-center font-extrabold text-white">{l}</span>
 return <><header className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${scrolled?'bg-paper shadow-lg shadow-black/50':'bg-gradient-to-b from-black/85 to-transparent'}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-6">
   <div className="flex items-center gap-8">
    <Link to="/" className="font-display font-black text-2xl tracking-tight text-brand" aria-label="Story Teacher home">STORY<span className="text-ink">TEACHER</span></Link>
    <nav className="hidden md:flex gap-6 text-sm font-semibold">{links.map(([l,t])=><NavLink key={l} end to={t} className={({isActive})=>isActive?'text-white font-bold':'text-ink/65 hover:text-ink transition'}>{l}</NavLink>)}</nav></div>
   <div className="flex items-center gap-3">
    {authEnabled&&(user?<div className="relative"><button onClick={()=>setMenu(m=>!m)} aria-haspopup="menu" aria-expanded={menu} aria-label={`Account menu for ${name}`} className="flex items-center gap-1.5">{avatar(name[0].toUpperCase())}<ChevronDown size={16} className={`text-ink/70 transition ${menu?'rotate-180':''}`}/></button>
      {menu&&<><button aria-label="Close menu" className="fixed inset-0 z-40 cursor-default" onClick={()=>setMenu(false)}/><div role="menu" className="absolute right-0 mt-3 w-56 z-50 rounded-md bg-black/95 border border-white/10 shadow-2xl py-2 text-sm">
        <p className="px-4 py-2 text-ink/60 truncate border-b border-white/10 mb-1">{name}</p>
        <Link role="menuitem" to="/dashboard" className="flex items-center gap-2 px-4 py-2 hover:bg-white/10"><BarChart3 size={16}/>My Progress</Link>
        <button role="menuitem" onClick={out} className="w-full flex items-center gap-2 px-4 py-2 hover:bg-white/10 text-left"><LogOut size={16}/>Sign out</button></div></>}</div>
     :<div className="flex items-center gap-2"><Link className={btn2+' '+small+' hidden sm:inline-flex'} to="/signin">Sign in</Link><Link className={btn+' '+small} to="/signup">Sign up</Link></div>)}
    {!authEnabled&&<span title="Student profile" aria-label="Student profile">{avatar('A')}</span>}</div></div></header>
  <nav aria-label="Main" className="md:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-4 bg-paper/95 backdrop-blur border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
   {links.map(([l,t,I])=><NavLink key={l} end to={t} className={({isActive})=>`flex flex-col items-center gap-0.5 py-2 text-[11px] font-semibold ${isActive?'text-white':'text-ink/50'}`}><I size={20}/>{l==='My Progress'?'Progress':l}</NavLink>)}</nav></>}
