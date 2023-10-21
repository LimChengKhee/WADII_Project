<template>
  <div class="parent-container">
    <div class="row">
      <div class="col-2">
        <Side_Bar />
      </div>
      <div class="col-10 ">
        <div class="header">
          <div class="container-fluid mt-5 ms-5 mb-3">
            <div class="row">
              <div class="col">
                <h2 style="text-align: center">Search accomodation</h2>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <p style="text-align: center">Search for accomodation deals in {}</p>
              </div>
            </div>
          </div>

          <div class="container">
            <div class="row">
              <div class="col-1"></div>
              <div class="col-3">
                <input v-model="user_search" type="text">
                <input type="button" value="Search" @click="searchHotelName()">
              </div>
              <div class="col-5"></div>
              <div class="col-1">
                <span>
                  <div class="dropdown" style="width: 100%">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                      aria-expanded="false">
                      Sorting Criteria
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Review Rating
                          <span v-if="review_sort" @click="sort_review()"><img src="../assets/sort-up.png"
                              style="width:10px" alt=""></span>

                          <span @click="sort_review()" v-else><img src="../assets/caret-down.png" style="width:10px"
                              alt=""></span>
                        </a></li>
                      <li><a class="dropdown-item" href="#">Distance
                          <span v-if="distance_sort" @click="sort_distance()"><img src="../assets/sort-up.png"
                              style="width:10px" alt=""></span>

                          <span v-else @click="sort_distance()"><img src="../assets/caret-down.png" style="width:10px"
                              alt=""></span>

                        </a></li>
                    </ul>
                  </div>

                </span>
              </div>
            </div>
          </div>

        </div>
        <div class="card_section" v-if="mounted && !search">
          <HotelCard v-for="hotel in this.hotelsInCities" :hotel_name="hotel.hotel_name"
            :distance_to_cc_formatted="hotel.distance_to_cc_formatted" :review_score="hotel.review_score"
            :review_score_word="hotel.review_score_word" :number_of_reviews="hotel.review_nr"
            :photo_url="hotel.max_1440_photo_url"
            :price_per_night="hotel.composite_price_breakdown.gross_amount_per_night.value"
            :currency="hotel.composite_price_breakdown.gross_amount_per_night.currency" :updated_object="hotel"
            :district="hotel.district" :city="hotel.city"></HotelCard>
        </div>
        <div class="card_section" v-if="mounted && search">
          <HotelCard v-for="hotel in this.sub_hotels" :hotel_name="hotel.hotel_name"
            :distance_to_cc_formatted="hotel.distance_to_cc_formatted" :review_score="hotel.review_score"
            :review_score_word="hotel.review_score_word" :number_of_reviews="hotel.review_nr"
            :photo_url="hotel.max_1440_photo_url"
            :price_per_night="hotel.composite_price_breakdown.gross_amount_per_night.value"
            :currency="hotel.composite_price_breakdown.gross_amount_per_night.currency" :updated_object="hotel"
            :district="hotel.district" :city="hotel.city"></HotelCard>
        </div>
        <div class="spinner_section d-flex flex-column" v-if="!mounted">
          <div class="spinner-border mt-5" style="margin: 0 auto;height:200px;width:200px;" role="status">
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
import Side_Bar from "../components/SideBar.vue"
import test from "../views/static/test.json"

export default {
  name: 'Hotel',
  components: {
    // importing components from other places
    Side_Bar,
    HotelCard
  },
  data() {
    // local repository of information
    return {
      hotelsInCities: [],
      mounted: false,
      user_search: "",
      search: false,
      sub_hotels: [],
      review_sort: true,
      distance_sort: true
    }
  },
  computed: {
    // computed
  },

  // start of lifecycle
  async mounted() {
    let currentState = await this.loadPersistedData();

    if (currentState == null) {
      await this.mountAllHotelInformation()
      await this.savePersistedData()
      this.mounted = true
    }
    this.mounted = true
  },

  methods: {
    sort_review(direction_to_go) {
      console.log('sd')
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
        if ((element["hotel_name"].includes(this.user_search))) {
          hotels_sub.push(element)
        }
      }
      this.sub_hotels = hotels_sub;

    },


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

      // try {
      //   const response = await axios.request(options)
      //   console.log(response);
      //   this.hotelsInCities = response.data.result
      // } catch (error) {
      //   console.error(error);
      // }

      // await flushPromises()
      this.hotelsInCities = test
        console.log(test)
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
            'X-RapidAPI-Key': '1b483ecf55mshf8532b1de0b460ep15ab30jsnbb634c85aadd',
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
</style>
