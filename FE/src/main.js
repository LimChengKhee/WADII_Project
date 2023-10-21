import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/main.css';
// import { createPopper } from '@popperjs/core';
import { createApp } from 'vue'
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
// axios.defaults.baseURL = "http://127.0.0.1:8000"
// import VueGoogleMaps from '../node_modules/@fawmi/vue-google-maps'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap"

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const app = createApp(App)

app.use(store)

app.use(router,axios);

app.mount('#app');