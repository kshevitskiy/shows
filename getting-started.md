# Getting Started

This guide provides step-by-step instructions to set up and run the TV Show API and TV Maze Dashboard WebApp locally for development. Follow the steps below to get started.

## 1. Clone the Repository

Clone the project repository to your local machine:

```sh
git clone git@github.com:kshevitskiy/shows.git
cd shows
```

## 2. Set Up the API (Optional)

> If you want to run the API locally, follow these steps. Otherwise, you can skip this section and use the remote development service URL in the `dashboard/.env.dist` file.

Follow these steps to set-up local api dev-server:

### **2.1** Create the `.env` File

Navigate to the `api` directory and create a `.env` file:

```sh
cd api
cp .env.dist .env
```

Edit the `.env` file to configure your environment variables (e.g., database credentials).

### **2.2** Start the Database

Start the PostgreSQL database using Docker:

```sh
docker-compose up -d db
```

### **2.3** Install Dependencies

Install the required dependencies for the API:

```sh
npm install
```

### **2.4** Run Database Migrations

Apply the database migrations to set up the schema:

```sh
npm run db:migrate
```

### **2.5** Seed the Database

Populate the database with initial data (~10k records):

```sh
npm run db:seed
```

### **2.6** Start the API Server

Run the API in development mode:

```sh
npm run dev
```

> The API will be available at `http://localhost:3000`

## 3. Set Up the Dashboard

> If you skipped the local API setup (step 2), you can use a remote development service URL. Open the `dashboard/.env.dist` file and copy the `VITE_API_URL` variable with the remote API endpoint

### **3.1** Create the `.env` File

Navigate to the `dashboard` directory and create an `.env` file:

```sh
cd dashboard
cp .env.dist .env
```

### **3.2** Install Dependencies

Install the required dependencies:

```sh
npm install
```

### **3.3** Start the Development Server

Run the dashboard in development mode:

```sh
npm run dev
```

> The dashboard will be available at `http://localhost:5173`.
