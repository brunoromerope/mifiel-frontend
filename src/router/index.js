// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Guard from './auth-guard';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    beforeEnter: Guard,
  },
  {
    path: '/login',
    //component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Login.vue'),
      },
    ],
  },
  {
    path: '/register',
    //component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Register.vue'),
      },
    ],
  },
  {
    path: '/create',
    component: () => import('@/layouts/default/Default.vue'),
    beforeEnter: Guard,
    children: [
      {
        path: '',
        name: 'Create',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Create.vue'),
      },
    ],
  },
  {
    path: '/docs',
    component: () => import('@/layouts/default/Default.vue'),
    beforeEnter: Guard,
    children: [
      {
        path: '',
        name: 'Doctos',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Doctos.vue'),
      },
    ],
  },
  {
    path: '/sign/:id',
    component: () => import('@/layouts/default/Default.vue'),
    beforeEnter: Guard,
    children: [
      {
        path: '',
        name: 'Sign',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Sign.vue'),
        //component: () => import(/* webpackChunkName: "home" */ '@/views/Test.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router