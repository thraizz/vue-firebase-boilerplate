import { auth } from '@/firebase.ts';
import { useUser } from '@/user.ts';
import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';

export const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
});

const protectedRoutes: string[] = [];
router.beforeEach((to, from, next) => {
  auth.authStateReady().then(() => {
    const { isLoggedIn } = useUser();
    if (
      (to.meta.requiresAuth || protectedRoutes.includes(to.path))
      && !isLoggedIn
    ) {
      next('/login');
    }
    else {
      next();
    }
  });
});

export default router;
