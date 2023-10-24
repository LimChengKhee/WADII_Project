<template>
  <div id="app" class="no-scroll">
    <div class="container-fluid">
      <!-- Navbar takes up the entire width -->
      <div class="row">
        <div class="px-0">
          <Navbar/>
        </div>
      </div>
      <div class="row">
        <!-- Content -->
        <div class="px-0">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import Navbar from "./components/Navbar.vue";
import Login from "./views/Login.vue";
import Itinerary from "./views/Itinerary.vue";

// import Dashboard from "./views/dashboard.vue";
import axios from 'axios';
// var VueRouter = require('vue-router')
// Vue.use (VueRouter)
import { RouterLink, RouterView } from 'vue-router'

export default { 
  name: "App",
  /*Life cycle hook*/
  components:{
    Navbar,
    Login,
    // Dashboard,
  },
  methods:{

  }
};
</script>

<style>
  /* @import '../src/assets/login.css'; */
  
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap");

html, body {
  height: 100%;
}

body {
  font-family: "Roboto", sans-serif;
  width: 100%;
}

.no-scroll {
  overflow-y: hidden;
  height: 100%; /* Make sure the container fills the viewport height */
}
</style>