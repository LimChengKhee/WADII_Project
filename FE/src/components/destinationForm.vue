<template>
    <div class="container">
      <form @submit.prevent="handleSubmit" action="">
      <div class="row">
        <div class="col">
          <input type="text" placeholder="Where to " class="me-2" />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
  
            <div class="form-group">
  
                <Datepicker v-model="date" placeholder="test" :enable-time-picker="false"   :min-date="mindate"  range @update:model-value="handleDate"/>
  
            </div>
          
        </div>
          
      </div>
      <button type="btn" class="btn btn-primary mt-5" @click = "submitAirline">Submit</button>
  </form>
    </div>
  </template>
<script>
import Datepicker from '@vuepic/vue-datepicker';
import "@vuepic/vue-datepicker/dist/main.css";
// import axios from 'axios';
export default {
    name: 'destinationForm',
    data() {
      return {
        mindate:this.getDate(),
        airline:"",
        flightno:"",
        enddate:"",
        date:"",
        startdate:"",
        enddate:"",
      }
    },
    components:{
      Datepicker
    },
    methods:{
      format_date(date){
        let mth = date.getMonth();
        let day = date.getDate();
        let year = date.getFullYear();
        return `${year}-${mth}-${day}`;
      },
      handleDate(e){
        this.startdate = this.format_date(e[0])
        this.enddate = this.format_date(e[1])
        console.log(this.startdate,this.enddate);
      },
      getDate(){
        var today = new Date();
        return today;
      },

    }
  }
  </script>