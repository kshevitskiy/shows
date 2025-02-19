import 'dotenv/config'

export async function sync(
  insertShow: (show: unknown) => Promise<void>,
  rows: number = 10000
) {
  const baseUrl = process.env.TV_MAZE_API_URL
  let count = 0
  let page = 0

  while (true) {
    const response = await fetch(`${baseUrl}/shows?page=${page}`)
    const shows = await response.json()
    count += shows.length

    if (shows.length === 0) break
    if (count >= rows) break

    console.info(`⏳ processing ${shows.length} records at page #${page + 1}`)

    for (const show of shows) {
      await insertShow(show)
    }

    page++
  }

  console.info('📈 total shows: ', count)
  process.exit(0)
}
