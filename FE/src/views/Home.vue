<template>
  <div>
    <!-- use the router-link component for navigation. -->
    <!-- specify the link by passing the `to` prop. -->
    <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
    <!-- <router-link to="/">Go to Home</router-link>
          <br>
          <router-link to="/itinerary">Go to Itinerary</router-link> -->

    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>
  </div>
  <div class="row mt-5">
    <div class="col text-start" style="color:white"><h1>Welcome {{ userid }}, ready to travel?</h1></div>
    <div class="col">
      <button class="btn btn-primary" @click="createitinerary">Create new Trip</button>
    </div>
    <br />
    <div class="row d-flex">


      <div v-for="iti in itinerarys" class="card m-2 p-2" style="width: 18rem;cursor: pointer;">
        <p class="card-text">{{ iti.itinerary_data.itinerary_data.destination.trip_country }}</p>
        <img src="../assets/img/japan.jpg" class="card-img-top" alt="..." @click="routeItineraryPage(iti.itinerary_name)">
        <div class="card-body">
          
          <button class="btn btn-danger" @click="deleteItinerary(iti.itinerary_name)">Delete</button>
        </div>
      </div>

      
    </div>

  </div>
</template>
<script>
//  import statements
// import example from '@/utils/string_formatter'
import axios from 'axios';

import { mapStores } from 'pinia';
import { useAuthStore } from '../store/piniaStore/authStore';
import { useUsersStore } from '../store/piniaStore/userStore';

export default {
  name: 'Home',
  components: {
    // importing components from other places

  },
  data() {
    // local repository of information
    return {
      itinerarys: [],
      userid: "",
      token: "",
      test: "",
    }
  },
  computed: {
    // computed
    ...mapStores(useAuthStore),
    ...mapStores(useUsersStore)

  },

  // start of lifecycle
  async mounted() {
    const authStore = useAuthStore();
    const userStore = useUsersStore();
    this.userid = authStore.user
    this.token = authStore.token
    // await 
    this.itinerarys = await userStore.getItinerary(this.userid, this.token);
    console.log(this.itinerarys)



  },

  methods: {
    // methods defined by ourselves

    createitinerary() {
      this.$router.push('/form')
    },
    routeItineraryPage(iti_name) {
      this.$router.push({ path: `/itinerary/${this.userid}/${iti_name}` })
    },
    async deleteItinerary(iti_name) {
      const userStore = useUsersStore();
      var pass = await userStore.deleteUserItinerary(this.userid, iti_name)
      this.itinerarys = await userStore.getItinerary(this.userid, this.token);
    }

  },
}
</script>

<style>
    body {
    margin: 0;
    padding: 0;
    position: relative;
    background: url("../img/heroImg.jpg") no-repeat center center fixed;
    overflow-x: hidden; /* Prevent horizontal scrolling */
    
  }

  body::after {
    content: '';
    background: rgba(0, 0, 0, 0.5); /* Adjust the alpha value to control the darkness of the overlay */
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1; /* Place the overlay behind the content */
  }

  .row {
    margin: 0;
    padding: 0;
    position: relative;
    z-index: 1; /* Ensure the content is above the overlay */
  }

  *{
    font-family: 'Roboto', sans-serif;
  }
</style>
