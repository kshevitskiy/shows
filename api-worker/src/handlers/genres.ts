import { SupabaseClient } from '@supabase/supabase-js'
import { defineEventHandler } from 'h3'
import { createSupabaseClient } from '../client'

async function queryGenres(db: SupabaseClient) {
  const { data, error } = await db.from('genres').select('*')

  if (error) throw error

  return data
}

export const list = defineEventHandler(async (event) => {
  // cloudflare env
  const env = event.context.cloudflare?.env
  const supabase = createSupabaseClient(env)

  return await queryGenres(supabase)
})
