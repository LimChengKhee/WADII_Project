import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Form from "../views/Forms.vue";
import Home_Page from '../views/Home.vue'
import Itinerary_Page from '../views/itinerary.vue'
import Dashboard from "../views/Dashboard.vue";
import Flight from "../views/Flight.vue"

const routes = [
  
  {
    path: "/",
    name: "Home",
    // redirect: { path: "/login" },
    meta: { refresh: true },
    component: Home_Page,
  },
  {
    path: "/login",
    name: "login",
    meta: { refresh: true },
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
    path: '/flight',
    name: 'Flight',
    component: Flight
  },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router;