<script setup lang="ts">
import type { User } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFirebaseAuth } from 'vuefire';

defineProps<{
  currentUser: User;
}>();

const auth = useFirebaseAuth();
const router = useRouter();
const isUserMenuOpen = ref(false);

async function handleLogout() {
  try {
    await auth?.signOut();
    router.push('/login');
  }
  catch (error) {
    console.error('Logout failed:', error);
  }
}
</script>

<template>
  <div class="flex items-center space-x-4">
    <div
      class="relative ml-3"
    >
      <button
        type="button"
        class="flex items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        @click="isUserMenuOpen = !isUserMenuOpen"
      >
        <span class="sr-only">Open user menu</span>
        <div class="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-white">
          {{ $props.currentUser.email?.[0].toUpperCase() }}
        </div>
      </button>

      <!-- Dropdown menu -->
      <div
        v-if="isUserMenuOpen"
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <router-link
          to="/settings"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
          @click="isUserMenuOpen = false"
        >
          Settings
        </router-link>
        <button
          class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
          @click="handleLogout"
        >
          Sign out
        </button>
      </div>
    </div>
  </div>
</template>
