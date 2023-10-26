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
    <h2 class="title">Select your flight</h2>
    <p class="subtitle">Fill up your flight details (Optional)</p>

    <div class="form-group">
      <div class="form-group-label">
        <label for="name">Flight Number</label>
        <span v-if="itineraryStore.errors.flight_no">{{ itineraryStore.errors.flight_no }}</span>
      </div>
      <input
        type="text"
        id="name"
        placeholder="e.g. Stephen King"
        autofocus
        v-model="itineraryStore.flight_no"
      />
    </div>

    <div class="form-group">
      <div class="form-group-label">
        <!-- <label for="name">Departure</label>/ -->
        <span v-if="itineraryStore.errors.departure_date">{{
          itineraryStore.errors.departure_date
        }}</span>
      </div>
      <div class="row">
        <div class="col">
          <label for="name" class="text-start">Departure</label
          ><Datepicker
            v-model="itineraryStore.departure_date"
            placeholder="Departure Date/time"
            :enable-time-picker="true"
            :text-input="true"
            :min-date="itineraryStore.trip_date[0]"
            :start-date="itineraryStore.departure_date"
            :max-date="itineraryStore.trip_date[1]"
            focus-start-date
          />
        </div>
        <div class="col">
          <label for="name" class="text-start">Departure Country</label
          ><input
            type="text"
            id="name"
            placeholder="SIN"
            autofocus
            v-model="itineraryStore.departure_country"
           
          />
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="form-group-label">
        <span v-if="itineraryStore.errors.arrival_date">{{
          itineraryStore.errors.arrival_date
        }}</span>
      </div>
      <div class="row">
        <div class="col">
          <label for="name" class="text-start">Arrival</label
          ><Datepicker
            v-model="itineraryStore.arrival_date"
            placeholder="Arrival Date/time"
            :enable-time-picker="true"
            :text-input="true"
            :min-date="itineraryStore.departure_date"
            :start-date="itineraryStore.departure_date"
            :max-date="itineraryStore.trip_date[1]"
            focus-start-date
            
          />
        </div>
        <div class="col">
          <label for="name" class="text-start">Arrival Country</label
          ><input
            type="text"
            id="name"
            placeholder="SIN"
            autofocus
            v-model="itineraryStore.arrival_country"
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <div class="form-group-label">
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
            autofocus
            v-model="itineraryStore.flight_cost"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 2.5rem;
  font-weight: 600;
  padding: 20px 0;
}

p {
  font-size: 18px;
  margin-bottom: 60px;
  color: var(--cool-gray);
}

.form-group {
  margin-bottom: 40px;
}

.form-group label {
  display: block;
  font-size: 18px;
  margin-bottom: 10px;
}

.form-group input {
  width: 100%;
  height: 50px;
  border: 1px solid var(--cool-gray);
  border-radius: 8px;
  padding: 0 20px;
  font-size: 18px;
  padding: 24px 16px;
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
</style>
