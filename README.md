# Full Stack Open: Relational databases

Relational database backend project for Full Stack Open, built with Node.js, Express, Sequelize, and PostgreSQL.

## Prerequisites

- Node.js 22+
- npm
- Docker + Docker Compose

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://postgres:secret@localhost:5444/postgres
TEST_DATABASE_URL=postgresql://postgres:password@localhost:5555/testdb
PORT=4000
SECRET=your-jwt-secret
```

3. Start PostgreSQL containers:

```bash
docker compose up -d
```

This starts:

- `postgres-dev` on `localhost:5444`
- `postgres-test` on `localhost:5555`

To stop containers while keeping data volumes:

```bash
docker compose down
```

To stop containers and remove volumes (full DB reset):

```bash
docker compose down -v
```

## Running the app

Start in development mode (auto-reload):

```bash
npm run dev
```

Start once (production-style):

```bash
npm start
```

By default, the API is available at:

- `http://localhost:4000` (or your configured `PORT`)

## Running tests

This project uses Node's built-in test runner.

1. Ensure test database container is running (`docker compose up -d`).
2. Start app in test mode (terminal 1):

```bash
npm run start:test
```

3. Run tests (terminal 2):

```bash
npm test
```

## Database debugging

Use `docker exec` to inspect data directly from the running PostgreSQL containers.

Open a psql shell in the dev database:

```bash
docker exec -it postgres_dev psql -U postgres -d postgres
```

Open a psql shell in the test database:

```bash
docker exec -it postgres_test psql -U postgres -d testdb
```

Run a one-off SQL command (example: list tables in dev DB):

```bash
docker exec -it postgres_dev psql -U postgres -d postgres -c "\dt"
```

Run your SQL file from the container:

```bash
docker exec -i postgres_dev psql -U postgres -d postgres < queries/queries.sql
```

Useful psql commands once inside shell:

- `\dt` - list tables
- `\d blogs` - describe table
- `SELECT * FROM blogs;` - inspect blog data
- `\q` - quit

## Useful scripts

- `npm start` - start server
- `npm run dev` - start server with file watching
- `npm run start:test` - start server with `NODE_ENV=test`
- `npm test` - run API tests
- `npm run format` - format JS/JSON/Markdown files

## Running SQL with SQLTools

If you prefer a GUI query runner in Cursor/VS Code, use SQLTools:

1. Install extensions:
   - `SQLTools`
   - `SQLTools PostgreSQL/Redshift Driver`
2. Open Command Palette -> `SQLTools: Add New Connection`
3. Create a dev connection with:
   - Host: `localhost`
   - Port: `5444`
   - Database: `postgres`
   - User: `postgres`
   - Password: `secret`
4. Open `queries/queries.sql`.
5. Select the connection in the SQLTools status bar and run:
   - current statement, or
   - selected SQL, or
   - entire file

For test DB, add another connection with port `5555`, database `testdb`, password `password`.

## API routes

Base URL: `/api`

- `GET /api/blogs`
- `POST /api/blogs`
- `PUT /api/blogs/:id`
- `GET /api/users`
- `POST /api/users`
- `POST /api/login`
- `POST /api/reset` (test/reset helper route)
- `GET /api/authors`

## Notes

- The app calls `sequelize.sync({ alter: true })` on startup to align schema with models.
- `cli.js` can be used to quickly print blog entries from the database.
