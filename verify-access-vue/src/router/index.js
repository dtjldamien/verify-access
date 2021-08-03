import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import EntryForm from "../views/EntryForm.vue";
import CurrentVisitors from "../views/CurrentVisitors.vue";
import VisitorHistory from "../views/VisitorHistory.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/entry-form",
    name: "EntryForm",
    props: true,
    component: EntryForm,
  },
  {
    path: "/current-visitors",
    name: "CurrentVisitors",
    component: CurrentVisitors,
  },
  {
    path: "/visitor-history",
    name: "VisitorHistory",
    component: VisitorHistory,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
