<script setup lang="ts">
import { signOut, userNavigation, useUser } from '@/user';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

import { BellIcon, UserCircleIcon } from '@heroicons/vue/20/solid';

const userStore = useUser();
</script>

<template>
  <div v-if="userStore.isLoggedIn" class="lg:ml-4 lg:block hidden">
    <div class="flex items-center">
      <button
        type="button"
        class="relative flex-shrink-0 rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-indigo-600"
      >
        <span class="absolute -inset-1.5" />

        <span class="sr-only">View notifications</span>

        <BellIcon class="h-6 w-6" aria-hidden="true" />
      </button>

      <!-- Profile dropdown -->
      <Menu as="div" class="relative ml-3 flex-shrink-0">
        <div>
          <MenuButton
            class="relative flex rounded-full bg-indigo-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-indigo-600"
          >
            <span class="absolute -inset-1.5" />

            <span class="sr-only">Open user menu</span>

            <img
              v-if="userStore.user?.photoURL && userStore.user.photoURL !== ''"
              class="h-8 w-8 rounded-full"
              :src="userStore.user.photoURL"
              alt=""
            >

            <UserCircleIcon
              v-else
              class="h-8 w-8 rounded-full"
              aria-hidden="true"
            />
          </MenuButton>
        </div>

        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <MenuItem
              v-for="item in userNavigation"
              :key="item.name"
              v-slot="{ active }"
            >
              <a
                :href="item.href"
                class="block px-4 py-2 text-sm text-gray-700" :class="[
                  active ? 'bg-gray-100' : '',
                ]"
              >{{ item.name }}</a>
            </MenuItem>

            <MenuItem v-slot="{ active }">
              <button
                type="button"
                class="block w-full px-4 py-2 text-left text-sm text-gray-700"
                :class="[
                  active ? 'bg-gray-100' : '',
                ]"
                @click="signOut"
              >
                Sign out
              </button>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>

  <div v-else>
    <router-link
      to="/login"
      class="whitespace-nowrap text-base text-white font-medium hover:text-indigo-50"
    >
      Sign in
    </router-link>
  </div>
</template>
