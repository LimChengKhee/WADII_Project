<template>
  
  <div class="row">
    <div class="col-3 p-0">
      <button @click="toggleSidebarVisibility">23</button>
      <div 
        class=" sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4"
        id="sidenav-main"
      >
        <div class="sidenav-header" @click="route_link('home')">
          <i
            class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
          ></i>
          <img
            src="../assets/img/EcoBound.png"
            class="navbar-brand-img"
            style="max-height: 78px !important"
            alt="main_logo"
          />
        </div>
        <hr class="horizontal dark mt-0" />
        <div class="collapse navbar-collapse w-auto" style="" id="sidenav-collapse-main">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" @click="route_link('itinerary')">
                <div
                  class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center"
                >
                  <i class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
                </div>
                <span class="nav-link-text ms-1">Itinerary</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="route_link('dashboard')">
                <div
                  class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center"
                >
                  <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
                </div>
                <span class="nav-link-text ms-1">Dashboard</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="route_link('flight')">
                <div
                  class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    class="bi bi-airplane"
                    viewBox="0 0 16 16"
                    style="color: red"
                  >
                    <path
                      d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Zm.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1c-.213 0-.458.158-.678.599Z"
                    />
                  </svg>
                </div>
                <span class="nav-link-text ms-1">Flights</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="route_link('hotel')">
                <div
                  class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    class="bi bi-building"
                    viewBox="0 0 16 16"
                    style="color: green"
                  >
                    <path
                      d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"
                    />
                    <path
                      d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z"
                    />
                  </svg>
                </div>
                <span class="nav-link-text ms-1">Hotels</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col p-0 mx-auto">
      <div class="container bg-white main_con my-5">
        <div class="col left-side-mobile">
          <div class="col">
            <div class="row pt-4">
              <div class="col text-center p-0">
                <p class="m-0">From</p>
                <input type="text" v-model="departure_c" class="w-50 input_c" />
                <!-- <p class="d-inline-block">testing </p> -->

                <!-- <img src="../assets/plane_up.png" alt="" style="width:80px;" class="z-n1"> -->
              </div>
              <div class="col-2 p-0">
                
                  <img
                    class=""
                    src="../assets/plane.svg"
                    style="width: 50px; height: 50px;"
                  />
                
              </div>

              <div class="col text-center p-0">
                <p class="m-0">To</p>
                <input type="text" v-model="destination_c" class="w-50 input_c" style="width:70% !important" />
                <!-- <p class="d-inline-block">testing </p> -->

                <!-- <img src="../assets/plane_up.png" style="transform: rotate(50deg); width:80px;" alt="" class="z-n1"> -->
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-3"></div>
              <div class="col-6">
                Date
                <br />

                <Datepicker
                  v-model="start_date"
                  placeholder="Departure Date/time"
                  :enable-time-picker="false"
                  :teleport="true"
                  :text-input="true"
                  :min-date="start_date"
                  :start-date="start_date"
                  @update:model-value="mountAllHotelInformation"
                  input-class-name="dp-custom-input py-2 rounded-3 dp-color"
                  focus-start-date
                />

                <div class="col-3"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="row p-3">
          <div class="col header px-0 left-side">
            <div class="row" style="height: 360px">
              <img src="../assets/plane_img.png" alt="" class="img-fluid" />
            </div>

            <div class="row">
              <div class="col">
                <div class="row info_row">
                  <div class="col text-center">One Way</div>
                  <div class="col text-center">One Stop</div>
                </div>

                <div class="row first_row mt-4">
                  <div class="col text-center">From</div>
                  <div class="col text-center">To</div>
                </div>

                <div class="row mt-4">
                  <div class="col text-center">
                    <input
                      type="text"
                      v-model="departure_c"
                      class="w-50 input_c"
                      style="margin-left: 60px"
                    />
                    <!-- <p class="d-inline-block">testing </p> -->

                    <!-- <img src="../assets/plane_up.png" alt="" style="width:80px;" class="z-n1"> -->
                  </div>
                  <div class="col-2">
                    <div>
                      <img
                        class=""
                        src="../assets/plane.svg"
                        style="width: 50px; height: 50px; text-decoration: underline"
                      />
                    </div>
                  </div>

                  <div class="col text-center">
                    <input type="text" v-model="destination_c" class="w-50 input_c me-2" />
                    <!-- <p class="d-inline-block">testing </p> -->

                    <!-- <img src="../assets/plane_up.png" style="transform: rotate(50deg); width:80px;" alt="" class="z-n1"> -->
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-3"></div>
                  <div class="col-6">
                    Date
                    <br />

                    <Datepicker
                      v-model="start_date"
                      placeholder="Departure Date/time"
                      :enable-time-picker="false"
                      :teleport="true"
                      :text-input="true"
                      :min-date="start_date"
                      :start-date="start_date"
                      @update:model-value="mountAllHotelInformation"
                      input-class-name="dp-custom-input rounded-3 dp-color"
                      focus-start-date
                    />

                    <div class="col-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col ms-3 scroll-big my-auto" v-if="mounted">
            <FlightCard
              v-for="flight in this.hotelsInCities"
              :flightNumberO="flight.legs[0].segments[0].flightNumber"
              :alternateIdO="flight.legs[0].segments[0].marketingCarrier.alternateId"
              :carrierNameO="flight.legs[0].carriers.marketing[0].name"
              :flightNumberD="flight.legs[1].segments[0].flightNumber"
              :alternateIdD="flight.legs[1].segments[0].marketingCarrier.alternateId"
              :carrierNameD="flight.legs[1].carriers.marketing[0].name"
              :departure="flight.legs[0].segments[0].departure"
              :originDisplayCode="flight.legs[0].segments[0].origin.displayCode"
              :originName="flight.legs[0].segments[0].origin.name"
              :originCity="flight.legs[0].origin.city"
              :duration="flight.legs[0].durationInMinutes"
              :arrival="flight.legs[0].arrival"
              :destinationDisplayCode="flight.legs[0].segments[0].destination.displayCode"
              :destinationCity="flight.legs[0].destination.name"
              :totalPrice="flight.price.formatted"
              :tag="flight.tags"
              :eco="flight.eco.ecoContenderDelta"
              :img="flight.legs[0].carriers.marketing[0].logoUrl"
              :eco_best="flight.eco.eco_best"
            ></FlightCard>
          </div>

          <!-- <div class="spinner_section d-flex flex-column" v-if="!mounted">
      <div
        class="spinner-border mt-5"
        style="margin: 0 auto; height: 200px; width: 200px"
        role="status"
      ></div>
      <p class="mt-2" style="text-align: center">Loading...Please give us a second</p>
    </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FlightCard from '../components/FlightCard.vue'
