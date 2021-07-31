import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/entry-form",
    name: "EntryForm",
    component: () => import("../views/EntryForm.vue"),
  },
  {
    path: "/current-visitors",
    name: "CurrentVisitors",
    component: () => import("../views/CurrentVisitors.vue"),
  },
  {
    path: "/visitor-history",
    name: "VisitorHistory",
    component: () => import("../views/VisitorHistory.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
