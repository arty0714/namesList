import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { store } from '../store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signIn',
      name: 'login',
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/signUp',
      component: () => import('@/views/SignupView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuth = store.getters['user/isAuth'];
  
  if ((to.name === 'home') && !isAuth) next({ name: 'login' });
  else next();
})

export default router
