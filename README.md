# Cognifera Clone (GDGoC UII)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-7-2d3748?style=flat-square&logo=prisma)](https://prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-336791?style=flat-square&logo=postgresql)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06b6d4?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

Website clone of [Cognifera](https://www.cognifera.web.id) featuring book CRUD operations, JWT-based authentication, Supabase Postgres integration via Prisma, and a revamped homepage UI. Built as a GDGoC UII full-stack web development learning project using Next.js App Router.

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Development](#development)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)

## Key Features

- JWT authentication for secure login
- Book CRUD operations (Create, Read, Update, soft Delete)
- Separate Admin and Member dashboards
- REST API endpoint for book data
- Supabase Postgres database integration via Prisma ORM
- Responsive UI with Tailwind CSS
- Server-side actions with automatic cache revalidation

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Backend | Node.js, Next.js API Routes |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma 7 |
| Package Manager | pnpm |

## Prerequisites

- Node.js 20+
- pnpm (or npm/yarn)
- Supabase account with a Postgres database instance
- Basic knowledge of Next.js and TypeScript

## Getting Started

### 1. Clone or Set Up the Repository

```bash
git clone https://github.com/ZanDev/cognifera-app-clone.git
cd cognifera-app-clone
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>?schema=public"
JWT_SECRET="your-secure-secret-key-here"
```

Get your `DATABASE_URL` from Supabase:
1. Log into [Supabase](https://supabase.com)
2. Select your project
3. Go to Settings > Database > Connection Pooling
4. Copy the connection string

### 4. Set Up the Database

Generate Prisma Client:

```bash
pnpm prisma generate
```

Run migrations to create tables:

```bash
pnpm prisma migrate dev --name init
```

### 5. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
pnpm dev              # Start development server (localhost:3000)
pnpm build            # Build for production
pnpm start            # Run production server
pnpm lint             # Run ESLint checks

# Prisma commands
pnpm prisma generate  # Generate Prisma Client
pnpm prisma migrate dev --name <name>  # Create and apply migration
pnpm prisma studio   # Open Prisma Studio (visual DB browser)
```

## Project Structure

```
cognifera-app/
├─ src/
│  ├─ app/
│  │  ├─ (auth)/
│  │  │  └─ login/
│  │  │     └─ page.tsx          # Login page
│  │  ├─ api/
│  │  │  └─ books/
│  │  │     └─ route.ts          # GET /api/books endpoint
│  │  ├─ dashboard/
│  │  │  ├─ admin/
│  │  │  │  └─ page.tsx          # Admin dashboard
│  │  │  └─ member/
│  │  │     └─ page.tsx          # Member dashboard
│  │  ├─ globals.css             # Global styles
│  │  ├─ layout.tsx              # Root layout
│  │  └─ page.tsx                # Homepage
│  ├─ lib/
│  │  ├─ actions.tsx             # Server actions (CRUD operations)
│  │  ├─ data.tsx                # Data fetching helpers & types
│  │  └─ db.ts                   # Prisma Client configuration
│  └─ generated/prisma/          # Auto-generated Prisma types
├─ prisma/
│  └─ schema.prisma              # Database schema definition
├─ public/                        # Static assets
├─ .env.local                     # Environment variables (create locally)
├─ package.json
├─ next.config.ts
├─ tsconfig.json
└─ README.md
```

### Key Directories Explained

| Directory | Purpose |
|-----------|---------|
| `src/app` | Next.js 13+ App Router - pages and API routes |
| `src/lib` | Utility functions, database config, server actions |
| `prisma` | Database schema and migrations |
| `public` | Static files served as-is |

## Development

### Database Schema

The `Book` model in `prisma/schema.prisma`:

```prisma
model Book {
  id        Int      @id @default(autoincrement())
  title     String
  author    String
  status    String   @default("Pending")  // "Pending", "Published", "Rejected"
  createdAt DateTime @default(now())
  deleted   Boolean  @default(false)      // Soft delete flag
}
```

### Making Schema Changes

1. Edit `prisma/schema.prisma`
2. Generate Prisma Client:
   ```bash
   pnpm prisma generate
   ```
3. Create and apply migration:
   ```bash
   pnpm prisma migrate dev --name describe_your_change
   ```

### Server Actions

Server actions in `src/lib/actions.tsx` handle CRUD operations:

- `getBooks()` - Fetch all non-deleted books
- `uploadBookAction(formData)` - Create a new book
- `updateStatusAction(id, status)` - Update book status
- `deleteBookAction(id)` - Soft delete a book
- `editBookTitle(id, formData)` - Update book title

All actions automatically revalidate the cache for relevant dashboard pages.

## API Reference

### GET /api/books

Returns all books in JSON format.

Request:
```bash
curl http://localhost:3000/api/books
```

Response:
```json
[
  {
    "id": 1,
    "title": "Book Title",
    "author": "Author Name",
    "status": "Pending",
    "createdAt": "2025-12-28T10:00:00Z",
    "deleted": false
  }
]
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `DATABASE_URL is not set` | Create `.env.local` with valid Supabase connection string |
| `PrismaClient not instantiated` | Run `pnpm prisma generate` |
| `Migration failed` | Ensure database role has create table permissions |
| `Port 3000 already in use` | Change port: `pnpm dev -- -p 3001` |
| `Module not found errors` | Run `pnpm install` and `pnpm prisma generate` |

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `JWT_SECRET`
4. Deploy

### Other Platforms

1. Build the project: `pnpm build`
2. Start the server: `pnpm start`
3. Ensure environment variables are set in your platform

## Contributing

This is a GDGoC UII learning project. Contributions are welcome!

## License

MIT License - See LICENSE file for details

## Support

For questions or issues, open an issue on GitHub or contact GDGoC UII.

## Acknowledgments

- Original site: [Cognifera](https://www.cognifera.web.id)
- Built by GDGoC UII
- Tech stack powered by Next.js, Prisma, and Supabase
