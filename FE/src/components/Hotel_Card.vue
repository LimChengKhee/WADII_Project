<template>
  <div class="container mt-4 mb-2">
    <div class="row h-25s">
      <div class="col-sm-1"></div>
      <div class="col-sm-10">
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-xl-3">
              <div class="img" style="width:100%; height:100%; ">
                <img :src="src" class="img-fluid rounded-start"  alt="..." />
              </div>
            </div>
            <div class="col-xl-7">
              <div class="card-body">
                <div class="card-title d-flex p-sm-3 p-xl-0">
                  <router-link
                    :to="`/hotel/${this.hotel_name}`"
                    style="text-decoration: none; color: black; font-size: 20px; font-weight: bold"
                  >
                    {{ this.hotel_name }}
                  </router-link>
                </div>
                <div class="row d-flex justify-content-start p-sm-1 p-xl-0">
                  <div class="col-md-3 col-sm-4 col-xs-3">
                    <span class="badge rounded-pill text-bg-secondary"
                      >{{ this.distance_to_cc_formatted }} from centre</span
                    ><br />
                  </div>
                  
                  <div class="col-md-3 col-sm-3 col-xs-3">
                    <span class="badge rounded-pill text-bg-secondary"
                      >{{ this.currency_code}}</span
                    ><br />
                  </div>
                
                  <div class="review_word d-flex mt-2 align-items-center">
                    <!-- <span style="font-weight: bold; color: black" class="mb-0">
                      {{ this.review_score_word }}
                    </span>
                    <br> -->
                    <h6>Rating: </h6>
                    <h6 style="color: black; text-align: left;">
                      <span style="width:30px; height: 30px; font-size: 15px;" class="badge text-bg-info d-flex justify-content-center align-items-center ms-2">{{ this.review_score }}</span>
                      
                    </h6>
                    
                    <div class="m-2 fs-6">({{ this.number_of_reviews + ' Reviews' }})</div>
                  </div>
                </div>
                <div class="mt-5">
                  <p style="color: black; text-align:left;">
                    {{ this.updated_object.Description.description.slice(0, 100) }}
                    <a :href="`/hotel/${this.hotel_name}`" style="text-decoration: none"
                      >....read more.....</a
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="col-xl-2 p-2">
              <div class="container">
                <div class="row mt-5">
                  <!--Ratings / achievements-->
                  <button type="button" class="btn btn-primary">
                    <router-link
                      :to="`/hotel/${this.hotel_name}`"
                      style="text-decoration: none; color: black; font-weight: bold"
                    >
                      Details
                    </router-link>
                  </button>

                  <br />

                  <button type="button" class="btn btn-warning mt-2" @click="book_room()">
                    <span style="text-decoration: none; color: black; font-weight: bold">
                      Book Room
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-1"></div>
    </div>
  </div>
</template>
<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '../store/piniaStore/authStore'
import { useUsersStore } from '../store/piniaStore/userStore'
import { useItineraryStore } from '../store/piniaStore/itinerary'
export default {
  name: 'HotelCard',
  components: {},
  props: {
    class: String,
    currency_code: String,
    hotel_name: String,
    distance_to_cc_formatted: String,
    review_score: Number,
    review_score_word: String,
    number_of_reviews: Number,
    photo_url: String,
    price_per_night: Number,
    currency: String,
    updated_object: Object,
    district: String,
    city: String
  },
  data() {
    // local repository of information
    return {
      room_booked: [],
      user: '',
      iti_name: ''
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
    async book_room() {
      const itineraryStore = useItineraryStore()
      const userStore = useUsersStore()
      const authStore = useAuthStore()

      this.user = this.$route.params.username
      this.iti_name = this.$route.params.itinerary_name
      var iti_data = await userStore.getUserItinerary(this.user, this.iti_name)

      var date_arr = iti_data.itinerary_data.destination.itinerary_date.split(',')
      var check_date = []
      for (let i of date_arr) {
        check_date.push(new Date(i))
      }

      let hotel_name = this.hotel_name

      var hotel_obj = {
        hotelname: hotel_name,
        start_date: '',
        end_date: '',
        check_indates: check_date,
        lengthofstay: 10,
        cost: this.price_per_night,
        currency: 'sgd',
        rooms: 1,
        adult: 1,
        child: 0,
        people: 0,
        carbon_fp: 0,
        img: this.photo_url,
        notes: ''
      }
      
      var hoteljson = itineraryStore.createHotel(hotel_obj)
      iti_data.itinerary_data.hotels.push(hoteljson)
      console.log(iti_data.itinerary_data.hotels.length)
      if (iti_data.itinerary_data.hotels.length > 0) {
        itineraryStore.flag.hotel = true
        console.log(itineraryStore.flag.hotel, 'STATUS UPDATEDEDD')
      }

      console.log(iti_data, 'HOTEL HERE')

      await userStore.updateItinerary(iti_data, this.user, this.iti_name)
      this.$router.push({ path: `/itinerary/${this.user}/${this.iti_name}`, replace: true })
    }
  }
}
</script>

<style scoped>
*{
  font-family: 'Century Gothic', sans-serif;
}

@media only screen and (min-width: 1200px) {
  /* Your CSS styles go here */
.review_word {
  font-size: 11px;
}
}
</style>
