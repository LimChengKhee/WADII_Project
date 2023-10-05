import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import VueGoogleMaps from '../node_modules/@fawmi/vue-google-maps'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap"


const app = createApp(App)

// app.use(VueGoogleMaps, {
//     load:{
//         key: 'AIzaSyC27_uXwB2Wdx05nP3pezmdAH5svn1oqr4',
//         libraries: 'places',
//     },
// });
app.use(router)

app.mount('#app')
