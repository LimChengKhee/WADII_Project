import { createRouter, createWebHistory } from 'vue-router'
import ExampleComponent from '../components/ExampleComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'example',
      component: ExampleComponent
    },

  ]
})

export default router
