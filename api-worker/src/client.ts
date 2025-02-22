import { createClient } from '@supabase/supabase-js'

export const createSupabaseClient = (env: any) =>
  createClient(env.SUPABASE_URL, env.SUPABASE_KEY)
