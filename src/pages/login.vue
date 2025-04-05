<script setup lang="ts">
import GoogleSSO from '@/components/GoogleSSO.vue';
import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { useField, useForm } from 'vee-validate';
import { watch } from 'vue';

import { useRouter } from 'vue-router';
import { useCurrentUser, useFirebaseAuth } from 'vuefire';

import { string } from 'yup';

const auth = useFirebaseAuth()!;

const router = useRouter();

definePage({
  name: 'Login',
  meta: {
    requiresAuth: false,
  },
});
interface FormData {
  email: string;
  password: string;
}
const { handleSubmit, resetForm, setErrors } = useForm<FormData>({
  validationSchema: {
    email: string().required().email(),
    password: string().required().min(6),
  },
  initialValues: {
    email: '',
    password: '',
  },
});
const onSubmit = handleSubmit(
  // Success
  async (values: FormData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);

      if (!userCredential.user.emailVerified) {
        await sendEmailVerification(userCredential.user, {
          url: `${window.location.origin}/login?email=${encodeURIComponent(values.email)}`,
        });
        router.push('/verify-email');
        return;
      }

      resetForm();
      router.push('/');
    }
    catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        setErrors({
          email: 'Invalid email or password.',
          password: 'Invalid email or password.',
        });
      }
      else if (error.code === 'auth/too-many-requests') {
        setErrors({
          email: 'Too many login attempts. Please try again later.',
          password: 'Too many login attempts. Please try again later.',
        });
      }
      else {
        setErrors({
          email: 'Login failed. Please try again.',
          password: 'Login failed. Please try again.',
        });
      }
    }
  },
  // Failure
  (errors: any) => {
    console.error(errors);
  },
);

const { value: email, errorMessage: emailError } = useField('email');
const { value: password, errorMessage: passwordError } = useField('password');

const currentUser = useCurrentUser();

watch(
  () => currentUser,
  (currentUser) => {
    if (currentUser) {
      router.push('/');
    }
  },
);
</script>

<template>
  <div
    class="lg:px-8 min-h-full flex flex-1 flex-col justify-center px-6 py-12 bg-white rounded-lg shadow-md w-fit mx-auto"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl text-gray-900 font-bold leading-9 tracking-tight"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-sm mt-10">
      <form class="space-y-6" @submit="onSubmit">
        <div>
          <label
            for="email"
            class="block text-sm text-gray-900 font-medium leading-6"
          >Email address</label>

          <input
            id="email"
            v-model="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="input"
          >

          <p v-if="emailError" class="error">
            {{ emailError }}
          </p>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm text-gray-900 font-medium leading-6"
            >Password</label>

            <div class="text-sm">
              <a
                href="#"
                class="text-amber-600 font-semibold hover:text-red-600"
              >Forgot password?</a>
            </div>
          </div>

          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="input"
          >

          <p v-if="passwordError" class="error">
            {{ passwordError }}
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <button type="submit" class="button primary w-full bg-gradient-to-r from-amber-600 to-red-600 text-white hover:from-amber-700 hover:to-red-700">
            Sign in
          </button>

          <router-link to="/register" class="button outlined w-full border-amber-600 text-amber-600 hover:bg-amber-50">
            Register
          </router-link>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-300" />
          </div>

          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-neutral-800">Or</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <GoogleSSO />
        </div>
      </div>
    </div>
  </div>
</template>