import axios from 'axios'
import flight from './flight.json'

import { mapStores } from 'pinia'
import { useAuthStore } from '../store/piniaStore/authStore'
import { useUsersStore } from '../store/piniaStore/userStore'
import { useItineraryStore } from '../store/piniaStore/itinerary'
import Datepicker from '@vuepic/vue-datepicker'
import capital from '../components/countries.json'

export default {
  name: 'Flight',
  components: {
    // importing components from other places
    FlightCard,
    Datepicker
  },
  data() {
    // local repository of information
    return {
      hotelsInCities: {},
      mounted: false,
      // false_data: flight
      false_data: [],
      user: '',
      iti_name: '',
      iti_data: '',
      start_date: '',
      end_date: '',
      flight_date: '',
      destination_c: '',
      isSidebarHidden:true
    }
  },
  computed: {
    // computed
    ...mapStores(useAuthStore),
    ...mapStores(useUsersStore),
    ...mapStores(useItineraryStore),
    
  },

  // start of lifecycle
  async mounted() {
    // await this.mountAllHotelInformation()
    const authStore = useAuthStore()
    const userStore = useUsersStore()
    const itineraryStore = useItineraryStore()
    this.user = this.$route.params.username
    this.iti_name = this.$route.params.itinerary_name

    var iti_data = await userStore.getUserItinerary(this.user, this.iti_name)
    this.iti_data = iti_data
    this.start_date = new Date(iti_data.itinerary_data.destination.start_date)
    var dc = iti_data.itinerary_data.destination.trip_country
    var dec = iti_data.itinerary_data.destination.departure_country
    console.log(dec)
    this.destination_c = dc
    this.departure_c = dec
    this.mountAllHotelInformation()
  },

  methods: {
    // methods defined by ourselves
    toggleSidebarVisibility() {
      
      const toggle = document.getElementsByClassName("sidenav")[0];
      var check = window.getComputedStyle(toggle).display;
      console.log(check)
      if (check == 'none'){
        toggle.style.display = 'block'
      }else{
        toggle.style.display = 'none'
      }
      

      },
    async mountAllHotelInformation() {
      // const authStore = useAuthStore()
      // const userStore = useUsersStore()
      // const itineraryStore = useItineraryStore()
      // this.user = this.$route.params.username
      // this.iti_name = this.$route.params.itinerary_name

      // var iti_data = await userStore.getUserItinerary(this.user, this.iti_name)
      // this.iti_data = iti_data
      // var dc = iti_data.itinerary_data.destination.trip_country
      // this.destination_c = dc

      var state = capital.filter(
        (c) => c['country'].toLowerCase() == this.destination_c.toLowerCase()
      )
      var destination_country = state[0]['city']
      //placeholder
      var data = flight
      this.hotelsInCities = await this.filterby(data, 'one')
      this.mounted = true
      return

      var start_date = iti_data.itinerary_data.destination.start_date
      var end_date = iti_data.itinerary_data.destination.end_date
      this.start_date = start_date
      this.end_date = end_date
      var date_range = itineraryStore.handleDate(this.flight_date)

      var date_list = date_range.split(',')

      var d_date = date_list[0]
      var a_date = date_list[1]

      var d_skyId = 'SINS'
      var d_entityId = '27546111'
      console.log(destination_country)
      const [a_skyId, a_entityId] = await this.getAPIcountry(destination_country)
      // var a_skyId = 'JP'
      // var a_entityId = '29475330'
      if (a_skyId == null || a_entityId == null) {
        this.hotelsInCities = []
        return
      }
      var people = '1'
      console.log(d_date, a_date)
      const options = {
        method: 'GET',
        url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights',
        params: {
          originSkyId: d_skyId,
          destinationSkyId: a_skyId,
          originEntityId: d_entityId,
          destinationEntityId: a_entityId,
          date: d_date,
          returnDate: a_date,
          adults: people,
          currency: 'SGD'
        },
        headers: {
          'X-RapidAPI-Key': '921e9474d9msh41e6dc80c2d8395p101f78jsne7dbbeab3134',
          'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
        }
      }
      console.log(options)
      try {
        const response = await axios.request(options)
        console.log(response.data)
        var data = response.data
        this.hotelsInCities = await this.filterby(data, 'one')
        this.mounted = true
      } catch (error) {
        console.error(error)
      }
    },

    async getAPIcountry(country) {
      const options = {
        method: 'GET',
        url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport',
        params: { query: country },
        headers: {
          'X-RapidAPI-Key': '921e9474d9msh41e6dc80c2d8395p101f78jsne7dbbeab3134',
          'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
        }
      }

      try {
        const response = await axios.request(options)
        console.log(response.data)
        var skyId = response.data.data[0].navigation.relevantFlightParams.skyId
        var entityId = response.data.data[0].navigation.relevantFlightParams.entityId
        console.log(response.data)
        console.log(skyId, entityId, 'ENTITY ID')
        return [skyId, entityId]
      } catch (error) {
        console.error(error)
        return [null, null]
      }
    },
    async filterby(data, stops) {
      var result = []
      if (stops == 'one') {
        var flight_list = data.data.itineraries
        console.log(flight_list)
        for (let f of flight_list) {
          if (f.legs[0].segments.length == 1 && f.legs[1].segments.length == 1) {
            if (!('eco' in f)) {
              f['eco'] = { ecoContenderDelta: 0 }
            }
            result.push(f)
          }
        }
      }
      function compareByEco(a, b) {
        return b.eco.ecoContenderDelta - a.eco.ecoContenderDelta
      }

      // // Sort the array by age in ascending order
      result.sort(compareByEco)

      for (const [i, obj] of result.entries()) {
        if (i == 0) {
          obj.eco['eco_best'] = true
        } else {
          obj.eco['eco_best'] = false
        }
      }
      console.log(result)
      return result
    }
  }
}
</script>

