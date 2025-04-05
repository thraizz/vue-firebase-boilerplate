<script setup lang="ts">
const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
];
</script>

<template>
  <nav class="items-center space-x-1">
    <router-link
      v-for="item in navigationItems"
      :key="item.path"
      :to="item.path"
      class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-colors duration-200"
    >
      {{ item.name }}
    </router-link>
  </nav>
</template>
