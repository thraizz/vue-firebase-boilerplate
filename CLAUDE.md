# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start both Vite dev server and Firebase emulators
- `pnpm vite` - Start only the Vite dev server
- `pnpm firebase:emulate` - Start only Firebase emulators

### Building & Testing
- `pnpm build` - Type check with vue-tsc and build for production
- `pnpm typecheck` - Run TypeScript type checking with vue-tsc
- `pnpm test` - Run tests with Vitest
- `pnpm lint` - Lint TypeScript and Vue files with ESLint

### Firebase Functions
Functions are in the `functions/` directory. After running `firebase init functions`:
- `cd functions && pnpm build:watch` - Build functions in watch mode during development

## Architecture

### Core Stack
- **Vue 3** with TypeScript and Composition API
- **Vite** for build tooling with auto-import plugins
- **Firebase** for backend (Auth, Firestore, Functions, Storage)
- **VueFire** for Firebase integration
- **Vue Router** with auto-generated routes from `src/pages/`
- **Vite Plugin Vue Layouts** for layout system
- **Tailwind CSS** with shadcn-vue components

### Project Structure
- `src/pages/` - Auto-generated routes (index.vue, login.vue, register.vue, settings.vue)
- `src/layouts/` - Layout templates (default.vue)
- `src/components/` - Reusable components including shadcn-vue UI components
- `src/firebase.ts` - Firebase configuration with emulator connections for development
- `functions/src/index.ts` - Firebase Cloud Functions (includes deleteUserData function)

### Key Patterns

#### Authentication Flow
- Authentication guards in `src/router.ts` handle protected routes
- Automatic redirection to login for unauthenticated users
- Email verification enforcement for protected routes
- Firebase emulators automatically connected in development mode

#### Firebase Integration
- All Firebase services (Auth, Firestore, Functions, Storage) configured in `src/firebase.ts`
- Environment variables for Firebase config loaded via Vite (VITE_FIREBASE_*)
- VueFire provides reactive Firebase bindings throughout the app
- Development uses Firebase emulators (Auth: 9099, Firestore: 8080, Storage: 9199, Functions: 5002)

#### Vue Router Setup
- Routes auto-generated from `src/pages/` directory structure
- Layouts automatically applied via vite-plugin-vue-layouts-next
- Navigation guards handle authentication and email verification
- 404s redirect to home with original path in query params

### Configuration Requirements
- Copy `.env.example` to `.env` and fill Firebase configuration values
- Run `firebase init functions` to set up Cloud Functions and activate Google Cloud APIs
- Uses PNPM for package management with specific onlyBuiltDependencies configuration