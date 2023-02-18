import { createRouter, createWebHistory } from 'vue-router';

import { v4 as uuid } from 'uuid';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: () => import('../views/HomeView.vue')
      redirect: `/${uuid()}`
    },
    {
      path: '/:id',
      name: 'app',
      component: () => import('../views/HomeView.vue')
    }
  ]
});

export default router;
