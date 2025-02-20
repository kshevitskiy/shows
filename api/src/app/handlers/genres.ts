import { defineEventHandler } from 'h3'
import { db } from '../../db'

function queryGenres() {
  return db.query.genres.findMany()
}

export const list = defineEventHandler(queryGenres)
