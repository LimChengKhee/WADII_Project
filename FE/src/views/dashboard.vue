<template>
  <div class="container-fluid">
    <div class="row rounded-rect-container align-items-start">
      <div class="row float-left">
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
              <button class="btn btn-primary w-100 " @click="createitinerary">Create Itinerary Now</button>
              <div class="card card-waves col-sm-12 col-lg-12 col-md-12 mt-4" style="height: 90%">
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

  },

  computed: {
    ...mapStores(useAuthStore),
    ...mapStores(useUsersStore)
  },

  methods: {
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

}


* {
  font-weight: bold;
}

</style>
