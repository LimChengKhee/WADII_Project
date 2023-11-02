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
    <div class="text-start">
      <h2 class="mt-3  d-none d-md-block">Plan your Hotel</h2>
      <h2 class="d-md-none mt-3">Hotel</h2>
      <p class="">Please provide your information.(Optional)</p>
    </div>
   

    <div class="form-group mb-4">
      <div class="form-group-label mb-2">
        <label for="email">Hotel</label>
        <span v-if="itineraryStore.errors.hotel">{{ itineraryStore.errors.hotel }}</span>
      </div>
      <input type="text" id="email" class="py-2 ps-3" placeholder="" v-model="itineraryStore.hotel" />
    </div>

    <div class="form-group mb-4">
      <div class="form-group-label mb-2">
        <label for="name">Check in Dates</label>
        <span v-if="itineraryStore.errors.checkin_date">{{
          itineraryStore.errors.checkin_date
        }}</span>
      </div>
      <Datepicker
        v-model="itineraryStore.checkin_date"
        placeholder="Start Date | End Date"
        :enable-time-picker="false"
        :teleport="true"
        input-class-name="dp-custom-input py-2 rounded-3"
        :min-date="itineraryStore.trip_date[0]"
        :start-date="itineraryStore.trip_date[0]"
        :max-date="itineraryStore.trip_date[1]"
        focus-start-date
        range
      />
    </div>

    <div class="form-group mb-5">
      <div class="form-group-label mb-2">
        <label for="name">Cost</label>
        <span v-if="itineraryStore.errors.hotel_cost">{{ itineraryStore.errors.hotel_cost }}</span>
      </div>
      <div class="row">
        <div class="col">
          <input
            type="Number"
            id="name"
            placeholder=""
            class="py-2 ps-3"
            v-model="itineraryStore.hotel_cost"
          />
        </div>
      </div>
    </div>

    <div class="row mb-4 people_row">
      <div class="col d-flex">
        <div class="pt-2 pe-1">Room</div>
        <span class="input-group-btn">
            <button
              type="button"
              class="btn btn-number "
              data-type="minus"
              @click="changeCounter('-1', 'room')"
            >
              <i class="fa fa-minus"></i>
            </button>
          </span>
          <h5 class="p-1 pt-2">{{ itineraryStore.room }}</h5>
          <span class="input-group-btn">
            <button
              type="button"
              class="btn btn-number "
              data-type="plus"
              @click="changeCounter('1', 'room')"
            >
              <i class="fa fa-plus"></i>
            </button>
          </span>
        
      </div>
      <div class="col d-flex">
        <div class="pt-2 pe-1">Adult</div>
        <span class="input-group-btn">
            <button
              type="button"
              class="btn btn-number "
              data-type="minus"
              @click="changeCounter('-1', 'adult')"
            >
              <i class="fa fa-minus"></i>
            </button>
          </span>
          <h5 class="p-1 pt-2">{{ itineraryStore.child }}</h5>
          <span class="input-group-btn">
            <button
              type="button"
              class="btn btn-number  "
              data-type="plus"
              @click="changeCounter('1', 'adult')"
            >
              <i class="fa fa-plus"></i>
            </button>
          </span>
        
      </div>

      <div class="col d-flex">
        <div class="pt-2 pe-1">Child</div>
        <span class="input-group-btn">
            <button
              type="button"
              class="btn btn-number "
              data-type="minus"
              @click="changeCounter('-1', 'child')"
            >
              <i class="fa fa-minus"></i>
            </button>
          </span>
          <h5 class="p-1 pt-2">{{ itineraryStore.child }}</h5>
          <span class="input-group-btn">
            <button
              type="button"
              class="btn btn-number  "
              data-type="plus"
              @click="changeCounter('1', 'child')"
            >
              <i class="fa fa-plus"></i>
            </button>
          </span>
        
      </div>
    </div>
    <div class="dropdown small_drop" >
  <button type="button" class="btn btn-white dropdown-toggle border border-secondary w-100" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
    {{ itineraryStore.adult }} adults, {{ itineraryStore.child }} child,
    {{ itineraryStore.room }} rooms
  </button>
  <div class="dropdown-menu p-4 w-50" onsubmit="event.preventDefault()">
    <div class="mb-3">
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
    <div class="mb-3">
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
    <div class="mb-3">
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
    color:black;
}

.input-group-btn button {
  box-shadow: none;
  border:1px solid black;
}


@media only screen and (min-width: 1090px) {
    
  .small_drop{
    display:none;
  }
}

@media only screen and (max-width: 1090px) {
    .small_drop {
    display:block
}
  .people_row{
    display:none;
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