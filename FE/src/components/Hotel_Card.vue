<template>
  <div class="container mt-4 mb-2">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">

        <div class="card mb-3" style="width: 50vw; height: 20vh">
          <div class="row g-0">
            <div class="col-md-3">
              <div class="img" style="width: 150px">
                <img :src="src" class="img-fluid rounded-start" alt="..." />
              </div>
            </div>
            <div class="col-md-7">
              <div class="card-body">
                <h5 class="card-title">
                    <router-link :to="`/hotel/${this.hotel_name}`" style="text-decoration: none; color:black;">
                    {{ this.hotel_name }}
                    </router-link>
                </h5>
                <div class="features">
                    <span class="badge rounded-pill text-bg-secondary">{{this.distance_to_cc_formatted}} from centre</span><br/>
                </div>
              </div>
            </div>
            <div class="col-md-2 pe-4">
                <div class="container">
                    <div class="row mt-5">
                        <!--Ratings / achievements-->
                        <div class="col">
                          {{ this.review_score_word }}
                        </div>
                        <div class="col">
                          {{ this.review_score }}
                        </div>
                    </div>
                    <div class="row mt-3 mb-5">
                        <!--Price-->
                        Price Per Night: {{this.price_per_night}} {{ this.currency }}
                    </div>
                    <div class="row mt-3">
                        <button type="button" class="btn btn-warning">More Info</button>
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
    currency: String
  },
  data() {
    // local repository of information
    return {}
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
    example() {}
  }
}
</script>

<style scoped></style>
