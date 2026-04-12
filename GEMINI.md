# Health Tracker Start - Gemini Context

## Project Overview
This is a full-stack web application built with **TanStack Start**, designed to be a starting point for a health tracking application. It leverages modern React patterns, Server-Side Rendering (SSR), and type-safe end-to-end development.

## Tech Stack

### Core Frameworks
*   **Runtime:** Node.js
*   **Language:** TypeScript
*   **Fullstack Framework:** [TanStack Start](https://tanstack.com/start/latest) (built on Nitro)
*   **Frontend Library:** React 19

### Data & State
*   **Database:** PostgreSQL
*   **ORM:** [Prisma](https://www.prisma.io/)
*   **Routing:** [TanStack Router](https://tanstack.com/router) (File-based routing)
*   **Forms:** [TanStack Form](https://tanstack.com/form)
*   **Authentication:** [Better Auth](https://www.better-auth.com/) (Email/Password, Prisma Adapter)

### Styling & UI
*   **CSS:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Icons:** Lucide React
*   **Components:** `@base-ui/react`, custom components in `src/components/ui`
*   **Toast Notifications:** Sonner

### Tooling
*   **Build Tool:** Vite
*   **Linting & Formatting:** [Biome](https://biomejs.dev/)
*   **Validation:** Zod

## Key Directories

*   `src/routes/`: **Core Application Logic.** File-based routes.
    *   `__root.tsx`: The root layout component (HTML shell, providers).
    *   `api/`: API routes (handled by Nitro/TanStack Start).
*   `src/lib/`: Shared utilities.
    *   `auth.ts`: Server-side auth configuration.
    *   `auth-client.ts`: Client-side auth client.
    *   `db.ts`: Prisma client instance.
*   `src/components/`: React components.
    *   `ui/`: Reusable UI components (buttons, inputs, etc.).
    *   `auth/`: Auth-specific forms.
*   `prisma/`: Database configuration.
    *   `schema.prisma`: The source of truth for the data model.
*   `public/`: Static assets.

## Development Workflow

### Commands
*   **Start Development Server:** `pnpm dev` (Runs on port 3000)
*   **Build for Production:** `pnpm build`
*   **Preview Production Build:** `pnpm preview`
*   **Run Tests:** `pnpm test`
*   **Linting & Formatting:**
    *   Check: `pnpm check`
    *   Fix Format: `pnpm format`
    *   Lint Only: `pnpm lint`
*   **Database Management:**
    *   Open Prisma Studio: `pnpm db:studio`

### Database
*   **Provider:** PostgreSQL
*   **Schema:** Defined in `prisma/schema.prisma`.
*   **Migrations:** Use standard Prisma migration commands (e.g., `pnpm dlx prisma migrate dev --name <migration-name>`).

## Coding Conventions

*   **Routing:** Use File-Based Routing in `src/routes`. New files automatically generate routes.
*   **Styling:** Use Tailwind CSS utility classes. Avoid standard CSS files where possible, except for global styles in `src/styles.css`.
*   **Type Safety:** Rely on Prisma generated types for DB data. Use Zod for form/API validation.
*   **Auth:** Use `better-auth` hooks and helpers. The session strategy is strictly configured in `src/lib/auth.ts`.
*   **UI Components:** Use [shadcn/ui](https://ui.shadcn.com/) components for UI development.
    *   Add new components using: `pnpm dlx shadcn@latest add <component-name>`
    *   Documentation: [shadcn/ui Components](https://ui.shadcn.com/docs/components)
*   **Forms:** Use [TanStack Form](https://tanstack.com/form) for all form operations with zod for validation.
    *   Documentation: [TanStack Form Overview](https://tanstack.com/form/latest/docs/overview)
