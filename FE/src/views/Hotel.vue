<template>
  <div class="parent-container container rounded-4 bg-white mt-5">
    <div class="row">

      <div class="col-12">
        <div class="row">
          <div class="header">
          <div class="container-fluid">
            <div class="row my-5">
              <div class="col">
                <h2 style="text-align: center;color:black">Search Accommodation</h2>
              </div>
            </div>
            <!-- <div class="row">
              <div class="col">
                <p style="text-align: center;color:black">Search for accomodation deals in {}</p>
              </div>
            </div> -->
          </div>

          <div class="container big d-flex justify-content-center">
            <div class="me-2" style="display:flex;">
              

                <div class="me-4">
                <Datepicker 
                v-model="this.date"
                placeholder="Date"
                :min-date="mindate"
                input-class-name=""
                :teleport="true"
                range
                /></div>
                <!-- sort -->
              <!-- <div class="">
                    <button class="btn btn-secondary dropdown-toggle " type="button" data-bs-toggle="dropdown"
                      aria-expanded="false">
                      Sorting Criteria
                    </button>
                    
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Review Rating
                          <span v-if="review_sort" @click="sort_review()"><img src="../assets/sort-up.png"
                              style="width:10px" alt=""></span>

                          <span v-else @click="sort_review()" ><img src="../assets/caret-down.png" style="width:10px"
                              alt=""></span>
                        </a></li>
                      <li><a class="dropdown-item" href="#">Distance
                          <span v-if="distance_sort" @click="sort_distance()"><img src="../assets/sort-up.png"
                              style="width:10px" alt=""></span>

                          <span v-else @click="sort_distance()"><img src="../assets/caret-down.png" style="width:10px"
                              alt=""></span>

                        </a></li>
                    </ul>
              </div> -->
              <div class="me-4">
                <input v-model="user_search" type="text" style="color:black; border:1px solid lightgrey; height:38px" placeholder="Search Hotel" class="p-2">
              </div>
              <div class="">
                <button class="btn btn-primary" value="Search" @click="searchHotelName()" type="button">Search</button>
              </div>
            </div>
          </div>

          <div class="row mobile">
            <div class="col-12"><Datepicker 
                v-model="this.date"
                placeholder="Date"
                :min-date="mindate"
                input-class-name=""
                :teleport="true"
                range
                /></div>
            <div class="col-12 "><input v-model="user_search" type="text" style="color:black; border:1px solid lightgrey; height:38px" placeholder="Search Hotel" class="p-2 w-100 my-2"></div>
            <div class="col-12"><button class="btn btn-primary w-100" value="Search" @click="searchHotelName()" type="button">Search</button></div>
          </div>

        </div>
        </div>

        <div class="card_section mt-5" v-if="mounted && !search">
          <HotelCard v-for="hotel in this.hotelsInCities" :hotel_name="hotel.hotel_name"
            :distance_to_cc_formatted="hotel.distance_to_cc" :review_score="hotel.review_score"
            :review_score_word="hotel.review_score_word" :number_of_reviews="hotel.review_nr"
            :photo_url="hotel.max_1440_photo_url"
            :price_per_night="hotel.composite_price_breakdown.gross_amount_per_night.value"
            :currency="hotel.composite_price_breakdown.gross_amount_per_night.currency" :updated_object="hotel"
            :district="hotel.district" :city="hotel.city"></HotelCard>
        </div>
        <div class="card_section" v-if="mounted && search">
          <HotelCard v-for="hotel in this.sub_hotels" :hotel_name="hotel.hotel_name"
            :distance_to_cc_formatted="hotel.distance_to_cc" :review_score="hotel.review_score"
            :review_score_word="hotel.review_score_word" :number_of_reviews="hotel.review_nr"
            :photo_url="hotel.max_1440_photo_url"
            :price_per_night="hotel.composite_price_breakdown.gross_amount_per_night.value"
            :currency="hotel.composite_price_breakdown.gross_amount_per_night.currency" :updated_object="hotel"
            :district="hotel.district" :city="hotel.city"></HotelCard>
        </div>

        <div class="spinner_section d-flex flex-column" v-if="!mounted">
          <div class="spinner-border mt-5" style="margin: 0 auto;height:200px;width:200px; color:black!important" role="status">
          </div>
          <p class="mt-2" style="text-align: center;">Loading...Please give us a second</p>
        </div>


      </div>

    </div>
  </div>
