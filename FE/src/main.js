import './assets/main.css'

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

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
