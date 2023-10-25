<template>
  <div class="container mt-4 mb-2">
    <div class="row h-25s">
      <div class="col-sm-1"></div>
      <div class="col-sm-10">
        <div class="card mb-3 rounded-0">
          <div class="row">
            <div class="col">
              {{this.alternateIdO }}-{{ this.flightNumberO }},{{this.carrierNameO}}
            </div>
            <div class="col">
              {{ this.departure }},{{
                this.originDisplayCode
              }},{{ this.originName }},{{ this.originCity }}
            </div>
            <div class="col">{{ this.duration }},</div>
            <div class="col">
              {{ this.arrival }},{{
                this.destinationDisplayCode
              }},{{ this.destinationCity }},{{
                this.destinationCity
              }}
            </div>
            <div class="col bg-primary">
              {{this.alternateIdD }}-{{ this.flightNumberD }},{{this.carrierNameD}}
            </div>
          </div>
          <div class="row mt-5">
            <div class="col mt-5">{{ this.totalPrice }}</div>
            {{ this.tag }}
            <br>
            {{ this.eco }}
            <button class="btn btn-primary" @click="book_flight()">Book</button>
          </div>
        </div>
      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>
<script>

import { mapStores } from 'pinia';
import { useAuthStore } from '../store/piniaStore/authStore';
import { useUsersStore } from '../store/piniaStore/userStore';
import { useItineraryStore } from '../store/piniaStore/itinerary';
export default {
  name: 'FlightCard',
  components: {},
  props: {
    alternateIdO: String,
    flightNumberO: String,
    carrierNameO: String,
    alternateIdD: String,
    flightNumberD: String,
    carrierNameD: String,
    departure: String,
    originDisplayCode: String,
    originName: String,
    originCity: String,
    duration: String,
    arrival: String,
    destinationDisplayCode: String,
    destinationCity: String,
    totalPrice: String,
    tag:Object,
    eco:String,
  },
  data() {
    // local repository of information
    return {
      user:'',
      iti_name:''
    }
  },
  computed: {
    // computed
    src() {
      return this.photo_url
    },
    ...mapStores(useAuthStore),
    ...mapStores(useUsersStore),
    ...mapStores(useItineraryStore)
  },

  // start of lifecycle
  async mounted() {},

  methods: {
    // methods defined by ourselves
    async book_flight(){
      const itineraryStore = useItineraryStore();
      const userStore = useUsersStore();
      const authStore = useAuthStore();
      this.user = this.$route.params.username
      this.iti_name = this.$route.params.itinerary_name
      var iti_data = await userStore.getUserItinerary(this.user,this.iti_name) 
        
       
      var date_arr = iti_data.itinerary_data.destination.itinerary_date.split(',')
      var check_date = []
      for(let i of date_arr){
        check_date.push(new Date(i))
      }
      var flight_obj = {
                    "duration":this.duration,
                    "flight_no" :this.alternateIdO + this.flightNumberO,
                    "departure_datetime": new Date(this.departure),
                    "arrival_datetime": new Date(this.arrival),
                    "departure_country": this.originName,
                    "arrival_country": this.destinationCity,
                    "distance":0,
                    "cost":this.totalPrice,
                    "currency":"sgd",
                    "carbon_fp":0,
                    "notes":""
                }
      var flightjson = await itineraryStore.createflight(flight_obj)
      console.log(flightjson,'JSON')
      iti_data.itinerary_data.flights.push(flightjson)
      
        
        await userStore.updateItinerary(iti_data,this.user,this.iti_name);
        this.$router.push({ path: `/itinerary/${this.user}/${this.iti_name}` ,replace:true})
      },
  
  }
}
</script>

<style scoped></style>
