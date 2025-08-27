<script setup lang="ts">
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useField, useForm } from 'vee-validate';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

import { useCurrentUser, useFirebaseAuth } from 'vuefire';
import { ref, string } from 'yup';

import Button from '@/components/ui/button.vue';
import CardContent from '@/components/ui/card-content.vue';
import CardHeader from '@/components/ui/card-header.vue';
import CardTitle from '@/components/ui/card-title.vue';
import Card from '@/components/ui/card.vue';
import Input from '@/components/ui/input.vue';
import Label from '@/components/ui/label.vue';

definePage({
  name: 'Register',
  meta: {
    requiresAuth: false,
  },
});

const auth = useFirebaseAuth()!;
const router = useRouter();

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const { handleSubmit, resetForm, setErrors } = useForm<FormData>({
  validationSchema: {
    email: string().required()
      .email(),
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

const onSubmit = handleSubmit(
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
  (errors: any) => {
    console.error(errors);
  },
);

const { value: email, errorMessage: emailError } = useField<string>('email');
const { value: password, errorMessage: passwordError } = useField<string>('password');
const { value: confirmPassword, errorMessage: confirmPasswordError } = useField<string>('confirmPassword');

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
  <div min-h-screen class="flex items-center justify-center p-4">
    <Card class="w-full max-w-md">
      <CardHeader class="text-center">
        <CardTitle class="text-2xl">
          Create account
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
            <Label for="password">Password</Label>
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

          <div class="space-y-2">
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              required
            />
            <p v-if="confirmPasswordError" class="text-sm text-destructive">
              {{ confirmPasswordError }}
            </p>
          </div>

          <div class="space-y-3">
            <Button type="submit" class="w-full">
              Create account
            </Button>
            <Button variant="outline" class="w-full" @click="$router.push('/login')">
              Already have an account?
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
