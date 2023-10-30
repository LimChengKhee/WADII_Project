
import { createRouter, createWebHistory } from 'vue-router'
import Hotel from '../views/Hotel.vue'
import Home from '../views/Home.vue'
import Hotel_Page from '../views/Hotel_Page.vue'
import SideBar from '../components/SideBar.vue'
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Form from "../views/Forms.vue";
import Itinerary_Page from '../views/Itinerary.vue'
import Dashboard from "../views/Dashboard.vue";
import Flight from "../views/Flight.vue"

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
    name: "Login",
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
    path: '/itinerary/:username/:itinerary_name',
    name: 'Itinerary_Page',
    component: Itinerary_Page
  },
  // {
  //   path: '/itinerary',
  //   name: 'Itinerary_Page',
  //   component: Itinerary_Page
  // },
  {
    path: '/flight',
    name: 'Flight',
    component: Flight
  },
  {
    path: '/flight/:username/:itinerary_name',
    name: 'Flight_specific',
    component: Flight
  },
];


const router = createRouter({
  mode: 'history',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// router.beforeEach(async (to) => {
//   // clear alert on route change

//   // redirect to login page if not logged in and trying to access a restricted page 
//   const publicPages = ['/login', '/sign-up'];
//   const authRequired = !publicPages.includes(to.path);
//   const authStore = useAuthStore();
//   console.log(authRequired,!authStore.user,to.path)
//   if (authRequired && !authStore.user) {
//       authStore.returnUrl = to.fullPath;
//       return '/login';
//   }
// })

export default router;