<script setup lang="ts">
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useField, useForm } from 'vee-validate';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

import { useCurrentUser, useFirebaseAuth } from 'vuefire';
import { ref, string } from 'yup';

definePage({
  name: 'Register',
  meta: {
    requiresAuth: false,
  },
});

const auth = useFirebaseAuth()!;

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}
const { handleSubmit, resetForm, setErrors } = useForm<FormData>({
  validationSchema: {
    email: string().required().email(),
    password: string()
      .required()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(/[^A-Z0-9]/i, 'Password must contain at least one special character'),
    confirmPassword: string()
      .required()
      .oneOf([ref('password')], 'Passwords must match'),
  },
  initialValues: {
    email: '',
    password: '',
    confirmPassword: '',
  },
});

const router = useRouter();
const onSubmit = handleSubmit(
  // Success
  async (values: FormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      await sendEmailVerification(userCredential.user, {
        url: `${window.location.origin}/login?email=${encodeURIComponent(values.email)}`,
      });
      resetForm();
      router.push('/verify-email');
    }
    catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setErrors({
          email: 'This email is already registered.',
        });
      }
      else {
        setErrors({
          email: 'Registration failed. Please try again.',
          password: 'Registration failed. Please try again.',
        });
      }
    }
  },
  // Failure
  (errors: any) => {
    console.error(errors);
  },
);

const { value: email, errorMessage: emailError } = useField<string>('email');
const { value: password, errorMessage: passwordError }
  = useField<string>('password');
const { value: confirmPassword, errorMessage: confirmPasswordError }
  = useField('confirmPassword');

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
        Create an account
      </h2>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-sm mt-10">
      <form class="space-y-6" @submit="onSubmit">
        <div>
          <label
            for="email"
            class="block text-sm text-gray-900 font-medium leading-6"
          >Email address</label>

          <div class="mt-2">
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="input"
            >
          </div>

          <p v-if="emailError" class="error">
            {{ emailError }}
          </p>
        </div>

        <div>
          <label
            for="password"
            class="block text-sm text-gray-900 font-medium leading-6"
          >Password</label>

          <div class="mt-2">
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="input"
            >
          </div>

          <p v-if="passwordError" class="error">
            {{ passwordError }}
          </p>
        </div>

        <div>
          <label
            for="confirmPassword"
            class="block text-sm text-gray-900 font-medium leading-6"
          >Confirm Password</label>

          <div class="mt-2">
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              name="confirmPassword"
              type="password"
              autocomplete="new-password"
              required
              class="input"
            >
          </div>

          <p v-if="confirmPasswordError" class="error">
            {{ confirmPasswordError }}
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <button type="submit" class="button primary w-full bg-gradient-to-r from-amber-600 to-red-600 text-white hover:from-amber-700 hover:to-red-700">
            Register
          </button>

          <router-link to="/login" class="button outlined w-full border-amber-600 text-amber-600 hover:bg-amber-50">
            Sign In
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
