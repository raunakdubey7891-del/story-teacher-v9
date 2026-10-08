import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export const card='bg-surface rounded-2xl border border-line p-6 text-left transition duration-200 hover:-translate-y-0.5 hover:border-sun/40'
export const btn='inline-flex items-center gap-2 rounded-full bg-sun text-deep font-extrabold px-6 py-3 hover:brightness-110 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed'
export const btn2='inline-flex items-center gap-2 rounded-full bg-transparent text-ink font-bold px-6 py-3 border border-line hover:bg-soft transition disabled:opacity-40'
export const Bar=({v}:{v:number})=><div className="h-2 rounded-full bg-ink/10"><div className="h-2 rounded-full bg-mint" style={{width:v+'%'}}/></div>
export const Crumbs=({items}:{items:[string,string][]})=><nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-ink/60 mb-4">
 {items.map(([l,to],i)=><span key={l} className="flex items-center gap-1">{i>0&&<ChevronRight size={14}/>}<Link className="hover:text-ink underline-offset-2 hover:underline" to={to}>{l}</Link></span>)}</nav>
export const Page=({children}:{children:ReactNode})=><main className="max-w-6xl mx-auto px-5 py-10">{children}</main>
export const Grid=({children}:{children:ReactNode})=><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
export const Empty=()=><div className={card+' text-center'}><p className="font-bold">Nothing selected yet</p><Link className={btn+' mt-4'} to="/classes">Choose a class</Link></div>
export const Hero=({crumbs,title,sub}:{crumbs:[string,string][];title:string;sub?:string})=><div className="rounded-3xl bg-gradient-to-br from-soft to-surface border border-line text-ink p-6 md:p-8 mb-8">
 <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-ink/70 mb-3">{crumbs.map(([l,to],i)=><span key={l} className="flex items-center gap-1">{i>0&&<ChevronRight size={14}/>}<Link className="hover:text-ink hover:underline" to={to}>{l}</Link></span>)}</nav>
 <h1 className="font-display text-3xl md:text-4xl">{title}</h1>{sub&&<p className="text-ink/75 mt-1">{sub}</p>}</div>
export const Tile=({children,tone='bg-ink/10 text-ink'}:{children:ReactNode;tone?:string})=><span className={`grid place-items-center w-12 h-12 rounded-xl ${tone}`}>{children}</span>
export const badge={not_started:'bg-ink/10 text-ink',learning:'bg-sun/40 text-amber',mastered:'bg-mint/20 text-mint'}
