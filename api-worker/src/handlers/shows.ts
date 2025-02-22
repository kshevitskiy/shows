import { SupabaseClient } from '@supabase/supabase-js'
import { defineEventHandler, getQuery } from 'h3'
import { createSupabaseClient } from '../client'

const PAGE_SIZE = 20

type Order = 'weight' | 'rating'
type OrderDirection = 'asc' | 'desc'

interface Params {
  query?: string
  page?: number
  pageSize?: number
  orderBy?: Order
  orderDirection?: OrderDirection
  genreId?: number
}

async function queryShows(supabase: SupabaseClient, params: Params) {
  const _params = {
    page: 1,
    pageSize: PAGE_SIZE,
    orderBy: 'rating',
    orderDirection: 'desc',
    ...params,
  }

  // call postgresql function
  const { data, error } = await supabase.rpc('get_shows_sorted_by_rating', {
    page: _params.page,
    page_size: _params.pageSize,
    order_direction: _params.orderDirection,
    genre_id: _params.genreId ?? null,
    search_query: _params.query ?? null,
  })

  if (error) throw error

  // parse data
  const transformedData = data.map((show: any) => ({
    id: show.id,
    name: show.name,
    type: show.type,
    language: show.language,
    status: show.status,
    runtime: show.runtime,
    average_runtime: show.average_runtime,
    premiered: show.premiered,
    ended: show.ended,
    official_site: show.official_site,
    summary: show.summary,
    weight: show.weight,
    updated: show.updated,
    image: {
      medium: show.image_medium,
      original: show.image_original,
    },
    rating: {
      average: show.rating_average,
    },
    genres: show.genres,
  }))

  return {
    data: transformedData,
    meta: {
      page: _params.page,
      pageSize: _params.pageSize,
    },
  }
}

export const list = defineEventHandler(async (event) => {
  // cloudflare env
  const env = event.context.cloudflare?.env
  const query = getQuery<Params>(event)
  const supabase = createSupabaseClient(env)

  return await queryShows(supabase, query)
})
