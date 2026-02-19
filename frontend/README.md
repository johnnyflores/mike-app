# Mike App Frontend

Mike App is my personal social feed project built with React + TypeScript and connected to a FastAPI backend.

## About This Project

- **Type:** Personal full-stack practice project (frontend in this folder)
- **Goal:** Build a simple social app experience with modern web tools
- **What you can do:** Create an account, sign in, post images, and comment

## Tech Stack

- React 19
- TypeScript
- Vite
- Material UI (MUI)
- ESLint
- Fetch API for REST
- FastAPI Backend

## Highlights

- End-to-end user flow: sign up, sign in, create post, comment, sign out
- Responsive UI built with Material UI components
- Clean structure using custom hooks and context for state management
- API integration with reusable request helpers

## Features

- User authentication (sign up / sign in / logout)
- Feed of posts
- Image upload for new posts
- Comments on posts
- Auth state persisted in `localStorage`

## Technical Notes

- `AuthContext` + custom hook for centralized auth state
- Reusable API helpers in `src/utils/api.ts` for consistent request/error handling
- Custom hooks (`usePosts`, `useAuth`) to keep components lean
- MUI-based responsive layout with modular components
- Vite setup for fast local development and proxy support

## Architecture Snapshot

- `src/components` → UI building blocks (Post, Comments, ImageUpload)
- `src/context` → global auth state management
- `src/hooks` → data and state logic
- `src/utils` → API constants and fetch helpers
- `src/types` → shared TypeScript models

## Prerequisites

- Node.js 20+ (recommended)
- npm 10+ (or compatible)
- Backend API running (FastAPI), default: `http://127.0.0.1:8000`

## Install

From the `frontend` folder:

```bash
npm install
```

## Run (Development)

```bash
npm run dev
```

App default URL:

- `http://localhost:5173`

## Build / Preview

```bash
npm run build
npm run preview
```

## Lint

```bash
npm run lint
```

## API Configuration

Frontend API base URL is currently defined in:

- `src/utils/constants.ts`

Current value:

- `http://127.0.0.1:8000/`

Vite dev proxy is configured in:

- `vite.config.ts`

Proxy rule:

- `/api` -> `http://127.0.0.1:8000`

If you use the proxy approach, set `BASE_URL` to `/api/` in `src/utils/constants.ts`.

## Demo Flow

1. Open app and create a new account.
2. Sign in and upload a post image with a caption.
3. Verify the post appears in the feed.
4. Add a comment to confirm end-to-end API interaction.
5. Log out and confirm auth state clears correctly.

## Why I Built It

I built this project to improve my full-stack development skills by connecting a React frontend to a FastAPI backend and practicing real-world features like authentication, file upload, and API error handling.

## Project Structure

```text
frontend/
	src/
		components/     # React UI components
		context/
		hooks/          # Custom hooks (Auth, Posts)
		types/          # TypeScript types
		utils/          # API helpers
		App.tsx
		main.tsx
```

## Notes

- Signup and login APIs are defined in `src/utils/api.ts`.
- Auth context is in `src/context/AuthContext.tsx`, and hook is in `src/context/useAuth.ts`.

## Next Improvements

- Add automated tests (unit + integration)
- Add CI checks for lint/build
- Add deployed demo URL and screenshots/GIF
