# TV Show API

This project sets up an API to fetch and filter TV shows using a local PostgreSQL database. It supports both **development** and **production** environments using Docker and `h3`.

## 🚀 Getting Started

### Create an `.env` file

> Create a `.env` file in the `api` directory, copy contents from `.env.dist` or:

```sh
# api
cp .env.dist .env
```

## 🛠 Running in Development

### Using Docker (Hybrid Mode: DB in docker, API locally)

1. **Start the database only:**
   ```sh
   docker-compose up -d db
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run migrations:**
   ```sh
   npm run db:migrate
   ```
4. **Seed database:**
   ```sh
   npm run db:seed
   ```
5. **Start the API server locally:**

   ```sh
   npm run dev
   ```

   The API will be available at `http://localhost:3000`

## 🌍 Running in Production

### **Using Docker**

1. **Start the entire stack:**
   ```sh
   docker-compose up -d
   ```
2. **Check logs (optional):**
   ```sh
   docker-compose logs -f api
   ```
3. **Stop the services:**
   ```sh
   docker-compose down
   ```

## 🛠 Useful Commands

| Command                      | Description                      |
| ---------------------------- | -------------------------------- |
| `docker-compose up -d`       | Start services in the background |
| `docker-compose down`        | Stop and remove containers       |
| `docker-compose logs -f api` | View API logs                    |
| `npm run serve`              | Run API server                   |

> Drizzle ORM (`drizzle-kit`) commands are described (here)[https://orm.drizzle.team/docs/kit-overview]

## 📌 Notes

- The **dev setup** runs the API locally and only the database in Docker.
- The **prod setup** runs both the API and database in Docker.
- Ensure the `.env` file is configured correctly before starting the services.
