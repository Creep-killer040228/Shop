import { createRouter, createWebHistory } from "vue-router";
import Homes from '@/views/homes/Homes.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Homes',
      component: Homes
    },
    {
      path: '/categories',
      name: 'Categories',
      component: () => import('@/views/categories/Categories.vue'),
    },
    {
      path: '/categories/:productId',
      name: 'CardDinamik',
      component: () => import('@/views/categories/CardDinamik.vue')
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import('@/views/error/Errors.vue')
    },
  ],
});
