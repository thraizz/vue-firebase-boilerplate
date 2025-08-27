<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

interface Props {
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const cardContentClass = computed(() => cn('p-6 pt-0', props.class));
</script>

<template>
  <div :class="cardContentClass">
    <slot />
  </div>
</template>
