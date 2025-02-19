import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  timestamp,
  date,
  numeric,
  primaryKey,
} from 'drizzle-orm/pg-core'

// shows
export const shows = pgTable('shows', {
  id: serial('id').primaryKey(),
  url: text('url').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  language: varchar('language', { length: 50 }),
  status: varchar('status', { length: 50 }).notNull(),
  runtime: integer('runtime'),
  averageRuntime: integer('average_runtime'),
  premiered: date('premiered'),
  ended: date('ended'),
  officialSite: text('official_site'),
  weight: integer('weight'),
  summary: text('summary'),
  updated: timestamp('updated').notNull(),
})

// genres
export const genres = pgTable('genres', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
})

// show genres
export const showGenres = pgTable(
  'show_genres',
  {
    showId: integer('show_id').references(() => shows.id),
    genreId: integer('genre_id').references(() => genres.id),
  },
  (table) => [
    primaryKey({ columns: [table.showId, table.genreId] }), // Composite primary key
  ]
)

// ratings
export const ratings = pgTable('ratings', {
  id: serial('id').primaryKey(),
  showId: integer('show_id')
    .references(() => shows.id)
    .unique(),
  average: numeric('average', { precision: 3, scale: 1 })
    .default('0')
    .notNull(),
})

// images
export const images = pgTable('images', {
  id: serial('id').primaryKey(),
  showId: integer('show_id')
    .references(() => shows.id)
    .unique(),
  medium: text('medium'),
  original: text('original'),
})
