<template>
  <div class="container mt-4 mb-2">
    <div class="row h-25s">
      <div class="col-sm-1"></div>
      <div class="col-sm-10">
        <div class="card mb-3 rounded-0">
          <div class="row">
            <div class="col">
              {{this.alternateIdO }}-{{ this.flightNumberO }},{{this.carrierNameO}}
            </div>
            <div class="col">
              {{ this.departure }},{{
                this.originDisplayCode
              }},{{ this.originName }},{{ this.originCity }}
            </div>
            <div class="col">{{ this.duration }},</div>
            <div class="col">
              {{ this.arrival }},{{
                this.destinationDisplayCode
              }},{{ this.destinationName }},{{
                this.destinationCity
              }}
            </div>
            <div class="col bg-primary">
              {{this.alternateIdD }}-{{ this.flightNumberD }},{{this.carrierNameD}}
            </div>
          </div>
          <div class="row mt-5">
            <div class="col mt-5">{{ this.totalPrice }}</div>
            {{ this.tag }}
            <button class="btn btn-primary">Book</button>
          </div>
        </div>
      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>
<script>
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
    duration: String,
    arrival: String,
    destinationDisplayCode: String,
    destinationName: String,
    totalPrice: String,
    tag:Object,
  },
  data() {
    // local repository of information
    return {}
  },
  computed: {
    // computed
    src() {
      return this.photo_url
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
