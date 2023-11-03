<template>
  <div class="container-fluid p-0">
  <div class="row">
  <div class="col-3">
      <div class="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
        <div class="sidenav-header" @click="route_link('home')">
          <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
          <img src="../assets/img/EcoBound.png" class="navbar-brand-img" style="max-height:78px!important;" alt="main_logo" >
        </div>
        <hr class="horizontal dark mt-0">
        <div class="collapse navbar-collapse w-auto" style="min-height:700px" id="sidenav-collapse-main">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" @click="route_link('itinerary')" >
                <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <i class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
                </div>
                <span class="nav-link-text ms-1">Itinerary</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" @click="route_link('dashboard')" >
                <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
                </div>
                <span class="nav-link-text ms-1">Dashboard</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link " @click="route_link('flight')" >
                <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-airplane" viewBox="0 0 16 16" style="color:red">
                    <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Zm.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1c-.213 0-.458.158-.678.599Z"/>
                  </svg>
                </div>
                <span class="nav-link-text ms-1">Flights</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link " @click="route_link('hotel')">
                <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-building" viewBox="0 0 16 16" style="color:green">
                    <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"/>
                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z"/>
                  </svg>
                </div>
                <span class="nav-link-text ms-1">Hotels</span>
              </a>
            </li>
            <button class="btn btn-primary w-80" @click="createitinerary">Create Itinerary Now</button>
          </ul>
        </div>
      </div>
    </div>
  

  <!-- dashboard components -->
  <div class="col-lg-9 ms-5 mt-3" style="width:80%;position: absolute; left:15%;">
  <div class="container-fluid ">
    <div class="row rounded-rect-container w-100 h-100">
      <div class="row">
        <h1 style="text-transform: capitalize;">{{ userid }}'s Dashboard</h1>
        <hr />
      </div>
      <div class="col-lg-12">
        <div class="parent-chart-container mt-4">
          <div class="row">
            <div class="col-lg-8 col-md-12">
              <Linechart :dataLC="fetchedData" />
            </div>
            <div class="col-lg-4 col-md-12">
              
              <div class="col-sm-12 col-lg-12 col-md-12">
                <Itidetails :dataDC="fetchedData" />  
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div class="w-100 mt-4">
                <Totaltrips :dataTT="fetchedData" />
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div class="w-100 mt-4">
                <DaysTravelled :dataDT="fetchedData" />
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div class="w-100 mt-4">
                <TotalCarbonFootprint :dataCP="fetchedData" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    </div>
</div>
  </div>
  </div>
</template>



<script>
import * as d3 from "d3";
import * as crossfilter from "crossfilter";
import { useAuthStore } from '../store/piniaStore/authStore';
import { useUsersStore } from '../store/piniaStore/userStore';
import { mapStores } from 'pinia';
import Linechart from "../components/linechart.vue";
import Piechart from "../components/piechart.vue";
import Barchart from "../components/barchart.vue";
import Totaltrips from "../components/totaltrips.vue";
import TotalCarbonFootprint from "../components/totalCarbonFootprint.vue";
import Itidetails from "../components/itidetails.vue";
import DaysTravelled from "../components/daysTravelled.vue";




