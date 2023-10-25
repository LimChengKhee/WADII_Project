<template>
  <div class="parent-container">
    <div class="header">
      <div class="container-fluid mt-5 ms-5 mb-3">
        <div class="row">
          <div class="col">
            <h2 style="text-align: center">Search accomodation</h2>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p style="text-align: center">Search for accomodation deals for {} in {}</p>
          </div>
        </div>
      </div>

      <div class="container-fluid ms-5 mb-3">
        <div class="row">
          <div class="col">
            <!--inputted value in it-->
            <input type="text" value="Singapore" class="w-100" />
          </div>
          <div class="col">
            <input type="date" value="13th September 2023" class="w-100" />
          </div>
        </div>
      </div>
    </div>
    <div class="card_section" v-if="mounted">
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
    <div class="spinner_section d-flex flex-column" v-if="!mounted">
      <div
        class="spinner-border mt-5"
        style="margin: 0 auto; height: 200px; width: 200px"
        role="status"
      ></div>
      <p class="mt-2" style="text-align: center">Loading...Please give us a second</p>
    </div>
  </div>
</template>
<script>
import FlightCard from '../components/FlightCard.vue'
import axios from 'axios'
import flight from './flight.json'

export default {
  name: 'Flight',
  components: {
    // importing components from other places
    FlightCard
  },
  data() {
    // local repository of information
    return {
      hotelsInCities: {},
      mounted: false,
      false_data: flight
    }
  },
  computed: {
    // computed
  },

  // start of lifecycle
  async mounted() {
    await this.mountAllHotelInformation()
    this.mounted = true
  },

  methods: {
    // methods defined by ourselves
    async mountAllHotelInformation() {
      // get all the hotels within that city displayed.
      // const options = {
      //   method: 'GET',
      //   url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
      //   params: {
      //     checkin_date: checkin_date,
      //     dest_type: 'city',
      //     units: 'metric',
      //     checkout_date: checkout_date,
      //     adults_number: adults_number,
      //     order_by: 'popularity',
      //     dest_id: dest_id,
      //     filter_by_currency: 'HNL',
      //     locale: 'en-gb',
      //     room_number: number_of_rooms,
      //     categories_filter_ids: 'class::2,class::4,free_cancellation::1',
      //     include_adjacency: 'true'
      //   },
      //   headers: {
      //     'X-RapidAPI-Key': '77e12cde7dmsh40a7d5751e3dff1p1ca69ajsnc3ae5c097785',
      //     'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
      //   }
      // };
      // const options = {
      //   method: 'GET',
      //   url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
      //   params: {
      //     checkin_date: '2023-09-27',
      //     dest_type: 'city',
      //     units: 'metric',
      //     checkout_date: '2023-09-30',
      //     adults_number: '2',
      //     order_by: 'popularity',
      //     dest_id: '-73635',
      //     filter_by_currency: 'HNL',
      //     locale: 'en-gb',
      //     room_number: '1',
      //     children_number: '2',
      //     children_ages: '5,0',
      //     categories_filter_ids: 'class::2,class::4,free_cancellation::1',
      //     include_adjacency: 'true'
      //   },
      //   headers: {
      //     'X-RapidAPI-Key': '77e12cde7dmsh40a7d5751e3dff1p1ca69ajsnc3ae5c097785',
      //     'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
      //   }
      // }

      // const response = await axios.request(options)
      this.hotelsInCities = this.filterby(this.false_data,'one')
      // console.log(this.hotelsInCities.data.itineraries,'test')

      // for (let hotel of this.hotelsInCities) {
      //   let hotel_id = hotel.hotel_id
      //   // fire an API call to get description
      //   const options = {
      //     method: 'GET',
      //     url: 'https://booking-com.p.rapidapi.com/v1/hotels/description',
      //     params: {
      //       hotel_id: hotel_id,
      //       locale: 'en-gb'
      //     },
      //     headers: {
      //       'X-RapidAPI-Key': '77e12cde7dmsh40a7d5751e3dff1p1ca69ajsnc3ae5c097785',
      //       'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
      //     }
      //   }
      //   try {
      //     const response = await axios.request(options)
      //     hotel['Description'] = response.data
      //   } catch (error) {
      //     console.error(error)
      //   }
      // }
      // this.hotelsInCities = this.false_data;
    },
    filterby(data,stops){
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
</style>
