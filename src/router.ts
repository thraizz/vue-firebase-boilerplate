import { createRouter, createWebHistory } from "vue-router";

import { auth } from "./firebase";
import { useUser } from "./user";
import HomeVue from "./views/Home.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      components: {
        default: HomeVue,
      },
      meta: {
        title: "Home",
      },
    },
    {
      path: "/login",
      component: () => import("./views/Login.vue"),
      meta: {
        title: "Login",
      },
    },
    {
      path: "/register",
      component: () => import("./views/Registration.vue"),
      meta: {
        title: "Registration",
      },
    },
  ],
});

const protectedRoutes: string[] = [];
router.beforeEach((to, from, next) => {
  auth.authStateReady().then(() => {
    const { isLoggedIn } = useUser();
    if (
      (to.meta.requiresAuth || protectedRoutes.includes(to.path)) &&
      !isLoggedIn
    ) {
      next("/login");
    } else {
      next();
    }
  });
});
