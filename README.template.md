# {{APP_NAME}}

A modern web application built with Vue 3, TypeScript, and Firebase.

## Features

- 🔥 **Firebase Integration** - Authentication, Firestore, Cloud Functions, and Storage
- 🚀 **Modern Stack** - Vue 3 with Composition API, TypeScript, and Vite
- 🎨 **UI Components** - shadcn-vue components with Tailwind CSS
- 🔐 **Authentication** - Email/password and Google SSO with email verification
- 📱 **Responsive Design** - Mobile-first responsive layout
- ⚡ **Development Tools** - Hot reload with Firebase emulators

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm
- Firebase CLI

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up Firebase configuration:
   ```bash
   cp .env.example .env
   ```
   Fill in your Firebase configuration values in `.env`

4. Initialize Firebase Functions (if needed):
   ```bash
   firebase init functions
   ```

### Development

Start the development server with Firebase emulators:

```bash
pnpm dev
```

This runs both the Vite dev server and Firebase emulators simultaneously.

#### Alternative Commands

- `pnpm vite` - Start only Vite dev server
- `pnpm firebase:emulate` - Start only Firebase emulators
- `pnpm build` - Build for production
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm lint` - Run ESLint

### Firebase Functions Development

Navigate to the functions directory and build in watch mode:

```bash
cd functions && pnpm build:watch
```

## Project Structure

```
src/
├── pages/          # Auto-generated routes
│   ├── index.vue   # Home page
│   ├── login.vue   # Login page
│   ├── register.vue # Registration page
│   └── settings.vue # User settings
├── layouts/        # Layout templates
│   └── default.vue # Default layout
├── components/     # Reusable components
│   └── ui/         # shadcn-vue UI components
├── firebase.ts     # Firebase configuration
└── router.ts       # Vue Router setup

functions/
└── src/
    └── index.ts    # Cloud Functions
```

## Authentication

The app includes complete authentication flow:

- Email/password registration and login
- Google SSO integration
- Email verification requirement
- Protected routes with authentication guards
- User account management and deletion

## Firebase Services

- **Authentication** - User registration, login, and management
- **Firestore** - Real-time database for application data
- **Cloud Functions** - Server-side logic and data processing
- **Storage** - File uploads and management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

[Add your license here]