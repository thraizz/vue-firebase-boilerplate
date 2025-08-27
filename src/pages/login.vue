<script setup lang="ts">
import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { useField, useForm } from 'vee-validate';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

import { useCurrentUser, useFirebaseAuth } from 'vuefire';
import { string } from 'yup';

import GoogleSSO from '@/components/GoogleSSO.vue';
import Button from '@/components/ui/button.vue';
import CardContent from '@/components/ui/card-content.vue';
import CardHeader from '@/components/ui/card-header.vue';
import CardTitle from '@/components/ui/card-title.vue';
import Card from '@/components/ui/card.vue';
import Input from '@/components/ui/input.vue';
import Label from '@/components/ui/label.vue';

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
    email: string().required()
      .email(),
    password: string().required()
      .min(6),
  },
  initialValues: {
    email: '',
    password: '',
  },
});

const onSubmit = handleSubmit(
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
  (errors: any) => {
    console.error(errors);
  },
);

const { value: email, errorMessage: emailError } = useField<string>('email');
const { value: password, errorMessage: passwordError } = useField<string>('password');

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
  <div class="flex items-center justify-center p-4">
    <Card class="w-full max-w-md">
      <CardHeader class="text-center">
        <CardTitle class="text-2xl">
          Sign in
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-6">
        <form class="space-y-4" @submit="onSubmit">
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
            />
            <p v-if="emailError" class="text-sm text-destructive">
              {{ emailError }}
            </p>
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <Label for="password">Password</Label>
              <a href="#" class="text-sm text-muted-foreground hover:text-primary">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              v-model="password"
              type="password"
              placeholder="Enter your password"
              required
            />
            <p v-if="passwordError" class="text-sm text-destructive">
              {{ passwordError }}
            </p>
          </div>

          <div class="space-y-3">
            <Button type="submit" class="w-full">
              Sign in
            </Button>
            <Button variant="outline" class="w-full" @click="$router.push('/register')">
              Create account
            </Button>
          </div>
        </form>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t" />
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <div class="flex justify-center">
          <GoogleSSO />
        </div>
      </CardContent>
    </Card>
  </div>
</template>
