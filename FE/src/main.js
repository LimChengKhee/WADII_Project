import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/base.css';
import './assets/main.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
axios.defaults.baseURL = "http://127.0.0.1:8000"
import { createPinia } from 'pinia'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// import VueGoogleMaps from '../node_modules/@fawmi/vue-google-maps'
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import "../node_modules/bootstrap"

// const pinia = createPinia() 
// const app = createApp(App)
// app.use(router,axios,pinia);

// app.mount('#app');

createApp(App).use(createPinia()).use(router).mount('#app')