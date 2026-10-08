import { createClient } from '@supabase/supabase-js'
// Without these env vars the app runs fully offline on local data + localStorage.
const url=import.meta.env.VITE_SUPABASE_URL as string|undefined
const key=import.meta.env.VITE_SUPABASE_ANON_KEY as string|undefined
export const supabase=url&&key?createClient(url,key):null
