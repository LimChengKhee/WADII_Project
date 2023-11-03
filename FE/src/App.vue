<template>
  <div id="app" class="w-100 px-0" style="overflow-x:hidden !important;">
    <div class="row px-0 mb-5">
      <div class="row" style="height:40px;">

      </div>
      <Navbar class="px-0 mb-5" style="z-index: 1000;position:fixed"/>
    </div>
    <!-- Content -->
    <!-- <div class="col-lg-10 offset-lg-2 col-12 px-0"> -->
    <router-view/>
    <!-- </div> -->
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
  width: 100%;
}
*{
  font-family: montserrat;
  font-weight: bolder;
}



@font-face {
  font-family: 'montserrat';
  src: url("./assets/fonts/montserrat.bold.ttf") format("truetype");

}
</style>