<style scoped>
.banner {
  background-color: blue;
}

.main_con {
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.header {
  background-color: #004ee4;
  color: white;
}

.input_c {
  background-color: #004ee4;
  color: white;
  border: none;
  font-size: 18px;
  font-weight: bold;
  width: 70% !important;
}

.first_row {
  color: #5f8fee;
}

.info_row {
  color: #5f8fee;
  font-size: 20px;
}
</style>

<style lang="scss" scoped>
:deep() {
  .dp-custom-input {
    border: none;
    color: white;
    // width:300px !important;

    &:focus {
      border: 1px solid var(--purplish-blue);
    }
  }
  .dp-color {
    background-color: #004ee4;
    text-align: center;
    font-size: 30px;
  }
  .dp-color svg {
    display: none;
  }
}
@media only screen and (min-width: 992px) and (max-width: 1400px) {
  .left-side-mobile {
    display: none;
  }
  .scroll-big {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
  }
}

@media only screen and (min-width: 992px) {
  .left-side-mobile {
    display: none;
  }
  .scroll-big {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
  }
}

@media only screen and (max-width: 1200px) {
  :deep() {
    .dp-color {
      font-size: 20px;
    }
  }

  .input_c {
    background-color: #004ee4;
    color: white;
    border: none;
    font-size: 15px;
    font-weight: bold;
  }
}

@media only screen and (max-width: 992px) {
  .left-side {
    display: none;
    /* padding: 60px 40px; */
  }
  .left-side-mobile {
    display: block;
  }

  .input_c {
    background-color: white;
    color: black;
    border: 1px solid black;
    font-size: 18px;
    font-weight: bold;
  }

  .scroll-big {
    height: 60vh;
    overflow-x: hidden;
    overflow-y: auto;
  }

  :deep() {
    .dp-custom-input {
      border: 1px solid black;
      color: white;

      &:focus {
        border: 1px solid var(--purplish-blue);
      }
    }
    .dp-color {
      background-color: white;
      text-align: center;
      color: black;
      font-size: 20px;
    }
    svg {
      display: block;
    }
  }
}

@media only screen and (max-width: 576px) {
  .main_con {
    width: 95%;
  }
  .sidenav{
    display:none;
  }
}
</style>
