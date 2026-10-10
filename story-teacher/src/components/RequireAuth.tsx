import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth, authEnabled } from '../lib/auth'
import { Page } from './ui'

// Learning pages need a signed-in student. Without Supabase keys (local dev) they stay open.
export default function RequireAuth(){const {user,loading}=useAuth();const loc=useLocation()
 if(!authEnabled)return <Outlet/>
 if(loading)return <Page><p className="text-ink/60 text-center py-20">Loading…</p></Page>
 return user?<Outlet/>:<Navigate to="/signin" replace state={{from:loc.pathname}}/>}
