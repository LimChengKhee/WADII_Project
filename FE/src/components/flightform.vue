<!-- <template>
  <div class="container">
    <form @submit.prevent="handleSubmit" action="">
    <div class="row">
      <div class="col">
        <input type="text" placeholder="airline" v-model="airline" class="me-2" />
        <input type="text" placeholder="flightno" v-model="flightno" />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">

          <div class="form-group">

              <Datepicker v-model="startdate" placeholder="test" :enable-time-picker="false"/>

          </div>
        
      </div>

      <div class="col mb-3">
            <div class="form-group">
              <Datepicker v-model="enddate" :enable-time-picker="false" :min-date="startdate"/>
                </div>
        </div>
        
    </div>
    <button type="btn" class="btn btn-primary mt-5" @click = "submitAirline">Submit</button>
</form>
  </div>
</template> -->

<script>
import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import axios from 'axios'



export default {
  name: 'flightForm',
  data() {
    return {
      startdate:"",
      airline:"",
      flightno:"",
      enddate:"",
    }
  },
  components:{
    Datepicker
  },
  methods:{
    format_date(date){
      let mth = date.getMonth()
      let day = date.getDate()
      let year = date.getFullYear()
      return `${year}-${mth}-${day}`
    },
    submitAirline(){
      let flightno = this.flightno
      let airline = this.airline
      let enddate = this.format_date(this.enddate)
      let startdate = this.format_date(this.startdate)
      let user = localStorage['userid']
      let token = localStorage['token']
      let flightid = `${user}_${airline}_${flightno}`
      console.log(flightid)
      var formData = {
        flightNo : flightno,
        flightType : airline,
        flight_id : flightid,
        startdate : startdate,
        enddate : enddate,
        username:user
      }
      console.log(formData)
      var headers ={
        "Content-Type":"application/json",
        "Authorization":`Token ${token}`
      }

      axios
        .post('http://127.0.0.1:8000/api/flight/', formData,headers)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
      
      


    },
    
  }
}
</script>

<template>
  <div>

    <div class="text-start">
      <h2 class="mt-3  d-none d-md-block">Select your flight</h2>
      <h2 class="d-md-none mt-3">FLight</h2>
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
        placeholder="e.g. Stephen King"
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
        <div class="col-xl-6  col-lg-6 col-md-6">
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
        <div class="col-xl-6 col-lg-6 col-md-6">
          <label for="name" class="text-start mb-2">Departure Country</label
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
        <div class="col-xl-6 col-lg-6 col-md-6">
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
        <div class="col-xl-6 col-lg-6 col-md-6">
          <label for="name" class="text-start mb-2">Arrival Country</label
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
