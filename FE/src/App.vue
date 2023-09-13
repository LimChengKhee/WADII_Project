<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <!-- Navbar takes up the entire width -->
        <div class="col-12">
          <Navbar/>
        </div>
      </div>
      <div class="row">
        <!-- Router view takes up the first 3 out of 12 columns -->
        <div class="col-12">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>


<script>

import Navbar from "./components/Navbar.vue";
import Login from "./views/Login.vue";
import SignUp from "./views/SignUp.vue";

export default {
  name: "App",
  components:{
    Navbar, /* by indicating this in here, i'm able to make us of the <navbar/> tag as a module*/
    Login,
    SignUp,
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap");



html, body {
  height: 100%;

}
body{
  font-family:"Roboto", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

</style>