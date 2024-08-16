import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = `https://${import.meta.env.VITE_SUPABASE_ID}.supabase.co`
export const supabase = createClient(supabaseUrl, import.meta.env.VITE_SUPABASE_ANON_KEY)
