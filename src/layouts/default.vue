<script setup lang="ts">
import AuthButtons from '@/components/AuthButtons.vue';
import Navigation from '@/components/Navigation.vue';
import UserMenu from '@/components/UserMenu.vue';
import { withDefaults } from 'vue';
import { useCurrentUser } from 'vuefire';

// Props for customization
interface Props {
  appName?: string;
  navigationItems?: Array<{
    name: string;
    path: string;
    active?: boolean;
  }>;
}

const props = withDefaults(defineProps<Props>(), {
  appName: 'App',
  navigationItems: () => [],
});

const currentUser = useCurrentUser();
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-white">
    <!-- Header with glass effect -->
    <header class="fixed top-0 left-0 right-0 backdrop-blur-sm bg-white/70 border-b border-slate-100/50 z-10 supports-[backdrop-filter]:bg-white/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Brand/Logo Area -->
          <div class="flex items-center">
            <router-link to="/" class="text-xl font-medium bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              {{ props.appName }}
            </router-link>
          </div>

          <!-- Navigation and User Menu Area -->
          <div class="flex items-center space-x-4">
            <template v-if="currentUser">
              <Navigation />
              <UserMenu :current-user="currentUser" />
            </template>
            <AuthButtons v-else />
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Area with subtle gradient -->
    <main class="pt-16">
      <!-- Hero Section Slot -->
      <slot name="hero" />

      <!-- Main Content Container -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RouterView v-slot="{ Component }">
          <transition
            name="page"
            mode="out-in"
            appear
          >
            <component :is="Component" />
          </transition>
        </RouterView>
      </div>
    </main>

    <!-- Footer Slot -->
    <footer class="bg-white/50 border-t border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <slot name="footer" />
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Page Transition Animations */
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Ensure smooth scrolling */
:deep(html) {
  scroll-behavior: smooth;
}

/* Custom scrollbar for modern browsers */
:deep(::-webkit-scrollbar) {
  width: 8px;
  height: 8px;
}

:deep(::-webkit-scrollbar-track) {
  background: transparent;
}

:deep(::-webkit-scrollbar-thumb) {
  background: var(--color-slate-200);
  border-radius: 4px;
}

:deep(::-webkit-scrollbar-thumb:hover) {
  background: var(--color-slate-300);
}
</style>
