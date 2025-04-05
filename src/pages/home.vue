<script setup lang="ts">
// @ts-expect-error - definePage is not defined in the current context
definePage({
  name: 'Home',
});
</script>

<template>
  <div class="m-4 flex flex-col gap-6 *:w-full" />
</template>
