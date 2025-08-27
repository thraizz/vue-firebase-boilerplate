<script setup lang="ts">
import { deleteUser } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCurrentUser, useFirebaseAuth } from 'vuefire';
import { functions } from '@/firebase';

definePage({
  name: 'Settings',
  meta: {
    requiresAuth: true,
  },
});

const router = useRouter();
const currentUser = useCurrentUser();
const auth = useFirebaseAuth();

const error = ref('');
const isDeleting = ref(false);
const showConfirmation = ref(false);

async function deleteAccount() {
  if (!currentUser.value || !auth) return;

  isDeleting.value = true;
  error.value = '';

  try {
    // Trigger the deletion cloud function
    const deleteUserDataFn = httpsCallable(functions, 'deleteUserData');
    await deleteUserDataFn({ uid: currentUser.value.uid });

    // Delete the user account
    await deleteUser(currentUser.value);

    await auth.signOut();

    router.push('/login');
  }
  catch (e: any) {
    error.value = 'Failed to delete account. Please try again later.';
    console.error('Delete account error:', e);
  }
  finally {
    isDeleting.value = false;
    showConfirmation.value = false;
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">
      Account Settings
    </h1>

    <div class="bg-white rounded-lg shadow p-6 space-y-6">
      <div class="space-y-2">
        <h2 class="text-xl font-semibold text-gray-900">
          Your Account
        </h2>
        <p class="text-gray-600">
          Email: {{ currentUser?.email }}
        </p>
      </div>

      <div class="border-t border-gray-200 pt-6">
        <h3 class="text-lg font-medium text-red-600 mb-4">
          Danger Zone
        </h3>

        <div v-if="!showConfirmation">
          <button
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
            @click="showConfirmation = true"
          >
            Delete Account
          </button>
          <p class="mt-2 text-sm text-gray-500">
            This action cannot be undone. All your data will be permanently deleted.
          </p>
        </div>

        <div v-else class="space-y-4">
          <p class="text-sm text-gray-700">
            Are you absolutely sure you want to delete your account? This action cannot be undone.
          </p>

          <div v-if="error" class="text-sm text-red-600 mb-3">
            {{ error }}
          </div>

          <div class="flex space-x-3">
            <button
              class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
              :disabled="isDeleting"
              @click="deleteAccount"
            >
              {{ isDeleting ? 'Deleting...' : 'Yes, Delete My Account' }}
            </button>
            <button
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
              :disabled="isDeleting"
              @click="showConfirmation = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
