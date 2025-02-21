import 'dotenv/config'
import { reset } from 'drizzle-seed'
import { db } from '.'
import { shows, genres, ratings, images, showGenres } from './schema'
import { sync } from '../../scripts/sync'

// drop-tables and start seeding the database
seed()

async function seed() {
  try {
    await dropTables()
    await sync(insertShow)
    console.info('✅ seeding completed')
  } catch (err) {
    console.error('❌ error:', err)
  }
}

async function dropTables() {
  // reset the database
  await reset(db, {
    shows,
    genres,
    ratings,
    images,
    showGenres,
  })
}

async function insertShow(show: any) {
  // insert or update the show
  await db
    .insert(shows)
    .values({
      id: show.id,
      url: show.url,
      name: show.name,
      type: show.type,
      language: show.language,
      status: show.status,
      runtime: show.runtime || 0,
      averageRuntime: show.averageRuntime,
      premiered: show.premiered,
      ended: show.ended,
      officialSite: show.officialSite,
      weight: show.weight,
      summary: show.summary,
      updated: new Date(show.updated * 1000).toISOString(),
    })
    .onConflictDoUpdate({
      target: shows.id,
      set: {
        url: show.url,
        name: show.name,
        type: show.type,
        language: show.language,
        status: show.status,
        runtime: show.runtime || 0,
        averageRuntime: show.averageRuntime,
        premiered: show.premiered,
        ended: show.ended,
        officialSite: show.officialSite,
        weight: show.weight,
        summary: show.summary,
        updated: new Date(show.updated * 1000).toISOString(),
      },
    })

  // insert genres and create associations
  if (show.genres && show.genres.length > 0) {
    for (const genreName of show.genres) {
      // check if the genre already exists
      const existingGenre = await db.query.genres.findFirst({
        where: (genres, { eq }) => eq(genres.name, genreName),
      })

      let genreId: number

      if (existingGenre) {
        // genre already exists, use its ID
        genreId = existingGenre.id
      } else {
        // insert the genre if it doesn't exist
        const [newGenre] = await db
          .insert(genres)
          .values({ name: genreName })
          .returning()
        genreId = newGenre.id
      }

      // associate the genre with the show
      await db
        .insert(showGenres)
        .values({
          showId: show.id,
          genreId: genreId,
        })
        .onConflictDoNothing()
    }
  }

  // insert or update the rating
  await db
    .insert(ratings)
    .values({
      showId: show.id,
      average: show.rating?.average || 0,
    })
    .onConflictDoUpdate({
      target: ratings.showId,
      set: {
        average: show.rating?.average || 0,
      },
    })

  // insert or update the image
  await db
    .insert(images)
    .values({
      showId: show.id,
      medium: show.image?.medium || '',
      original: show.image?.original || '',
    })
    .onConflictDoUpdate({
      target: images.showId,
      set: {
        medium: show.image?.medium || '',
        original: show.image?.original || '',
      },
    })
}
