<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

interface Props {
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const cardTitleClass = computed(() => cn('font-semibold leading-none tracking-tight', props.class));
</script>

<template>
  <h3 :class="cardTitleClass">
    <slot />
  </h3>
</template>
