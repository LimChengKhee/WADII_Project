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
          <div class="col-4"></div>
          <div class="col-2 me-3">
            <!--inputted value in it-->
            <input type="text" value="Singapore" />
          </div>
          <div class="col-3">
            <input type="date" value="13th September 2023" />
          </div>
          <div class="col-3">
            <!-- human logos in it -->
          </div>
        </div>
      </div>

      <div class="container-fluid filter-button">
        <div class="row ms-4">
          <div class="col-3"></div>
          <!--PRICE FILTER-->
          <div class="col-2">
            <button
              class="btn btn-outline-secondary dropdown-toggle"
              type="button"
            >
              Price Per Night
            </button>
          </div>

          <div class="col-1">
            <button
              class="btn btn-outline-secondary dropdown-toggle"
              type="button"
            >
              Rating
            </button>
            <!--slider-->
          </div>

          <div class="col-1 mx-4" style="padding-left: 0px">
            <button
              class="btn btn-outline-secondary dropdown-toggle"
              type="button"
            >
              Star Rating
            </button>
          </div>

          <div class="col-1 mx-4" style="padding-left: 0px">
            <input type="text" class="search" />
            <!--Search text box-->
          </div>

          <!--Pending search button-->
        </div>
      </div>
    </div>
    <div class="card_section" v-if="mounted">
      <HotelCard
        v-for="hotel in this.hotelsInCities"
        :hotel_name="hotel.hotel_name"
        :distance_to_cc_formatted="hotel.distance_to_cc_formatted"
        :review_score="hotel.review_score"
        :review_score_word="hotel.review_score_word"
        :number_of_reviews="hotel.review_nr"
        :photo_url="hotel.max_1440_photo_url"
        :price_per_night="hotel.composite_price_breakdown.gross_amount_per_night.value"
        :currency="hotel.composite_price_breakdown.gross_amount_per_night.currency"
        :updated_object="hotel"
        :district="hotel.district"
        :city="hotel.city"
      ></HotelCard>
    </div>
    <div class="spinner_section d-flex flex-column" v-if="!mounted">
      <div class="spinner-border mt-5" style="margin: 0 auto;height:200px;width:200px;" role="status">
      </div>
      <p class="mt-2" style="text-align: center;">Loading...Please give us a second</p>
    </div>
  </div>
</template>
<script>
import HotelCard from '../components/Hotel_Card.vue'
import axios from 'axios'
import flushPromises from 'flush-promises'

export default {
  name: 'Hotel',
  components: {
    // importing components from other places
    HotelCard
  },
  data() {
    // local repository of information
    return {
      hotelsInCities: {},
      mounted: false
    }
  },
  computed: {
    // computed
  },

  // start of lifecycle
  // async mounted() {
  //   await this.mountAllHotelInformation()
  //   this.mounted = true
  // },

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
      const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
        params: {
          checkin_date: '2023-09-27',
          dest_type: 'city',
          units: 'metric',
          checkout_date: '2023-09-30',
          adults_number: '2',
          order_by: 'popularity',
          dest_id: '-73635',
          filter_by_currency: 'HNL',
          locale: 'en-gb',
          room_number: '1',
          children_number: '2',
          children_ages: '5,0',
          categories_filter_ids: 'class::2,class::4,free_cancellation::1',
          include_adjacency: 'true'
        },
        headers: {
          'X-RapidAPI-Key': '77e12cde7dmsh40a7d5751e3dff1p1ca69ajsnc3ae5c097785',
          'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
      }
      const response = await axios.request(options)
      this.hotelsInCities = response.data.result

      await flushPromises()

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
        }
        try {
          const response = await axios.request(options)
          hotel['Description'] = response.data
        } catch (error) {
          console.error(error)
        }
      }
      await flushPromises()
      console.log(this.hotelsInCities)
    }
  }
}
</script>

<style scoped>
.banner {
  background-color: blue;
}
</style>
