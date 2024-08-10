import { createClient } from '@supabase/supabase-js'
import { Database  } from './db_types';

export const supabase = createClient<Database>(
  'https://knnmxxukaxfrhabsstvh.supabase.co',
  process.env.SUPABASE_KEY!
);
