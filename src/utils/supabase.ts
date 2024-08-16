import { createClient } from '@supabase/supabase-js'
import { Database } from '../database.types'

export const supabaseUrl = `https://${import.meta.env.VITE_SUPABASE_ID}.supabase.co`
export const supabase = createClient<Database>(supabaseUrl, import.meta.env.VITE_SUPABASE_ANON_KEY)
