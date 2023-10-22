import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/base.css';
import './assets/main.css';
import { createApp,markRaw  } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const store = createStore({
    state () {
        return{
            hotelsInCities: {}
        }
    },
    mutations:{
        settingHotels(state, payload){
            state.hotelsInCities = payload;
        }
    }
  })

import axios from 'axios'
axios.defaults.baseURL = "http://127.0.0.1:8000"
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// import VueGoogleMaps from '../node_modules/@fawmi/vue-google-maps'
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import "../node_modules/bootstrap"

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';// const pinia = createPinia() 
// const app = createApp(App)

app
// app.use(router,axios,pinia);

// app.mount('#app');

const pinia = createPinia().use(({ store }) => {
    store.$router = markRaw(router)
  });
  pinia.use(piniaPluginPersistedstate)
createApp(App).use(pinia).use(store).use(router).mount('#app')