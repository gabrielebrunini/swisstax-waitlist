# swissTax — Waitlist Landing Page

A bilingual (English / German) waitlist landing page for **swissTax**, an AI-powered Swiss tax optimizer aimed at tax beginners (expats, students, first-time filers, and people new to Switzerland).

- Bright, Swiss-inspired UI with a custom logo combining the Swiss flag and an AI spark
- Waitlist signup form (first name, email, canton, situation) with all 26 Swiss cantons
- Strong privacy messaging: data stored securely, never used for AI training, never sold
- Password-protected `/admin` page to view collected leads
- Backend: Express 5 + PostgreSQL (Drizzle ORM), validated with Zod
- Frontend: React + Vite + Tailwind CSS + shadcn/ui + Framer Motion
- Monorepo: pnpm workspaces with shared OpenAPI-driven typed API client (Orval)

## Tech Stack

| Layer | Tech |
|---|---|
| Monorepo | pnpm workspaces |
| Runtime | Node.js 24 |
| Language | TypeScript 5.9 |
| API | Express 5 |
| Database | PostgreSQL + Drizzle ORM |
| Validation | Zod (`zod/v4`), `drizzle-zod` |
| API codegen | Orval (from OpenAPI spec) |
| Frontend | React + Vite + Tailwind CSS v4 + shadcn/ui + Framer Motion |

## Project Structure

```
artifacts/
  api-server/        Express 5 API server (port: $PORT)
  swiss-tax/         React + Vite waitlist landing page (port: $PORT)
  mockup-sandbox/    Design sandbox (optional)
lib/
  api-spec/          OpenAPI 3 spec + Orval config
  api-client-react/  Generated React Query hooks (from spec)
  api-zod/           Generated Zod schemas (from spec)
  db/                Drizzle schema + connection
```

## Prerequisites

- **Node.js 24+**
- **pnpm 9+** (`npm install -g pnpm`)
- **PostgreSQL** database (local or hosted — e.g. Neon, Supabase, Railway)

## Running Locally

### 1. Clone and install

```bash
git clone https://github.com/gabrielebrunini/swisstax-waitlist.git
cd swisstax-waitlist
pnpm install
```

### 2. Configure environment variables

Create a `.env` file in the project root (or set these in your shell):

```bash
# PostgreSQL connection string
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# A strong secret used to gate the /admin page
ADMIN_SECRET="choose-a-long-random-string-here"

# Port for each service (set per service if running multiple)
PORT=3000
```

> The `ADMIN_SECRET` is what you'll type into the `/admin` page to view collected leads. Choose something long and random.

### 3. Push the database schema

```bash
pnpm --filter @workspace/db run push
```

This creates the `waitlist_leads` table.

### 4. Start the API server

In one terminal:

```bash
PORT=3001 pnpm --filter @workspace/api-server run dev
```

The API will listen on `http://localhost:3001`.

### 5. Start the web app

In a second terminal:

```bash
PORT=3000 pnpm --filter @workspace/swiss-tax run dev
```

Open http://localhost:3000 — you should see the landing page.

> By default the web app proxies `/api/*` to the API server. If you change the API port, update the Vite proxy config in `artifacts/swiss-tax/vite.config.ts`.

### 6. View the admin page

Go to http://localhost:3000/admin, type your `ADMIN_SECRET` value, and click **Access** to see all collected leads.

## Useful Commands

```bash
pnpm run typecheck                                          # full workspace typecheck
pnpm run build                                              # typecheck + build everything
pnpm --filter @workspace/api-spec run codegen               # regenerate API client + Zod schemas from openapi.yaml
pnpm --filter @workspace/db run push                        # push schema to DB (dev only)
```

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/waitlist` | none | Submit a waitlist entry. Returns `409` on duplicate email. |
| GET | `/api/waitlist` | `X-Admin-Secret` header | List all waitlist leads (admin only). |
| GET | `/api/healthz` | none | Health check. |

## License

MIT
