<template>
  <div class="main-container" style="padding-left: 20%; padding-right: 20%;">
    <div class="header_information"></div>
    <div class="body">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 hotel_name mt-3 ps-0">
            <p style="font-size: 3rem">{{ this.hotelName }}</p>
          </div>
          <div class="row address mb-5" style="font-size: 1.5rem">
            <span style="padding-left: 0px;">
              <img src="../assets/nearby.png" style="width: 50px;">
              {{ this.exactAddress }}
            </span>
          </div>
          <div class="row picture w-50 mx-auto">
            <div id="carouselExample" class="carousel slide">
              <div class="carousel-inner" v-if="Object.keys(picturesOfHotel).length !== 0">
                <div class="carousel-item active">
                  <img :src="`${picturesOfHotel.data[2].url_1440}`" class="d-block img-fluid" alt="..." />
                </div>

                <div v-for="pictures in picturesOfHotel.data" class="carousel-item" style="width: 100%; height: 50%">
                  <img :src="`${pictures.url_1440}`" class="d-block w-100" alt="..." />
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div class="row long_description" style="margin-top: 30px;">
            <strong style="padding-left: 0px;">About</strong> <br /> 
            <span style="color:white;">
              {{ this.longDescription }}
            </span>  
          
          </div>
          <div class="row long_price" style="margin-top:  30px" v-if="Object.keys((this.specificHotelInfo)).length !== 0">
            <strong style="padding-left: 0px;">Price</strong> <br />
            <ul class="list-group list-group-horizontal" style="margin-top: 10px;">
              <li class="list-group-item">
                <strong style="color:black;">
                  All Inclusive Amount
                </strong>
              </li>
              <li class="list-group-item">
                {{ this.specificHotelInfo['composite_price_breakdown']["all_inclusive_amount"]["value"] }}
              </li>
              <li class="list-group-item">
                <strong style="color:black;">
                  Price Per Night
                </strong>
              </li>
              <li class="list-group-item">
                <strong style="color:black;">
                  {{ this.specificHotelInfo['composite_price_breakdown']["gross_amount_per_night"]["value"] }}
                </strong>
              </li>
            </ul>
          </div>

          <div class="row facilities mt-3" style="background-color: white;">
            <div class="container">
              <div class="row">
                <div class="col" style="padding-left: 0px;padding-top: 30px;">
                  <strong style="color:black;">Most Popular Facilities</strong><br />
                </div>
              </div>
              <div class="row">
                <div class="container">
                  <div class="row">
                    <div v-for="facilities in mostPopularFacilities" class="col-xl-3 col-lg-4 col-md-5 col-sm-6 mt-2 m-2">
                      <div class="col-4 d-flex mb-4">
                        <span style="margin-right: 30px;">
                          <img :src="`${facilities.src}`" style="width:50px;">
                        </span>
                        <p style="white-space:nowrap;color:black;">{{ facilities["label"] }} </p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="reviews">
            <div class="container-fluid">
              <div class="row">
                <strong style="padding-left:0px;">Guest Reviews</strong>
              </div>
              <div class="row">
                <div class="col d-flex" style="padding-left: 0px;">
                  <p class="mt-2" style="font-size: 1rem;">
                    <strong>{{ this.noOfReview + ' Reviews' }}</strong>
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-3 col-xs-4 mb-3">
                  Staff
                  <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
                    aria-valuemax="100">
                    <div class="progress-bar w-0"></div>
                  </div>
                </div>
                <div class="col-sm-3 col-xs-4 mb-3">
                  Facilities
                  <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
                    aria-valuemax="100">
                    <div class="progress-bar w-75"></div>
                  </div>
                </div>
                <div class="col-sm-3 col-xs-4 mb-3">
                  Cleanliness
                  <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
                    aria-valuemax="100">
                    <div class="progress-bar w-50"></div>
                  </div>
                </div>
                <div class="col-sm-3 col-xs-4 mb-3">
                  Comfort
                  <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
                    aria-valuemax="100">
                    <div class="progress-bar w-75"></div>
                  </div>
                </div>
                <div class="col-sm-3 col-xs-4 mb-3">
                  Value for Money
                  <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
                    aria-valuemax="100">
                    <div class="progress-bar w-25"></div>
                  </div>
                </div>
                <div class="col-sm-3 col-xs-4 mb-3">
                  Location
                  <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
                    aria-valuemax="100">
                    <div class="progress-bar w-30"></div>
                  </div>
                </div>
                <div class="col-sm-3 col-xs-4 mb-3">
                  Free Wifi
                  <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
                    aria-valuemax="100">
                    </div>
                </div>
                <div class="col-sm-3 col-xs-4 mb-3">
                  Sanitation
                  <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
                    aria-valuemax="100">
                    <div class="progress-bar w-75"></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="review_card">
            <div class="container-fluid">
              <div class="row">
                <p style="font-size:1rem;">
                  <strong>See what guests loved the most:</strong>
                </p>
              </div>
              <div class="row">
                <div class="col-4" v-if="Object.keys(reviewsOfTheHotel).length !== 0" v-for="review in reviewsOfTheHotel">
                  <div class="card w-100">
                    <div class="card-body">
                      <h5 class="card-title">Review on {{ review.hotelier_name }}</h5>
                      <p>{{ review.average_score }}</p>
                      <p class="card-text">
                        {{ review.pros }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row house_rules" style="margin-top:  40px" v-if="Object.keys((this.specificHotelInfo)).length !== 0">
            <strong style="padding-left: 0px;">Check In & Check Out</strong> <br />
            <ul class="list-group">
              <li class="list-group-item" style="padding: 30px;">
                <div class="row">
                  <div class="col-3">
                    <img src="../assets/door.png" style="width: 30px;margin-right:30px;" alt=""> Check In 
                  </div>
                  <div class="col d-flex justify-content-start" style="color:black;">
                      {{ "Check In From: " + this.specificHotelInfo["checkin"]["from"] }}
                  </div>
                </div>
              </li>
              <li class="list-group-item" style="padding: 30px;">
                <div class="row">
                  <div class="col-3" >
                    <img src="../assets/door.png" style="width: 30px;margin-right:30px;" alt=""> Check Out 
                  </div>
                  <div class="col d-flex justify-content-start" style="color:black;">
                      {{ "Check Out Before: " + this.specificHotelInfo["checkout"]["until"] }}
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
//  import statements
import axios from 'axios'

export default {
  name: 'Hotel_Page',
  components: {
    // importing components from other places
  },
  data() {
    // local repository of information
    return {
      hotelsInCities: {},
      hotelName: '',
      hotelId: '',
      specificHotelInfo: {},
      nameOfHotel: '',
      exactAddress: '',
      picturesOfHotel: {},
      reviewRating: '',
      longDescription: '',
      propertyHighlights: '',
      reviewsOfTheHotel: {},
      reviewScoreWord: '',
      noOfReview: '',
      mostPopularFacilities: {
        cityView: {
          label: "City View",
          src: "/src/assets/skyscraper.png"
        },
        garden: {
          label: "Garden",
          src: '/src/assets/gardening.png'
        },
        outdoor_pool: {
          label: "Outdoor Pool",
          src: '/src/assets/swimming-pool.png'
        },
        wifi: {
          label: "Free Wifi",
          src: '/src/assets/wi-fi.png'
        },
        parking: {
          label: "Parking",
          src: '/src/assets/parking-area.png'
        },
        bathtub: {
          label: "Bathtub",
          src: '/src/assets/bathtub.png'
        },
        aircon: {
          label: "Aircon",
          src: '/src/assets/air-conditioner.png'
        },
        frontdesk: {
          label: "Front Desk",
          src: '/src/assets/information-desk.png'
        },
        key_card: {
          label: "Key Card Access",
          src: '/src/assets/access.png'
        }
      },
      labels: {
        Staff: {
          label: "Staff",
          width: 30
        },
        Facilities: {
          label: "Facilities",
          width: 30
        },
        Cleanliness: {
          label: "Cleanliness",
          width: 30
        },
        Comfort: {
          label: "Comfort",
          width: 30
        },
        Value_For_Money: {
          label: "Value For Money",
          width: 30
        },
        Location: {
          label: "Location",
          width: 30
        },
        Free_Wifi: {
          label: "Free Wifi",
          width: 30
        },
        Sanitation: {
          label: "Sanitation",
          width: 30
        }
      },
    }
  },
  computed: {
    // computed
  },

  methods: {
    // methods defined by ourselves
    async loadPersistedData() {
      const persistedData = localStorage.getItem('persistedData')
      this.hotelsInCities = persistedData ? JSON.parse(persistedData) : null

      return this.hotelsInCities
    },

    async getHotelSpecificInfo() {
      for (let object of this.hotelsInCities) {
        if (object.hotel_name === this.hotelName) {
          this.hotelId = object['hotel_id']
          this.specificHotelInfo = object
        }
      }
    },
    async getPicturesOfHotels() {
      const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/photos',
        params: {
          hotel_id: this.hotelId,
          locale: 'en-gb'
        },
        headers: {
          'X-RapidAPI-Key': '1b483ecf55mshf8532b1de0b460ep15ab30jsnbb634c85aadd',
          'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async getFacilitiesOfHotels() {

      const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/facilities',
        params: {
          hotel_id: '1676161',
          locale: 'en-gb'
        },
        headers: {
          'X-RapidAPI-Key': '1b483ecf55mshf8532b1de0b460ep15ab30jsnbb634c85aadd',
          'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        return response
      } catch (error) {
        console.error(error);
      }

    },
    async getReviews() {
      const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/reviews',
        params: {
          sort_type: 'SORT_MOST_RELEVANT',
          hotel_id: '1676161',
          locale: 'en-gb',
          language_filter: 'en-gb,de,fr',
          customer_type: 'solo_traveller,review_category_group_of_friends'
        },
        headers: {
          'X-RapidAPI-Key': '1b483ecf55mshf8532b1de0b460ep15ab30jsnbb634c85aadd',
          'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options)
        return response.data.result.slice(0, 3)
      } catch (error) {
        console.error(error);
      }
    },
    async getDescription() {
      const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/description',
        params: {
          hotel_id: this.hotelId,
          locale: 'en-gb'
        },
        headers: {
          'X-RapidAPI-Key': '1b483ecf55mshf8532b1de0b460ep15ab30jsnbb634c85aadd',
          'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options)
        return response.data['description']
      } catch (error) {
        console.error(error);
      }
    }
  },
  // start of lifecycle
  async mounted() {
    this.hotelsInCities = await this.loadPersistedData()
    
    
    this.hotelName = this.$route.params['name']

    // get hotel specific info
    await this.getHotelSpecificInfo()
    // extraction of all relevant data I want to show
    this.exactAddress = this.specificHotelInfo['address']
    this.picturesOfHotel = await this.getPicturesOfHotels()
    this.reviewScoreWord = this.specificHotelInfo['review_score_word']
    this.noOfReview = this.specificHotelInfo['review_nr']
    this.reviewScore = this.specificHotelInfo['review_score']
    this.longDescription = await this.getDescription()
    this.facilitiesAvailable = await this.getFacilitiesOfHotels()
    this.reviewsOfTheHotel = await this.getReviews()
  }
}
</script>

<style scoped>
*{
  color:white;
}
</style>

