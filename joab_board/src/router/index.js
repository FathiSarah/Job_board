import { createRouter, createWebHistory } from 'vue-router'; // Ensure this line is correct
import Home from '@/components/Home.vue';
import LoginPage from '@/components/LoginPage.vue'; // Update to match your new filename
import JobDetail from '@/components/JobDetail.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Home,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/job/:id',
    name: 'JobDetail',
    component: JobDetail,
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
