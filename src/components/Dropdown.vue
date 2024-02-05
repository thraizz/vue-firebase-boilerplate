<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { PhCaretDown, PhCheck } from "@phosphor-icons/vue";

defineProps<{
  options: string[];
  disabled?: boolean;
  label: string;
  placeholder?: string;
}>();

const selectedOption = defineModel<string>();

const calculateLinkItemStyle = (active: boolean, selected: boolean) => {
  if (active) {
    return "bg-gray-700 text-white";
  } else if (selected) {
    return "bg-slate-50";
  }

  return "text-gray-900";
};
</script>

<template>
  <Listbox
    v-slot="{ open }"
    v-model="selectedOption"
    as="div"
    :disabled="disabled"
  >
    <ListboxLabel
      class="text-base font-semibold leading-normal"
      :class="disabled ? 'text-text-200' : 'text-zinc-800'"
    >
      {{ label }}
    </ListboxLabel>

    <div class="relative mt-2">
      <ListboxButton
        class="flex w-full items-center justify-start gap-2 self-stretch border border-gray-400 bg-white px-3 py-2"
        :class="disabled && 'bg-text-50 text-text-300'"
      >
        <span v-if="selectedOption"> {{ selectedOption }} </span>

        <span v-else class="text-text-500 font-normal">{{ placeholder }}</span>

        <div
          class="absolute inset-y-0 right-0 flex items-center px-2 transition-transform"
          :class="open && 'rotate-180'"
        >
          <PhCaretDown class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </ListboxButton>

      <Transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md bg-white p-4 pr-3 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-for="option in options"
            v-slot="{ active: optionIsActive, selected: optionIsSelected }"
            :key="option"
            as="template"
            :value="option"
          >
            <li
              class="flex cursor-default select-none flex-row items-center rounded-md py-2 pl-3 pr-9"
              :class="calculateLinkItemStyle(optionIsActive, optionIsSelected)"
            >
              <span
                class="relative mr-2 flex h-4 w-4 items-center rounded border"
                :class="
                  optionIsSelected
                    ? 'border-transparent bg-indigo-500'
                    : 'border-gray-400 bg-white'
                "
              >
                <PhCheck
                  v-if="optionIsSelected"
                  class="text-white"
                  aria-hidden="true"
                />
              </span>

              <span
                :class="['block truncate', optionIsSelected && 'font-semibold']"
              >
                {{ option }}
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </Transition>
    </div>
  </Listbox>
</template>
