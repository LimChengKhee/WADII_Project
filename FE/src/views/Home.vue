<template>
  <div class="container">
    <div class="row mt-5 mb-5">
      <div class="col-lg-3 mt-5">
        <div class="text-start" style="color:white">
          <h1 class="entranceMsg">
            <div style="font-size:60px; color: orange; font-weight: 600;">Welcome {{ userid }},</div>
            <div style="font-size: 20px;">Ready to Travel?</div>
          </h1>
        </div>
        <div class="text-center mt-3">
          <button class="btn btn-primary" @click="createitinerary">Create new Trip</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 px-0 mt-5 d-flex justify-content-center">
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div v-for="(iti, index) in Math.ceil(itinerarys.length / 3)" :key="index" :class="['carousel-item', index === 0 ? 'active' : '']">
              <div class="row">
                <div v-for="subIndex in 3" :key="subIndex" class="col-md-4 col-lg-4">
                  <div v-if="(iti - 1) * 3 + (subIndex - 1) < itinerarys.length" class="m-3">
                    <div class="card" style="width: 18rem;">
                      <h5 class="card-title">{{ itinerarys[(iti - 1) * 3 + (subIndex - 1)].itinerary_data.itinerary_data.destination.trip_country }}</h5>
                      <img class="card-img-top" src="../assets/img/japan.jpg" alt="..." @click="routeItineraryPage(itinerarys[(iti - 1) * 3 + (subIndex - 1)].itinerary_name)">
                      <div class="card-body">                
                        <button class="btn btn-danger" @click="deleteItinerary(itinerarys[(iti - 1) * 3 + (subIndex - 1)].itinerary_name)">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Carousel controls moved outside the carousel-inner -->
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import statements
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
    ...mapStores(useUsersStore),
  },
  // start of lifecycle
  async mounted() {
    const authStore = useAuthStore();
    const userStore = useUsersStore();
    this.userid = authStore.user;
    this.token = authStore.token;
    // await
    this.itinerarys = await userStore.getItinerary(this.userid, this.token);
    console.log(this.itinerarys);
  },
  methods: {
    // methods defined by ourselves
    createitinerary() {
      this.$router.push('/form');
    },
    routeItineraryPage(iti_name) {
      this.$router.push({ path: `/itinerary/${this.userid}/${iti_name}` });
    },
    async deleteItinerary(iti_name) {
      const userStore = useUsersStore();
      var pass = await userStore.deleteUserItinerary(this.userid, iti_name);
      this.itinerarys = await userStore.getItinerary(this.userid, this.token);
    }
  }
};

</script> 

<style>
body {
  margin: 0;
  padding: 0;
  position: relative;
  background: url("../img/heroImg.jpg") no-repeat center center fixed;
  background-size: cover;
  /* Ensures the background covers the entire container */
  overflow-x: hidden;
  /* Prevent horizontal scrolling */
}

body::after {
  content: '';
  background: rgba(0, 0, 0, 0.5);
  /* Adjust the alpha value to control the darkness of the overlay */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  /* Place the overlay behind the content */
}

.row {
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 1;
  /* Ensure the content is above the overlay */
}


.entranceMsg {
  font-size: 2.5rem;
  /* Adjust font size according to your preference */
  color: white;
  /* Choose your preferred color */
  /* Make the text bold for emphasis */
  text-transform: uppercase;
  /* Convert text to uppercase for added impact */
  letter-spacing: 2px;
  /* Adjust the letter spacing for better readability */
  /* Add any other styles you want to make it more engaging */

}
*{
  font-family: Montserrat;
}
@font-face {
  font-family: 'Montserrat';
  src: url("../assets/fonts/montserrat.bold.ttf") format("truetype");

}


</style>
