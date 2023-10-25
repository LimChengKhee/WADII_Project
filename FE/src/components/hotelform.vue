<script setup>
import { useItineraryStore } from '../store/piniaStore/itinerary'
import Datepicker from '@vuepic/vue-datepicker'

const itineraryStore = useItineraryStore()

function changeCounter(num, cat) {
  if (cat == 'room') {
    itineraryStore.room += +num
    console.log(itineraryStore.room)
    !isNaN(itineraryStore.room) && itineraryStore.room > 0
      ? itineraryStore.room
      : (itineraryStore.room = 0)
  } else if (cat == 'adult') {
    itineraryStore.adult += +num
    console.log(itineraryStore.adult)
    !isNaN(itineraryStore.adult) && itineraryStore.adult > 0
      ? itineraryStore.adult
      : (itineraryStore.adult = 0)
  } else if (cat == 'child') {
    itineraryStore.child += +num
    console.log(itineraryStore.child)
    !isNaN(itineraryStore.child) && itineraryStore.child > 0
      ? itineraryStore.child
      : (itineraryStore.child = 0)
  }
}

function getDate() {
  var today = new Date()
  return today
}
function handleDate(e) {
  console.log(e)
  startdate = format_date(e[0])
  enddate = format_date(e[1])
  console.log(startdate, enddate)
}
function format_date(date) {
  let mth = date.getMonth()
  let day = date.getDate()
  let year = date.getFullYear()
  return `${year}-${mth}-${day}`
}
var mindate = ''
var startdate = ''
var enddate = ''
mindate = getDate()
</script>

<template>
  <div>
    <h2>Hotel</h2>
    <p>Please provide your information.(Optional)</p>

    <div class="form-group">
      <div class="form-group-label">
        <label for="email">Hotel</label>
        <span v-if="itineraryStore.errors.hotel">{{ itineraryStore.errors.hotel }}</span>
      </div>
      <input type="text" id="email" placeholder="" v-model="itineraryStore.hotel" />
    </div>

    <div class="form-group">
      <div class="form-group-label">
        <label for="name">Check in Dates</label>
        <span v-if="itineraryStore.errors.checkin_date">{{
          itineraryStore.errors.checkin_date
        }}</span>
      </div>
      <Datepicker
        v-model="itineraryStore.checkin_date"
        placeholder="Start Date | End Date"
        :enable-time-picker="false"
        
        :min-date="itineraryStore.trip_date[0]"
        :start-date="itineraryStore.trip_date[0]"
        :max-date="itineraryStore.trip_date[1]"
        focus-start-date
        range
      />
    </div>

    <div class="form-group">
      <div class="form-group-label">
        <label for="name">Cost</label>
        <span v-if="itineraryStore.errors.hotel_cost">{{ itineraryStore.errors.hotel_cost }}</span>
      </div>
      <div class="row">
        <div class="col">
          <input
            type="Number"
            id="name"
            placeholder=""
            autofocus
            v-model="itineraryStore.hotel_cost"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col d-flex">
        <label for="exampleFormControlInput1" class="form-label my-auto">Room</label>
        <div class="input-group">
          <span class="input-group-btn">
            <button
              type="button"
              class="btn btn-default btn-number"
              data-type="minus"
              @click="changeCounter('-1', 'room')"
            >
              <i class="fa fa-minus"></i>
            </button>
          </span>
          <input
            type="text"
            name="quant[1]"
            v-model="itineraryStore.room"
            class="form-control input-number px-2"
          />
          <span class="input-group-btn">
            <button
              type="button"
              class="btn btn-default btn-number"
              @click="changeCounter('1', 'room')"
            >
              <i class="fa fa-plus"></i>
            </button>
          </span>
        </div>
      </div>
      <div class="col d-flex">
        <label for="exampleFormControlInput1" class="form-label my-auto">Adult</label>
        <div class="input-group">
          <span class="input-group-btn">
            <button
              type="button"
              class="btn btn-default btn-number"
              data-type="minus"
              @click="changeCounter('-1', 'adult')"
            >
              <i class="fa fa-minus"></i>
            </button>
          </span>
          <input
            type="text"
            name="quant[1]"
            class="form-control input-number px-2"
            v-model="itineraryStore.adult"
          />
          <span class="input-group-btn">
            <button
              type="button"
              class="btn btn-default btn-number"
              data-type="plus"
              @click="changeCounter('1', 'adult')"
            >
              <i class="fa fa-plus"></i>
            </button>
          </span>
        </div>
      </div>

      <div class="col d-flex">
        <label for="exampleFormControlInput1" class="form-label my-auto">Child</label>
        <div class="input-group">
          <span class="input-group-btn">
            <button
              type="button"
              class="btn btn-default btn-number"
              data-type="minus"
              @click="changeCounter('-1', 'child')"
            >
              <i class="fa fa-minus"></i>
            </button>
          </span>
          <input
            type="text"
            name="quant[1]"
            class="form-control input-number px-2"
            v-model="itineraryStore.child"
          />
          <span class="input-group-btn">
            <button
              type="button"
              class="btn btn-default btn-number"
              data-type="plus"
              @click="changeCounter('1', 'child')"
            >
              <i class="fa fa-plus"></i>
            </button>
          </span>
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
</style>
