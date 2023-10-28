import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Form from "../views/Forms.vue";
import Home_Page from '../views/home.vue'
import Itinerary_Page from '../views/itinerary.vue'
import Dashboard from "../views/Dashboard.vue";

const routes = [
  
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/form",
    name: "Forms",
    component: Form,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: '/itinerary',
    name: 'Itinerary_Page',
    component: Itinerary_Page
  },
  {
    path: '/',
    name: 'Home_Page',
    component: Home_Page
  },
  {
    path: '/assets',
    name: 'Assets',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router;