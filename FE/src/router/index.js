import { createRouter, createWebHistory } from 'vue-router'
import Hotel from '../views/Hotel.vue'
import Home from '../views/Home.vue'
import Hotel_Page from '../views/Hotel_Page.vue'
import SideBar from '../components/SideBar.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    }
  ]
})

export default router
