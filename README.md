# Vue 3 + TypeScript + Vite

This repo is a template for quickly starting a Vue 3 + TypeScript + Vite + Firebase + Vue Router (and some other libs) project.

Fill out the `.env.example` file with your own values for the firebase config and rename it to `.env`.

Then, create your Firebase Cloud Functions by running `firebase init functions`. This will create a `functions/` directory with a sample function,
but also activate the necessary APIs in Google Cloud.

## Development
1. Install dependencies with `pnpmn install`
2. Start the firebase emulator with `pnpm emulators:start`
3. Start building your firebase Cloud Functions by going into the functions/ directory and running `pnpm build:watch`
