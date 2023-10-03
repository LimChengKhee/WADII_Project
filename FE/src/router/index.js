import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Form from "../views/Forms.vue";
import Home_Page from '../views/home.vue'
import Itinerary_Page from '../views/itinerary.vue'

const routes = [
  
  {
    path: "/",
    name: "home",
    component: Home_Page,
  },
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
    path: '/itinerary',
    name: 'Itinerary_Page',
    component: Itinerary_Page
  }
];




const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;