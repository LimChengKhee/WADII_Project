<template>
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
</template>

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
