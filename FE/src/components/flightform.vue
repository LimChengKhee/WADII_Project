<script>
import axios from 'axios'
import { mapStores } from 'pinia'
import { useItineraryStore } from '../store/piniaStore/itinerary'
import Datepicker from '@vuepic/vue-datepicker'
import { ref } from 'vue'

import countries from './countries.json'

export default {
  name: 'FlightForm',
  data() {
    return {
      mindate: '',
      startdate: '',
      enddate: '',
      cities : countries,
      value : ''
    }
  },

  computed: {
    ...mapStores(useItineraryStore)
  },
  methods: {
    getDate() {
      var today = new Date()
      return today
    },
    handleDate(e) {
      startdate = format_date(e[0])
      enddate = format_date(e[1])
      console.log(startdate, enddate)
    },
    format_date(date) {
      let mth = date.getMonth()
      let day = date.getDate()
      let year = date.getFullYear()
      return `${year}-${mth}-${day}`
    },


  },
  components: { Datepicker },
  mounted(){
  }
}
</script>

<template>
  <div>

    <div class="text-start">
      <h2 class="mt-3  d-none d-md-block">Select your flight</h2>
      <h2 class="d-md-none mt-3">Flight</h2>
      <p class="">Fill up your flight details (Optional)</p>
    </div>

    <div class="form-group ">
      <div class="form-group-label mb-2">
        <label for="name">Flight Number</label>
        <span v-if="itineraryStore.errors.flight_no">{{ itineraryStore.errors.flight_no }}</span>
      </div>
      <input
        type="text"
        id="name"
        placeholder="e.g. SQ-222"
        class="py-2 ps-3"
        v-model="itineraryStore.flight_no"
      />
    </div>

    <div class="form-group ">
      <div class="form-group-label mb-2 ">
        <!-- <label for="name">Departure</label>/ -->
        <span v-if="itineraryStore.errors.departure_date">{{
          itineraryStore.errors.departure_date
        }}</span>
      </div>
      <div class="row ">
        <div class="col-xl-6  col-lg-6 col-md-12">
          <label for="name" class="text-start mb-2">Departure</label
          ><Datepicker
            v-model="itineraryStore.departure_date"
            placeholder="Departure Date/time"
            :enable-time-picker="true"
            :text-input="true"
            input-class-name="dp-custom-input py-2 rounded-3"
            :min-date="itineraryStore.trip_date[0]"
            :start-date="itineraryStore.departure_date"
            :max-date="itineraryStore.trip_date[1]"
            :teleport="true"
            focus-start-date
          />
        </div>
        <div class="col-xl-6 col-lg-6 col-md-12">
          <label for="name" class="text-start mb-2">Country</label
          ><input
            type="text"
            id="name"
            placeholder="SIN"
            class="py-2 ps-3"
            v-model="itineraryStore.departure_country"
           
          />
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="form-group-label mb-2">
        <span v-if="itineraryStore.errors.arrival_date">{{
          itineraryStore.errors.arrival_date
        }}</span>
      </div>
      <div class="row ">
        <div class="col-xl-6 col-lg-6 col-md-12">
          <label for="name" class="text-start mb-2">Arrival</label
          ><Datepicker
            v-model="itineraryStore.arrival_date"
            placeholder="Arrival Date/time"
            :enable-time-picker="true"
            :text-input="true"
            input-class-name="dp-custom-input py-2 rounded-3"
            :min-date="itineraryStore.departure_date"
            :start-date="itineraryStore.departure_date"
            :max-date="itineraryStore.trip_date[1]"
            :teleport="true"
            focus-start-date
            
          />
        </div>
        <div class="col-xl-6 col-lg-6 col-md-12">
          <label for="name" class="text-start mb-2">Country</label
          ><input
            type="text"
            id="name"
            placeholder="SIN"
            class="py-2 ps-3"
            v-model="itineraryStore.arrival_country"
          />
        </div>
      </div>
    </div>

    <div class="form-group ">
      <div class="form-group-label mb-2">
        <label for="name">Cost</label>
        <span v-if="itineraryStore.errors.flight_cost">{{
          itineraryStore.errors.flight_cost
        }}</span>
      </div>
      <div class="row">
        <div class="col">
          <input
            type="Number"
            id="name"
            placeholder=""
            class="py-2 ps-3"
            v-model="itineraryStore.flight_cost"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

h2,p{
  font-family: 'Ubuntu';
}
@font-face {
  font-family: 'Ubuntu';
  src: url("../assets/fonts/Ubuntu-Regular.ttf") format("truetype");
}


h2 {
  font-size: 2.5rem;
  font-weight: 600;
  /* padding: 20px 0; */
}

p {
  font-size: 18px;
  color: var(--cool-gray);
}

.form-group label {
  display: block;
  font-size: 18px;
  /* margin-bottom: 10px; */
}

.form-group input {
  width: 100%;
  /* height: 50px; */
  border: 1px solid var(--cool-gray);
  border-radius: 8px;
  /* padding: 0 20px; */
  font-size: 18px;
  /* padding: 24px 16px; */
}

.form-group input:focus {
  outline: none;
  border: 1px solid var(--purplish-blue);
}

.form-group input::placeholder {
  color: var(--cool-gray);
}

.form-group input[type='email'] {
  text-transform: lowercase;
}

.form-group input[type='email']:focus {
  text-transform: lowercase;
}

.form-group-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-group-label span {
  color: var(--strawberry-red);
  font-size: 14px;
}

*{
  background-color: white;
}

@media only screen and (min-width: 768px)and (max-width: 991px) {
  .form-group{
    margin: 0px;
  }

}

@media only screen and (min-width: 577px)and (max-width: 767px) {
  .form-group{
    margin: 0px;
  }
}
@media only screen and (max-width: 576px) {
  .form-group{
    margin: 0px;
  }
}


</style>


<style lang="scss" scoped>
  :deep() {
    .dp-custom-input {
  border: 1px solid var(--cool-gray);
  
  
  &:focus {
    border: 1px solid var(--purplish-blue);
  }

  }
  
  }
</style>
