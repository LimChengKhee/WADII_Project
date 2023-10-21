
import { createRouter, createWebHistory } from 'vue-router'
import Hotel from '../views/Hotel.vue'
import Home from '../views/Home.vue'
import Hotel_Page from '../views/Hotel_Page.vue'
import SideBar from '../components/SideBar.vue'
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Form from "../views/Forms.vue";
// import Home_Page from '../views/home.vue'
import Itinerary_Page from '../views/itinerary.vue'
import Dashboard from "../views/Dashboard.vue";

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
      path: '/hotel/:name',
      name: 'Specific',
      component: Hotel_Page
    },
    {
      path: '/hotel/sidebar',
      name: 'SideBar',
      component: SideBar
    },
    {
      path: '/url/:name-of-booked-hotel',
      name: 'Your-Component',
      component: 'Component'
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
  ]



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router;