</template>
<script>
import HotelCard from '../components/Hotel_Card.vue'
import axios from 'axios'
import flushPromises from 'flush-promises'
import test from "../views/static/test.json"
import Datepicker from '@vuepic/vue-datepicker';
import { mapStores } from 'pinia'
import { useAuthStore } from '../store/piniaStore/authStore'
import { useUsersStore } from '../store/piniaStore/userStore'
import { useItineraryStore } from '../store/piniaStore/itinerary'

export default {
  name: 'Hotel',
  components: {
    // importing components from other places
    Datepicker,
    HotelCard
  },
  data() {
    // local repository of information
    return {
      date: "default_data",
      hotelsInCities: [],
      mounted: false,
      user_search: "",
      search: false,
      sub_hotels: [],
      review_sort: true,
      distance_sort: true,
      mindate: this.getDate(),
      user: '',
      iti_name: '',
      iti_data: '',
      start_date: '',
      end_date: '',
      destination_c: '',
      departure_c:''
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
    

    let currentState = await this.loadPersistedData();

    const authStore = useAuthStore()
    const userStore = useUsersStore()
    const itineraryStore = useItineraryStore()
    this.user = this.$route.params.username
    this.iti_name = this.$route.params.itinerary_name

    var iti_data = await userStore.getUserItinerary(this.user, this.iti_name)
    this.iti_data = iti_data
    this.start_date = iti_data.itinerary_data.destination.start_date
    this.end_date = iti_data.itinerary_data.destination.end_date
    var dc = iti_data.itinerary_data.destination.trip_country
    var dec = iti_data.itinerary_data.destination.departure_country
    this.destination_c = dc
    this.departure_c = dec
    this.date = [new Date(this.start_date),new Date(this.end_date)]

    if (currentState == null) {
      await this.mountAllHotelInformation()
      await this.savePersistedData()
      this.mounted = true
    }
    this.mounted = true
    console.log(this.hotelsInCities)

    
  },

  methods: {
    getDate() {
      var today = new Date()
      return today
    },
    sort_review() {
      console.log("test");
      this.review_sort = !this.review_sort;
      if (!this.review_sort) {
        this.hotelsInCities = this.hotelsInCities.sort((a, b) => {
          return Number(a["review_score"]) - Number(b["review_score"])
        })
      } else {
        this.hotelsInCities = this.hotelsInCities.sort((a, b) => {
          return Number(b["review_score"]) - Number(a["review_score"])
        })
      }
    },
    sort_distance() {
      console.log("jdsif");
      this.distance_sort = !this.distance_sort;
      if (!this.distance_sort) {
        this.hotelsInCities = this.hotelsInCities.sort((a, b) => {
          return Number(b["distance_to_cc"]) - Number(a["distance_to_cc"])
        })
      } else {
        this.hotelsInCities = this.hotelsInCities.sort((a, b) => {
          return Number(a["distance_to_cc"] - Number(b["distance_to_cc"]))
        })
      }
    },
    searchHotelName() {
      this.search = true;
      let hotels_sub = []
      for (let element of this.hotelsInCities) {
        var hotel = element["hotel_name"].toLowerCase()
        if (hotel.includes(this.user_searc.toLowerCase())) {
          hotels_sub.push(element)
        }
      }
      this.sub_hotels = hotels_sub;

    },
    async getDestID(location){
      
      const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/locations',
        params: {
          name: location,
          locale: 'en-gb'
        },
        headers: {
          'X-RapidAPI-Key': '77e12cde7dmsh40a7d5751e3dff1p1ca69ajsnc3ae5c097785',
          'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log(location)
        console.log(response.data,'here?')
        return response.data[0]['dest_id'];
      } catch (error) {
        console.error(error);
      }
    },

    // methods defined by ourselves
    async mountAllHotelInformation() {
      // get all the hotels within that city displayed.

      // let location = 'Japan'
      console.log('called')
      var dest_id = await this.getDestID(this.destination_c)

      console.log(dest_id,'await?')
      console.log(this.start_date,this.end_date)
      console.log('you there')
      var dest_id = "26216"
      const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
        params: {
          checkin_date:this.start_date,
          dest_type: 'city',
          units: 'metric',
          checkout_date: this.end_date,
          adults_number: 1,
          order_by: 'popularity',
          dest_id: dest_id,
          filter_by_currency: 'SGD',
          locale: 'en-gb',
          room_number: 1,
          categories_filter_ids: 'class::2,class::4,free_cancellation::1',
          include_adjacency: 'true'
        },
        headers: {
          'X-RapidAPI-Key': '77e12cde7dmsh40a7d5751e3dff1p1ca69ajsnc3ae5c097785',
          'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
      };

      // const options = {
      //   method: 'GET',
      //   url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
      //   params: {
      //     checkin_date: '2023-11-27',
      //     dest_type: 'city',
      //     units: 'metric',
      //     checkout_date: '2023-11-28',
      //     adults_number: '2',
      //     order_by: 'popularity',
      //     dest_id: '-553173',
      //     filter_by_currency: 'AED',
      //     locale: 'en-gb',
      //     room_number: '1',
      //     children_number: '2',
      //     children_ages: '5,0',
      //     categories_filter_ids: 'class::2,class::4,free_cancellation::1',
      //     page_number: '0',
      //     include_adjacency: 'true'
      //   },
      //   headers: {
      //     'X-RapidAPI-Key': '1b483ecf55mshf8532b1de0b460ep15ab30jsnbb634c85aadd',
      //     'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
      //   }
      // };

      try {
        const response = await axios.request(options)
        console.log(response,'LOADING');
        this.hotelsInCities = response.data.result
      } catch (error) {
        console.error(error);
      }

      await flushPromises()
      // this.hotelsInCities = test
      this.hotelsInCities = this.hotelsInCities.slice(0,10)

      for (let hotel of this.hotelsInCities) {
        let hotel_id = hotel.hotel_id
        // fire an API call to get description
        const options = {
          method: 'GET',
          url: 'https://booking-com.p.rapidapi.com/v1/hotels/description',
          params: {
            hotel_id: hotel_id,
            locale: 'en-gb'
          },
          headers: {
            'X-RapidAPI-Key': '77e12cde7dmsh40a7d5751e3dff1p1ca69ajsnc3ae5c097785',
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
          }
        };
        try {
          const response = await axios.request(options)
          hotel['Description'] = response.data
        } catch (error) {
          console.error(error)
        }
      }
      await flushPromises()
    },
    async savePersistedData() {
      // Use localStorage to save data
      this.$store.commit("settingHotels", this.hotelsInCities);
      localStorage.setItem('persistedData', JSON.stringify(this.hotelsInCities));
    },

    async loadPersistedData() {
      const persistedData = localStorage.getItem('persistedData');
      this.hotelsInCities = persistedData ? JSON.parse(persistedData) : null;

      return this.hotelsInCities;
    }
  }
}
</script>

<style scoped>
.banner {
  background-color: blue;
}

#search_input {
  position: absolute;
}

*{
  color:white;
}


@media only screen and (min-width: 576px) {


  .mobile{
    display:none;
  }
   
     }


@media only screen and (max-width: 576px) {


.mobile{
  display:block;
}
.big{
  display:none;
}
 
   }
   .card{
    
   }
</style>