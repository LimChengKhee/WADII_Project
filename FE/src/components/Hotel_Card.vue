<template>
  <div class="container mt-4 mb-2">
    <div class="row h-25s">
      <div class="col-sm-1"></div>
      <div class="col-sm-10">

        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-sm-3">
              <div class="img">
                <img :src="src" class="img-fluid rounded-start" alt="..." />
              </div>
            </div>
            <div class="col-sm-7">
              <div class="card-body">
                <h5 class="card-title">
                    <router-link :to="`/hotel/${this.hotel_name}`" style="text-decoration: none; color:black;font-size: 2rem;">
                    {{ this.hotel_name }}
                    </router-link>
                </h5>
                <div class="row">
                  <div class="col-3">
                    <span class="badge rounded-pill text-bg-secondary">{{this.distance_to_cc_formatted}} from centre</span><br/>
                  </div>
                  <div class="col" style="font-size: 13px; color:rgb(14, 194, 14);font-weight: bolder;text-decoration: underline;">
                    {{ this.district + ", " + this.city}}
                  </div>

                </div>
                <div class="mt-2">
                  {{(this.updated_object.Description.description).slice(0,300)}}
                  <a :href="`/hotel/${this.hotel_name}`" style="text-decoration: none;">....read more.....</a>
                </div>
              </div>
            </div>
            <div class="col-sm-2">   
                <div class="container">
                    <div class="row mt-4">
                        <!--Ratings / achievements-->
                        <div class="col-8">
                          <p  style="font-weight: bold;" class="mb-0">{{ this.review_score_word }}</p>
                          <p style="font-size:13px">{{ this.number_of_reviews +" Reviews" }}</p>
                        </div>
                        <div class="col-4 ps-0">
                          <h5>
                            <span class="badge text-bg-info">{{this.review_score}}</span>
                          </h5>
                        </div>
                    </div>
                    <div class="row mt-3">
                      <div class="col">

                        <button type="button" class="btn btn-primary mt-2" >
                          <router-link :to="`/hotel/${this.hotel_name}`" style="text-decoration: none; color:black;font-weight: bold;">
                          Details
                          </router-link>
                        </button>

                        <br/>
                        <button type="button" class="btn btn-warning mt-2" @click="book_room()">
                          <router-link :to="`/url/:name-of-hotel`" style="text-decoration: none; color:black;font-weight: bold;">
                            Book Room
                          </router-link>
                        </button>

                      </div>
                    </div>

                </div>
            </div>

          </div>
        </div>

      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>
<script>

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
      room_booked: []
    }
  },
  computed: {
    // computed
    src(){
      return this.photo_url;
    }
  },

  // start of lifecycle
  async mounted() {},

  methods: {
    // methods defined by ourselves
    book_room(){
      let hotel_name = this.hotel_name;
      (this.room_booked).push(hotel_name);
    }
  }
}
</script>

<style scoped></style>
