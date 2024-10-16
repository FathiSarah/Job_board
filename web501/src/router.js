import { createRouter, createWebHistory } from 'vue-router';
import JobAdvertisements from './components/JobAdvertisements.vue';
import Login from './components/login.vue'; // Ensure the casing is correct
import AdminPanel from './components/AdminPanel.vue';

const routes = [
  { path: '/', redirect: '/jobs' },
  { path: '/login', component: Login },
  { path: '/jobs', component: JobAdvertisements },
  { path: '/admin', component: AdminPanel },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
