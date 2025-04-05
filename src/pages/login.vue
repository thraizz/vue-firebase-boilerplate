<script setup lang="ts">
import GoogleSSO from '@/components/GoogleSSO.vue';
import { logInWithFirebase, useUser } from '@/user';
import { useField, useForm } from 'vee-validate';
import { watch } from 'vue';

import { useRouter } from 'vue-router';
import { string } from 'yup';

const router = useRouter();
// @ts-expect-error - definePage is not defined in the current context
definePage({
  name: 'Login',
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
  (values: FormData) => {
    // handle form submission here
    logInWithFirebase(values.email, values.password)
      .then(() => {
        resetForm();
        router.push('/');
      })
      .catch(() => {
        setErrors({
          email: 'Invalid email or password.',
          password: 'Invalid email or password.',
        });
      });
  },
  // Failure
  (errors: any) => {
    console.error(errors);
  },
);

const { value: email, errorMessage: emailError } = useField('email');
const { value: password, errorMessage: passwordError } = useField('password');

const { isLoggedIn } = useUser();

watch(
  () => isLoggedIn,
  (isLoggedIn) => {
    if (isLoggedIn) {
      router.push('/');
    }
  },
);
</script>

<template>
  <div
    class="lg:px-8 min-h-full flex flex-1 flex-col justify-center px-6 py-12"
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
                class="text-indigo-600 font-semibold hover:text-indigo-500"
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
          <button type="submit" class="button primary w-full">
            Sign in
          </button>

          <router-link to="/register" class="button outlined w-full">
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
