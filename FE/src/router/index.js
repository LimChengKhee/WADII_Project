import { createRouter, createWebHistory } from 'vue-router'
import Home_Page from '../views/home.vue'
import Itinerary_Page from '../views/itinerary.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home_Page',
      component: Home_Page
    },
    {
      path: '/itinerary',
      name: 'Itinerary_Page',
      component: Itinerary_Page
    }
  ]
})

export default router
