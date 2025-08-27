<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

interface Props {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
});

const buttonClass = computed(() => {
  return cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    {
      'bg-primary text-primary-foreground shadow hover:bg-primary/90': props.variant === 'default',
      'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90': props.variant === 'destructive',
      'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground': props.variant === 'outline',
      'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80': props.variant === 'secondary',
      'hover:bg-accent hover:text-accent-foreground': props.variant === 'ghost',
      'text-primary underline-offset-4 hover:underline': props.variant === 'link',
    },
    {
      'h-9 px-4 py-2': props.size === 'default',
      'h-8 rounded-md px-3 text-xs': props.size === 'sm',
      'h-10 rounded-md px-8': props.size === 'lg',
      'h-9 w-9': props.size === 'icon',
    },
  );
});
</script>

<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>
