<script>
import axios from 'axios'
import { mapStores } from 'pinia'
import { useItineraryStore } from '../store/piniaStore/itinerary'
import Datepicker from '@vuepic/vue-datepicker'
import { ref } from 'vue'

import countries from './countries.json'

export default {
  name: 'ItineraryForm',
  data() {
    return {
      mindate: this.getDate(),
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
    getCountry() {
      const itineraryStore = useItineraryStore()
      var check_val = itineraryStore.arrival_country.toLowerCase()
      
      var countryList = document.getElementById(`country`)
      countryList.innerHTML = '' // clear the list of past predictions on each input
      var country = []  
      this.cities.forEach(function(obj){
        country.push(obj['country'])
      })
      var countries = country.filter((c) => c.toLowerCase().includes(check_val)).slice(0,5);

      // console.log(this.cities.filter((c) => c.toLowerCase().includes(check_val)));
      if (check_val != "" || check_val != null){
      countryList.classList.remove('d-none') // display the list
                    for (let c=0;c<countries.length;c++){
                        var listGroupItem = document.createElement('button') // creating the button for each prediction
                        var desc = countries[c]
                        listGroupItem.type = 'button'
                        listGroupItem.classList.add('list-group-item')
                        listGroupItem.classList.add('list-group-item-action')
                        listGroupItem.innerHTML = desc // displaying the place description for each item
                        listGroupItem.addEventListener('click',function(){ //making sure that upon click of the prediction, will add it to the activities
                          itineraryStore.arrival_country = countries[c]
                          countryList.classList.add('d-none') // hiding the list upon selection of prediction
                        }.bind(this)) // for eventlistener to have latest data
                        countryList.appendChild(listGroupItem) // adding the button to the lists
                    
                }
              }
      
    },
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
    isLetter(e) {
  let char = String.fromCharCode(e.keyCode); // Get the character
  if(/^[A-Za-z\']+$/.test(char)) return true; // Match with regex 
  else e.preventDefault(); // If not match, don't add to input text
},

  },
  components: { Datepicker }
}
</script>

<template>
  <div>
    <h2>Plan your itinerary</h2>
    <p>Please provide your information.</p>

    <div class="form-group">
      <div class="form-group-label">
        <label for="search">Destination</label>
        <span v-if="itineraryStore.errors.arrival_country">{{
          itineraryStore.errors.arrival_country
        }}</span>
      </div>
      <input
        type="text"
        id="search"
        placeholder="Where to?"
        v-model="itineraryStore.arrival_country"
        @input="getCountry"
      /> 
      <div class="list-group d-none" :id="'country'"></div>
      
    </div>

    <div class="form-group">
      <div class="form-group-label">
        <label for="name">Dates</label>
        <span v-if="itineraryStore.errors.trip_date">{{ itineraryStore.errors.trip_date }}</span>
      </div>
      <Datepicker
        v-model="itineraryStore.trip_date"
        placeholder="Start Date | End Date"
        :enable-time-picker="false"
        :min-date="mindate"
        range
      />
      
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
</style>