export default {
  name: 'Dashboard',
  components: {
    Linechart,
    Piechart,
    Barchart,
    Totaltrips,
    TotalCarbonFootprint,
    Itidetails,
    DaysTravelled,
  },
  data() {
    return {
      fetchedData: [],
    };
  },
  async mounted() {
    const authStore = useAuthStore();
    const userStore = useUsersStore();
    this.userid = authStore.user;
    this.token = authStore.token;

    // fetches the data 
    this.fetchedData = await userStore.getItinerary(this.userid, this.token);
    console.log(this.fetchedData)

  },

  computed: {
    ...mapStores(useAuthStore),
    ...mapStores(useUsersStore)
  },

  methods: {
    route_link(path){
      var routes = { 'itinerary':`/itinerary/${this.user}/${this.iti_name}`,'hotel':`/hotel/${this.user}/${this.iti_name}`,'flight':`/flight/${this.user}/${this.iti_name}`,'home':'/','dashboard':`/dashboard` }
      var page = routes[path]
      this.$router.push(page)
    },

    createitinerary() {
      this.$router.push('/form');
    },

    getDates(startDate, stopDate) {
      Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      }
      var dateArray = new Array();
      var currentDate = startDate;
      while (currentDate <= stopDate) {
        dateArray.push(format_date(currentDate));
        currentDate = currentDate.addDays(1);
      }
      return dateArray;
    },

    format_date(date) {
      let mth = date.getMonth()
      let day = date.getDate()
      let year = date.getFullYear()
      return `${year}-${mth}-${day}`
    },


    getDataPerTrip(category, field_param, data) {
      // Input - Category: ["hotel","flight","itinerary"]
      // Return obj {"itinerary_name":[{"field_param":"value"}]}
      var result = {}

      var cat_name = category + "_" + field_param

      for (let d of data) {
        const date1 = new Date(d.itinerary_data.destination.start_date);
        const date2 = new Date(d.itinerary_data.destination.end_date);
        // var temp_obj = {}
        var temp = []

        itinerary_name = d['itinerary_name']
        if (category == "flight") {
          //field_param can include ["cost","carbon_fp","distance","duration"]
          if (field_param in d.itinerary_data.flights[0]) {


            for (let flight of d.itinerary_data.flights) {

              let temp_s = {}
              temp_s[flight.flight_no] = flight[field_param]
              temp.push(temp_s)
            }
          }
        } else if (category == "hotel") {
          //field_param can include ["cost","carbon_fp","lengthofstay","people","room"]
          if (field_param in d.itinerary_data.hotels[0]) {
            for (let hotel of d.itinerary_data.hotels) {
              let temp_s = {}
              temp_s[hotel.hotelname] = hotel[field_param]
              temp.push(temp_s)
            }
          }
        } else if (category == "itinerary") {
          //field_param can include ["cost","carbon_fp"]
          var date_range = getDates(date1, date2)
          // console.log(date_range)
          if (field_param in d.itinerary_data.itinerary_days[0]) {
            for (let [ind, date] of date_range.entries()) {
              let temp_s = {}

              temp_s["date"] = date
              temp_s[field_param] = d.itinerary_data.itinerary_days[ind][field_param]
              temp.push(temp_s)
            }
          }


        }
        result[itinerary_name] = temp


      }
      return result
    },

    getDataPerUser(all_fields, field_param, data) {
      // input : all_fields ["hotel","flight",'itinerary']
      // field_param : Any of the parameters
      // return: {"field_param":val}
      var result = {}
      temp = 0;
      for (let category of all_fields) {
        var trip_obj = getDataPerTrip(category, field_param, data);
        for (let trip in trip_obj) {
          if (trip_obj[trip] != []) {
            for (let t of trip_obj[trip]) {
              for (let val of Object.values(t)) {
                console.log(val)
                if (typeof val === 'number') {
                  temp += val
                }
              }
            }
          }
        }
      }
      result[field_param] = temp
      return result
    }
  },
  generatePieChartDetails(data) {
    const countriesCount = {};
    for (let trip of data) {
      if (trip.itinerary_data.destination && trip.itinerary_data.destination.country) {
        const country = trip.itinerary_data.destination.country;
        countriesCount[country] = (countriesCount[country] || 0) + 1;
      }
    }

    let details = 'Countries visited:';
    for (const [country, count] of Object.entries(countriesCount)) {
      details += ` ${country}: ${count},`;
    }
    // Removing the last comma
    details = details.slice(0, -1);
    return details;
  },

};
</script>
  
  
<style scoped>
.rounded-rect-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 85%;
  height: 100%;
  margin: auto;
  padding: 2%;
  background-color: white;
}


.card-waves {
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  height: 100%; /* Make sure it takes up the entire height of the parent container */
  max-width: 100%; /* Restrict the width to prevent protrusion */
  /* other properties */
}



* {
  font-weight: bold;
}

</style>
