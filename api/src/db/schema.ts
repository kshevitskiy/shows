import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  date,
  timestamp,
  unique,
  foreignKey,
  numeric,
  primaryKey,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const shows = pgTable('shows', {
  id: serial().primaryKey().notNull(),
  url: text().notNull(),
  name: varchar({ length: 255 }).notNull(),
  type: varchar({ length: 50 }).notNull(),
  language: varchar({ length: 50 }),
  status: varchar({ length: 50 }).notNull(),
  runtime: integer(),
  averageRuntime: integer('average_runtime'),
  premiered: date(),
  ended: date(),
  officialSite: text('official_site'),
  weight: integer(),
  summary: text(),
  updated: timestamp({ mode: 'string' }).notNull(),
})

export const genres = pgTable(
  'genres',
  {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 100 }).notNull(),
  },
  (table) => [unique('genres_name_unique').on(table.name)]
)

export const ratings = pgTable(
  'ratings',
  {
    id: serial().primaryKey().notNull(),
    showId: integer('show_id'),
    average: numeric({ precision: 3, scale: 1 }).default('0').notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.showId],
      foreignColumns: [shows.id],
      name: 'ratings_show_id_shows_id_fk',
    }),
    unique('ratings_show_id_unique').on(table.showId),
  ]
)

export const images = pgTable(
  'images',
  {
    id: serial().primaryKey().notNull(),
    showId: integer('show_id'),
    medium: text(),
    original: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.showId],
      foreignColumns: [shows.id],
      name: 'images_show_id_shows_id_fk',
    }),
    unique('images_show_id_unique').on(table.showId),
  ]
)

export const showGenres = pgTable(
  'show_genres',
  {
    showId: integer('show_id').notNull(),
    genreId: integer('genre_id').notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.showId],
      foreignColumns: [shows.id],
      name: 'show_genres_show_id_shows_id_fk',
    }),
    foreignKey({
      columns: [table.genreId],
      foreignColumns: [genres.id],
      name: 'show_genres_genre_id_genres_id_fk',
    }),
    primaryKey({
      columns: [table.showId, table.genreId],
      name: 'show_genres_show_id_genre_id_pk',
    }),
  ]
)
