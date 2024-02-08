<script setup lang="ts">
import {
  AuthError,
  browserLocalPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { useRouter } from "vue-router";

import { auth } from "@/firebase";

function errorHasCode(e: object | null): e is AuthError {
  return e !== null && "code" in e;
}
const router = useRouter();
const signIn = async () => {
  const provider = new GoogleAuthProvider();
  await setPersistence(auth, browserLocalPersistence);
  signInWithPopup(auth, provider)
    .then(() => router.push("/"))
    .catch(async (e) => {
      if (typeof e === "object" && errorHasCode(e)) {
        if (e.code === "auth/popup-blocked") {
          await signInWithRedirect(auth, provider).then(() => router.push("/"));
        }
      }
    });
};
</script>

<template>
  <button
    type="button"
    class="flex h-10 items-center gap-2 rounded-sm bg-[#4285F4] p-[2px] pr-[8px] text-black dark:text-white"
    style="{
        fontFamily: 'Roboto'
        fontWeight: 500,
      }"
    @click="signIn"
  >
    <svg
      class="h-full bg-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 42 42"
    >
      <g fill="none" fillRule="evenodd">
        <path
          fill="#4285F4"
          d="m31.6 23.2-.1-1.8H23v3.4h4.8a3.9 3.9 0 0 1-1.8 2.8v2.2h3a8.8 8.8 0 0 0 2.6-6.6Z"
        />

        <path
          fill="#34A853"
          d="M23 32c2.4 0 4.5-.8 6-2.2l-3-2.2a5.4 5.4 0 0 1-8-2.9h-3V27a9 9 0 0 0 8 5Z"
        />

        <path
          fill="#FBBC05"
          d="M18 24.7a5.4 5.4 0 0 1 0-3.4V19h-3a9 9 0 0 0 0 8l3-2.3Z"
        />

        <path
          fill="#EA4335"
          d="M23 17.6c1.3 0 2.5.4 3.4 1.3l2.6-2.6A9 9 0 0 0 15 19l3 2.4a5.4 5.4 0 0 1 5-3.7Z"
        />

        <path d="M14 14h18v18H14V14Z" />
      </g>
    </svg>
    Sign in with Google
  </button>
</template>
