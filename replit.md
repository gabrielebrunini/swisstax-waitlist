# Workspace

## Overview

pnpm workspace monorepo using TypeScript. A bilingual (EN/DE) Swiss tax optimizer market-test landing page called **swissTax**, with a waitlist signup form and admin dashboard, backed by Express + PostgreSQL.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + Tailwind CSS + shadcn/ui + Framer Motion

## Artifacts

- **`artifacts/swiss-tax`** (`@workspace/swiss-tax`) — The swissTax waitlist landing page. Bilingual EN/DE. Waitlist sign-up form (name, email, canton, situation). Admin page at `/admin`. Deployed at `/`.
- **`artifacts/api-server`** (`@workspace/api-server`) — Express 5 API server, serves routes under `/api`.
- **`artifacts/mockup-sandbox`** — Design mockup sandbox.

## Key API Endpoints

- `POST /api/waitlist` — Submit a waitlist lead (firstName, email, canton, situation). Returns 409 on duplicate email.
- `GET /api/waitlist` — List all leads. Protected by `X-Admin-Secret` header (must match `ADMIN_SECRET` env var).
- `GET /api/healthz` — Health check.

## Database Schema

- `waitlist_leads` table: id, first_name, email (unique), canton, situation, created_at.

## Admin Access

- Admin page: `/admin`
- The `ADMIN_SECRET` env var (set in Replit Secrets as a shared env var) is used to protect the admin GET endpoint.
- To view leads, go to `/admin`, enter the admin secret, and click Access.

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
