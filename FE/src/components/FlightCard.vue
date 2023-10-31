<template>
  <!-- <div class="container mt-4 mb-2"> -->
    <div class="row p-1">
      <div class="col px-0">
        <p v-if="this.eco" class="card-header text-white" style="background-color:#52a568; font-size:15px">{{ parseInt(this.eco) }}% Lesser Carbon Footprint</p>
        <div class="card mb-3 rounded-0 p-3 pb-1 shadow" >
          
          <div class="row">

            <div class="col-2">
              <div class="" style="">
                <img :src="this.img" alt="" class="img-fluid w-100 h-100 mb-3" style ="" />
                
            </div>
          </div>

          <div class="col-8">
            <div class="row">
            <div class="d-flex">
              <p class="me-3 my-0">{{this.carrierNameO}} 
                <!-- ({{this.alternateIdO }}-{{ this.flightNumberO }}) -->
              </p>
              <!-- <div v-if="eco_flag()" style="display:flex;">
               <img  src="../assets/carbon_fp.png" alt="" class="img-fluid"  style="width:30px;height:30px;">
              </div> -->
            </div>
          </div>

            <hr>
           <div class="row">
            <div class="col-4 px-0">
              {{this.originDisplayCode}} {{ format_date(this.departure)[1] }}
            </div>

            <div class="col">
              <div>
                {{ hour(this.duration) }}
              </div>
              <div class="">
                <img class="" src="../assets/plane.svg" style="width:20px"/>
              </div>
            </div>

            <div class="col-4 px-0">
              {{ this.destinationDisplayCode }} {{ format_date(this.arrival)[1] }}
            </div>
            
            
           </div>
            
          </div>

            <div class="col-2 px-0 book_big">
              {{ this.totalPrice }}
              <button class="btn btn-success" @click="book_flight()">Book</button>
            </div>

            <div class="col-2 px-0 book_small">
              <div class="">
                {{ this.totalPrice }} 
              </div>
             
              <button class="btn btn-success" @click="book_flight()">Book</button>
            </div>
            
          </div>

          <!-- <div class="row">
            
            <div class="col">
              <div class="" style="height:50px;width:50px">
                <img :src="this.img" alt="" class="img-fluid w-100 h-100" style ="" >
                
              </div>
              {{this.carrierNameO}} 
              {{this.alternateIdO }}-{{ this.flightNumberO }}
               
            </div>
            <div class="col">
              {{this.originDisplayCode}}

            {{ format_date(this.departure)[0] }} 
            {{ format_date(this.departure)[1] }}
            {{ format_date(this.arrival)[1] }}
            </div>
            <div class="col">{{ hour(this.duration) }}</div>
            <div class="col">
              {{ this.destinationDisplayCode }}

            </div>
            <div class="col ">
               {{this.alternateIdD }}-{{ this.flightNumberD }} 
            </div>
          </div>
          <div class="row mt-5">
            <div class="col mt-5">{{ this.totalPrice }}</div>
            {{ this.tag }}
            <br>
            {{ this.eco }}
            
          </div> -->
        </div>
      </div>
    </div>
  <!-- </div> -->
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
    duration: Number,
    arrival: String,
    destinationDisplayCode: String,
    destinationCity: String,
    totalPrice: String,
    tag:Object,
    eco:Number,
    img:String,
    eco_best:Boolean,
  },
  data() {
    // local repository of information
    return {
      user:'',
      iti_name:'',
      carbon_img:''

    }
  },
  computed: {
    // computed
    ...mapStores(useAuthStore),
    ...mapStores(useUsersStore),
    ...mapStores(useItineraryStore),
    bestchoice(){
      if (this.eco_best){
        return 'green'
      }
      return 'white'
    }
    
  },

  // start of lifecycle
  async mounted() {
  },

  methods: {
    // methods defined by ourselves
    eco_flag(){
      console.log(this.eco)
      if (this.eco != 0){
        return true
      }
      return false
    },
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
                    "notes":"",
                    "eco":this.eco,
                    "img":""
                }
      var flightjson = await itineraryStore.createflight(flight_obj)
      console.log(flightjson,'JSON')
      iti_data.itinerary_data.flights.push(flightjson)
      
        
        await userStore.updateItinerary(iti_data,this.user,this.iti_name);
        this.$router.push({ path: `/itinerary/${this.user}/${this.iti_name}` ,replace:true})
      },
      format_date(date) {
        date = new Date(date)
      let mth = date.getMonth()
      let day = date.getDate()
      let year = date.getFullYear()
      let time = String(date.toLocaleTimeString()).replaceAll(' ', '-')
      // time = time.split(':').slice(0,1).join(":")  + time.split(':')[2].slice(0,-2)
      
      var parts = time.split('-');
      let front_time = parts[0].split(':')
      time = front_time[0] + ":" +  front_time[1] +parts[1]


      return [`${year}-${mth + 1}-${day}`, time]
    },
    hour(time){
      const hours = Math.floor(time / 60); 
      const remainingMinutes = time % 60; 

      return String(`${hours}h ${remainingMinutes}m`);
    }
  
  }
}
</script>

<style scoped>

@media only screen and (min-width: 992px) {
  .book_big{
    display:block;
  }

  .book_small{
    display:none;
  }
   
     }

@media only screen and (max-width: 992px) {
  .book_small{
    display:block;
  }

  .book_big{
    display:none;
  }
   
     }

</style>
