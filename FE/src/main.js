import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
<<<<<<< Updated upstream
=======
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap"
>>>>>>> Stashed changes

const app = createApp(App)

app.use(router)

app.mount('#app')
