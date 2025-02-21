import { defineEventHandler, getQuery } from 'h3'
import { db } from '../../db'
import { shows, images, ratings, genres, showGenres } from '../../db/schema'
import { asc, desc, eq, sql, ilike, and, type SQL } from 'drizzle-orm'

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

async function queryShows(params: Params) {
  const _params = {
    page: 1,
    pageSize: PAGE_SIZE,
    orderBy: 'rating',
    orderDirection: 'desc',
    ...params,
  }

  const baseQuery = db
    .select({
      id: shows.id,
      name: shows.name,
      type: shows.type,
      language: shows.language,
      status: shows.status,
      runtime: shows.runtime,
      averageRuntime: shows.averageRuntime,
      premiered: shows.premiered,
      ended: shows.ended,
      officialSite: shows.officialSite,
      summary: shows.summary,
      weight: shows.weight,
      updated: shows.updated,
      image: {
        medium: images.medium,
        original: images.original,
      },
      rating: {
        average: ratings.average,
      },
      genres: sql<string>`json_agg(${genres.name})`.as('genres'),
    })
    .from(shows)
    .leftJoin(images, eq(shows.id, images.showId))
    .leftJoin(ratings, eq(shows.id, ratings.showId))
    .leftJoin(showGenres, eq(shows.id, showGenres.showId))
    .leftJoin(genres, eq(showGenres.genreId, genres.id))
    .groupBy(shows.id, images.medium, images.original, ratings.average)

  // filters
  const filters: SQL[] = []
  if (_params.query) filters.push(ilike(shows.name, `%${_params.query}%`))
  if (_params.genreId) filters.push(eq(showGenres.genreId, _params.genreId))

  baseQuery.where(and(...filters))

  // sorting
  const _order = _params.orderDirection === 'asc' ? asc : desc

  switch (_params.orderBy) {
    case 'rating':
      baseQuery.orderBy(_order(ratings.average))
      break
    default:
      baseQuery.orderBy(_order(shows.weight))
      break
  }

  // pagination
  const data = await baseQuery
    .limit(_params.pageSize)
    .offset((_params.page - 1) * _params.pageSize)

  return {
    data,
    meta: {
      page: _params.page,
      pageSize: _params.pageSize,
    },
  }
}

export const list = defineEventHandler(async (event) => {
  const query = getQuery<Params>(event)
  return await queryShows(query)
})
