<script setup lang="ts">
import { withDefaults } from 'vue';
import { useCurrentUser } from 'vuefire';

// Props for customization
interface Props {
  appName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  appName: 'App',
});

const currentUser = useCurrentUser();
</script>

<template>
  <div class="min-h-screen bg-background">
    <header class="border-b">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <router-link to="/" class="text-xl font-semibold">
            {{ props.appName }}
          </router-link>

          <div v-if="currentUser" class="text-sm text-muted-foreground">
            Welcome, {{ currentUser.email }}
          </div>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RouterView v-slot="{ Component }">
        <transition
          name="page"
          mode="out-in"
          appear
        >
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
