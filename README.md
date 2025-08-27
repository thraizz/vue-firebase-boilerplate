# Vue 3 + TypeScript + Vite

This repo is a template for quickly starting a Vue 3 + TypeScript + Vite + Firebase + Vue Router (and some other libs) project.

Fill out the `.env.example` file with your own values for the firebase config and rename it to `.env`.

Then, create your Firebase Cloud Functions by running `firebase init functions`. This will create a `functions/` directory with a sample function,
but also activate the necessary APIs in Google Cloud.

## Getting started

Run the init script to set up your firebase project and set up this template:

```bash
./init.sh
```

## Development

1. Install dependencies with `pnpm install`
2. Start the firebase emulator with `pnpm emulators:start`
3. Start building your firebase Cloud Functions by going into the functions/ directory and running `pnpm build:watch`

## Features

- Shadcn ui components
- Tailwind for styling
- Vuefire to interact with Firebase
- A simple layout with authentication guards in place
- Login/Register with email/password + Google Auth
- A sample store for interacting with firestore (src/composables/useExample.ts)
- A cloud function for deleting user data (functions/src/index.ts)
- A settings page for deleting the user account (src/pages/settings.vue)
