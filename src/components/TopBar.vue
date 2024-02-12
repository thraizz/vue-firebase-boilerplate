<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { UserCircleIcon } from "@heroicons/vue/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";

import { signOut, userNavigation, useUser } from "@/user";

import UserMenu from "./UserMenu.vue";

const userStore = useUser();

const appNavigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Create Something",
    href: "/something/new",
  },
];
</script>

<template>
  <Disclosure
    v-slot="{ open }"
    as="nav"
    class="border-b border-indigo-300 border-opacity-25 bg-slate-900 lg:border-none"
  >
    <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
      <div
        class="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25"
      >
        <router-link
          to="/"
          class="flex items-center gap-2 px-2 text-lg font-semibold tracking-tight text-white hover:text-indigo-200 lg:px-0"
          >BOILERPLATE</router-link
        >

        <div class="flex flex-row items-center gap-4">
          <UserMenu />

          <div class="flex lg:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="relative inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
            >
              <span class="absolute -inset-0.5" />

              <span class="sr-only">Open main menu</span>

              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />

              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="lg:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <router-link
          v-for="item in appNavigation"
          :key="item.name"
          as="a"
          :to="item.href"
          class="navigation-item"
          >{{ item.name }}</router-link
        >
      </div>

      <div class="border-t border-indigo-700 pb-3 pt-4">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <img
              v-if="userStore.user?.photoURL && userStore.user.photoURL !== ''"
              class="h-8 w-8 rounded-full"
              :src="userStore.user.photoURL"
              alt=""
            />

            <UserCircleIcon
              v-else
              class="h-8 w-8 rounded-full"
              aria-hidden="true"
            />
          </div>

          <div class="ml-3">
            <div class="text-base font-medium text-white">
              {{ userStore.user?.displayName }}
            </div>

            <div class="text-sm font-medium text-indigo-300">
              {{ userStore.user?.email }}
            </div>
          </div>

          <button
            type="button"
            class="relative ml-auto flex-shrink-0 rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
          >
            <span class="absolute -inset-1.5" />

            <span class="sr-only">View notifications</span>

            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div class="mt-3 space-y-1 px-2">
          <DisclosureButton
            v-for="item in userNavigation"
            :key="item.name"
            as="a"
            :href="item.href"
            class="navigation-item light"
            >{{ item.name }}</DisclosureButton
          >

          <DisclosureButton
            class="navigation-item min-w-full text-left"
            @click="signOut"
            >Sign out</DisclosureButton
          >
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style lang="scss">
.navigation-item {
  @apply block rounded-md px-3 py-2 text-base text-white hover:bg-indigo-500 hover:bg-opacity-75;
}
.search-input {
  @apply block h-fit w-0 rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 focus:w-full focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:text-sm sm:leading-6 lg:w-full;

  transition-property: width, padding;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}
</style>
