<template>
  <div class="container bg-white main_con my-5">
    <div class="row p-5">
    <div class="col header pe-0 ">

      <div class="col-12">
        <img src="../assets/plane_img.png" alt="" class="img-fluid w-100 h-25">
      </div>

      <div class="col">
      <div class="row">
        <div class="col text-start">
          One Way
        </div>
        <div class="col text-start">
          One Stop
        </div>
      </div>

      <div class="row mt-4">
        <div class="col text-start">
          <div class="mb-2 first_row">
            From
          </div>
          <div class="d-flex"><input type="text" v-model="departure_c" class="w-50 d-inline-block input_c" />
            <!-- <p class="d-inline-block">testing </p> -->
            <img src="../assets/plane_up.png" alt="" class="">
          </div>
          

        </div>
        <div class="col text-start">
          <div class="mb-2 first_row">
            To
          </div>
          <div class="d-flex"><input type="text" v-model="destination_c" class="w-50 d-inline-block input_c" />
            <!-- <p class="d-inline-block">testing </p> -->
            <img src="../assets/plane_up.png" alt="" class="">
          </div>
        </div>

      </div>

      <div class="row">
        
        <div class="col">
          Date
          <br>
          <div>

            <Datepicker
            v-model="flight_date"
            placeholder="Departure Date/time"
            :enable-time-picker="false"
            :teleport="true"
            :text-input="true"
            :min-date="start_date"
            :start-date="start_date"
            :max-date="end_date"
            @update:model-value="mountAllHotelInformation"
            focus-start-date
            range/>

          </div>
        </div>

      </div>

    </div>
      

      

      
  
    </div>
    <div class="col card_section" v-if="mounted">
      <FlightCard
        v-for="flight in this.hotelsInCities"
        :flightNumberO="flight.legs[0].segments[0].flightNumber"
        :alternateIdO ="flight.legs[0].segments[0].marketingCarrier.alternateId"
        :carrierNameO="flight.legs[0].carriers.marketing[0].name"

        :flightNumberD="flight.legs[1].segments[0].flightNumber"
        :alternateIdD ="flight.legs[1].segments[0].marketingCarrier.alternateId"
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
        :tag = "flight.tags"
        :eco = "flight.eco.ecoContenderDelta"
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
      false_data:[],
      user:'',
      iti_name:'',
      iti_data: '',
      start_date:'',
      end_date:'',
      flight_date:'',
      destination_c:''

    }
  },
  computed: {
    // computed
    ...mapStores(useAuthStore),
    ...mapStores(useUsersStore),
    ...mapStores(useItineraryStore)
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

      var state = capital.filter((c) => c['country'].toLowerCase() == this.destination_c.toLowerCase() );
      var destination_country = state[0]['city']
      //placeholder
      var data = flight
      this.hotelsInCities = await this.filterby(data,'one')
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
    
      
      var d_skyId = "SINS"
      var d_entityId = "27546111"
      console.log(destination_country)
      const [a_skyId,a_entityId] = await this.getAPIcountry(destination_country)
      // var a_skyId = 'JP'
      // var a_entityId = '29475330'
      if (a_skyId == null || a_entityId == null){
        this.hotelsInCities = []
        return
      }
      var people  = '1'
      console.log(d_date,a_date)
const options = {
  method: 'GET',
  url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights',
  params: {
    originSkyId: d_skyId,
    destinationSkyId: a_skyId,
    originEntityId: d_entityId,
    destinationEntityId: a_entityId,
    date: d_date,
    returnDate : a_date,
    adults: people,
    currency: 'SGD'
  },
  headers: {
    'X-RapidAPI-Key': '921e9474d9msh41e6dc80c2d8395p101f78jsne7dbbeab3134',
    'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
  }
};
console.log(options)
try {
	const response = await axios.request(options);
	console.log(response.data);
  var data = response.data
  this.hotelsInCities = await this.filterby(data,'one')
  this.mounted = true
} catch (error) {
	console.error(error);
}

    },

    async getAPIcountry(country){
      const options = {
        method: 'GET',
        url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport',
        params: {query: country},
        headers: {
          'X-RapidAPI-Key': '921e9474d9msh41e6dc80c2d8395p101f78jsne7dbbeab3134',
          'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log(response.data)
        var skyId = response.data.data[0].navigation.relevantFlightParams.skyId
        var entityId = response.data.data[0].navigation.relevantFlightParams.entityId
        console.log(response.data);
        console.log(skyId,entityId,"ENTITY ID")
        return [skyId,entityId]
      } catch (error) {
        console.error(error);
        return [null,null]
      }
    },
    async filterby(data,stops){
      console.log(data)
      var result = []
      if (stops == 'one'){
        var flight_list = data.data.itineraries
        console.log(flight_list)
        for (let f of flight_list){
          if (f.legs[0].segments.length == 1 && f.legs[1].segments.length == 1 ){
            if (!('eco' in f)){
              f['eco'] = {'ecoContenderDelta':"NORMAL"}
            }
            result.push(f)
          }
        }
      }
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
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}
.header{
  background-color:#004ee4;
  color:white;
}

.input_c{
  background-color:#004ee4;
  color:white;
  border:none;
  font-size: 20px;
  font-weight: bold;
}

.first_row{
  color:#5f8fee;
}

.info_row{
  color:#5f8fee;
  font-size: 10px;
}
</style>
