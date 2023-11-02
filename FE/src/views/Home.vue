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
          <button class="btn btn-primary w-100" @click="createitinerary">Create new Trip</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 px-0 mt-5 d-flex justify-content-center">
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" style="width: 100%;">
          <div class="carousel-inner">
            <div v-for="(iti, index) in Math.ceil(itinerarys.length / 3)" :key="index"
              :class="['carousel-item', index === 0 ? 'active' : '']">
              <div class="row justify-content-center">
                <div v-for="subIndex in 3" :key="subIndex" class="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
                  
                  <div v-if="(iti - 1) * 3 + (subIndex - 1) < itinerarys.length" class="m-3">
                    <div class="card homecard" style="width: 18rem;">
                      <h5 class="card-title">{{ itinerarys[(iti - 1) * 3 + (subIndex - 1)].itinerary_data.itinerary_data.destination.trip_country }}</h5>
                      <img class="card-img-top" src="../assets/img/japan.jpg" alt="..."
                        @click="routeItineraryPage(itinerarys[(iti - 1) * 3 + (subIndex - 1)].itinerary_name)">
                      <div class="card-body">
                        <button class="btn deleteBtn"
                          @click="deleteItinerary(itinerarys[(iti - 1) * 3 + (subIndex - 1)].itinerary_name)">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Carousel controls moved outside the carousel-inner -->
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
          data-bs-slide="next">
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
    },
    getNumberOfCardsPerSlide() {
      if (window.innerWidth < 576) {
        return 1; // Show 1 card per slide when the screen is smallest
      } else {
        return 3; // Show 3 cards per slide for larger screens
      }
    },
  }
};

</script>

<style >
body {
  margin: 0;
  padding: 0;
  position: relative;
  background: url("../img/nature.jpg") no-repeat center center fixed;
  background-size: cover;
  /* Ensures the background covers the entire container */
  overflow-x: hidden;
  /* Prevent horizontal scrolling */
}


/* Ensure the content is above the overlay */
/* .row {
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 1;
  
} */

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



/* Add the following CSS to ensure responsiveness and prevent overlapping */
.row {
  margin: 0;
  padding: 0;
}

.col-sm-4 {
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
}

.deleteBtn {
  display: inline-block;
  padding: 1em 3.5em;
  background-color: #333 !important;
  color: white !important;
  text-decoration: none;
  text-transform: uppercase;
  border-radius: 0.3em;
  font-weight: 700;
  letter-spacing: .5px;
  font-size: .875rem;
}

.homecard {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  /* Adding shadow to the cards */
  transition: transform 0.3s;
  margin-bottom: 20px;
  /* background: url(https://i.ibb.co/M9LB3Kq/Glassmorphism-Background.png); */
  background-size: cover;
  padding: 2rem;
  /* width:310px; */
  /* height:640px; */
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(16.5px);

  /* Adjust margin as needed */
}

.card:hover {
  transform: translateY(-10px);
}

.card-img-top {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  height: 200px;
  /* Adjust height as needed */
  object-fit: cover;
  /* Ensure the image covers the entire container */
}

.card-body {
  flex: 1 0 auto;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  width: 30px;
  height: 30px;
  background-size: 100%, 100%;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  width: 30px;
  height: 30px;
  background-size: 100%, 100%;
  border-radius: 0;
  /* Remove the border radius */
  background-color: rgba(0, 0, 0, 0.5);
}

.carousel-control-prev-icon:after,
.carousel-control-next-icon:after {
  color: white;
  font-size: 20px;
}

.carousel-control-prev,
.carousel-control-next {
  width: 3%;
  /* Adjust the width as needed */
  color: white;
}


.carousel-control-prev {
  left: -5%;
  z-index: 1;
}

.carousel-control-next {
  right: -5%;
  z-index: 1;
}
</style>