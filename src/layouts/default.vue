<script setup lang="ts">
import TopBar from '@/components/TopBar.vue';
import { ArrowLeftIcon } from '@heroicons/vue/20/solid';
</script>

<template>
  <div class="min-h-full">
    <div class="bg-slate-900 pb-32">
      <TopBar />

      <header
        class="lg:px-8 sm:px-6 mx-auto max-w-7xl w-full flex flex-row justify-between px-4 py-10"
      >
        <div class="h-20 max-w-7xl">
          <h1 class="self-center text-3xl text-white font-bold tracking-tight">
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
      </header>
    </div>

    <main class="-mt-32">
      <div class="sm:px-6 lg:px-8 mx-auto max-w-7xl px-4 pb-12">
        <div class="sm:px-6 rounded-lg bg-white px-5 py-6 shadow">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>
