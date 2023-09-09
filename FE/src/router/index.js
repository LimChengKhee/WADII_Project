import { createRouter, createWebHistory } from 'vue-router'
import Hotel_Flights from '../views/Hotel_Flights.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/hotel_flights',
      name: 'Hotel_Flights',
      component: Hotel_Flights
    },

  ]
})

export default router
