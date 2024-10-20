import { createRouter, createWebHistory } from "vue-router";
import JobAdvertisements from "./components/JobAdvertisements.vue";
import Login from "./components/login.vue";
import Signup from "./components/signup.vue";
import Admin from "./components/admin.vue";

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

const routes = [
  { path: "/", redirect: "/jobs" },
  { path: "/login", component: Login },
  { path: "/jobs", component: JobAdvertisements },
  { path: "/signup", component: Signup },
  { path: "/admin", component: Admin },
];

function authenticate(to, from, next) {
  if (isAuthenticated()) {
  } else {
    next({ path: "/login" });
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;