
import { createRouter, createWebHistory } from 'vue-router'
import Hotel from '../views/Hotel.vue'
import Home from '../views/Home.vue'
import Hotel_Page from '../views/Hotel_Page.vue'
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Form from "../views/Forms.vue";
import Itinerary_Page from '../views/Itinerary.vue'
import Dashboard from "../views/Dashboard.vue";

import { useAuthStore } from "../store/piniaStore/authStore";

const routes =  [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/hotel',
      name: 'Hotel',
      component: Hotel
    },
    {
      path: '/hotel/:username/:itinerary_name',
      name: 'Hotelurl',
      component: Hotel
    },
    {
      path: '/hotel/:name',
      name: 'Specific',
      component: Hotel_Page
    },
    {
      path: '/url/:name-of-booked-hotel',
      name: 'Your-Component',
      component: 'Component'
    },
    {
      path: '/assets',
      name: 'Assets',
    },
    
//     {
//     path: "/",
//     name: "home",
//     component: Home_Page,
//   },
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