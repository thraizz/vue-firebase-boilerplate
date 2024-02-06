<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { watch } from "vue";
import { useRouter } from "vue-router";
import { string } from "yup";

import { logInWithFirebase, useUser } from "@/user";
const router = useRouter();

type FormData = {
  email: string;
  password: string;
};
const { handleSubmit, resetForm, setErrors } = useForm<FormData>({
  validationSchema: {
    email: string().required().email(),
    password: string().required().min(6),
  },
  initialValues: {
    email: "",
    password: "",
  },
});
const onSubmit = handleSubmit(
  // Success
  (values: FormData) => {
    // handle form submission here
    logInWithFirebase(values.email, values.password)
      .then(() => {
        resetForm();
        router.push("/");
      })
      .catch(() => {
        setErrors({
          email: "Invalid email or password.",
          password: "Invalid email or password.",
        });
      });
  },
  // Failure
  (errors) => {
    console.log(errors);
  },
);

const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");

const { isLoggedIn } = useUser();

watch(
  () => isLoggedIn,
  (isLoggedIn) => {
    if (isLoggedIn) {
      router.push("/");
    }
  },
);
</script>

<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit="onSubmit">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >

          <input
            id="email"
            v-model="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="input"
          />

          <p v-if="emailError" class="error">{{ emailError }}</p>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >

            <div class="text-sm">
              <a
                href="#"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Forgot password?</a
              >
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
          />

          <p v-if="passwordError" class="error">{{ passwordError }}</p>
        </div>

        <div class="flex flex-col gap-2">
          <button type="submit" class="button primary w-full">Sign in</button>

          <router-link to="/register" class="button outlined w-full">
            Register
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
