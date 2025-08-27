<script setup lang="ts">
import Button from '@/components/ui/button.vue';
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
    <h1 class="text-4xl font-bold">
      Welcome to your Vue 3 + Firebase App
    </h1>
    <p class="text-muted-foreground text-lg max-w-md text-center">
      This template is now configured with shadcn/vue components for a beautiful, modern UI.
    </p>

    <div class="flex gap-4">
      <Button>
        Get Started
      </Button>
      <Button variant="outline">
        Learn More
      </Button>
    </div>
  </div>
</template>
