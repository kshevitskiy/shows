import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
import path from 'path'

export default defineConfig({
  schema: path.resolve(__dirname, 'src/db/schema.ts'),
  dialect: 'postgresql',
  out: './src/db/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})
