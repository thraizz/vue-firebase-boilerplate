<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/20/solid";

import TopBar from "@/components/TopBar.vue";

const creationPath = "/something/new";
const cta = {
  path: creationPath,
  text: "Create Something",
};
</script>

<template>
  <div class="min-h-full">
    <div class="bg-slate-900 pb-32">
      <TopBar />

      <header
        class="mx-auto flex w-full max-w-7xl flex-row justify-between px-4 py-10 sm:px-6 lg:px-8"
      >
        <div class="h-20 max-w-7xl">
          <h1 class="self-center text-3xl font-bold tracking-tight text-white">
            {{ $route.meta.title }}
          </h1>

          <router-link
            v-if="$route.meta.showBack"
            to=".."
            class="flex items-center gap-1 text-indigo-200 hover:text-indigo-100"
          >
            <ArrowLeftIcon class="size-4" /> Back
          </router-link>
        </div>
        <router-link
          v-if="$route.path !== creationPath"
          :to="cta.path"
          class="mt-1 flex h-min items-center gap-1 self-start rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
        >
          {{ cta.text }}
        </router-link>
      </header>
    </div>

    <main class="-mt-32">
      <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>
