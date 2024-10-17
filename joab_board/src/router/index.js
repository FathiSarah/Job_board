import { createRouter, createWebHistory } from 'vue-router'; // Ensure this line is correct
import JobDetail from '@/components/JobDetail.vue';
import JobList from '@/components/JobList.vue';
import LoginPage from '@/components/LoginPage.vue';


const routes = [
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
  {
    path: '/jobs',
    name: 'JobList',
    component: JobList,
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
