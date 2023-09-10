<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style>
  @import '..\FE\src\assets\login.css';
</style>