import { createRouter, createWebHistory } from 'vue-router';
import JobAdvertisements from './components/JobAdvertisements.vue';
import Login from './components/login.vue';
import signup from './components/signup.vue';

const routes = [
  { path: '/', redirect: '/jobs' },
  { path: '/login', component: Login },
  { path: '/jobs', component: JobAdvertisements },
  { path: '/signup', component: signup },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;