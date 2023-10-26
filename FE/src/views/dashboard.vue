<template>
  <div class="container-fluid">
    <div class="row px-0">
      <div class="col-lg-3 col-md-4 col-12 p-5 sidebar">
        <img class="shadow-4-strong img-circle rounded-circle custom-width my-3" alt="profileImg"
          src="../img/steve.jpg" />
        <div class="profileInfo">
          <h5>{{ profileInfo[0].Name }}</h5>
          <p>{{ profileInfo[0].Birthday }}</p>
          <div class="d-flex align-items-center mt-2">
            <img src="../img/leaf.png" class="mr-2" alt="leafImg" style="height: 20px;" />
            <p>Carbon Footprint: {{ carbonFootprint }}</p>
          </div>
        </div>
      </div>
      <div class="col-lg-9 col-md-8 col-sm-12 main-content">
        <div class="row keyStats mb-4">
          <div class="col-lg-2 col-md-6 col-12 rounded-rectangle bg-primary text-white p-3 m-2">
            <!-- Content for the first key stat column -->
            <Totaltrips />
          </div>
          <div class="col-lg-2 col-md-6 col-12 rounded-rectangle bg-secondary text-white p-3 m-2">
            <!-- Content for the second key stat column -->
            <Totaltrips />
          </div>
          <div class="col-lg-2 col-md-6 col-12 rounded-rectangle bg-success text-white p-3 m-2">
            <!-- Content for the third key stat column -->
          </div>
          <div class="col-lg-2 col-md-6 col-12 rounded-rectangle bg-danger text-white p-3 m-2">
            <!-- Content for the fourth key stat column -->
          </div>
        </div>

        <div class="row priChart mb-4">
          <div class="col-lg-12">
            <Linechart :data="data" />
          </div>
        </div>
        <div class="row secCharts mb-4">
          <div class="col-lg-4 col-md-6 col-12">
            <Piechart />
          </div>
          <div class="col-lg-4 col-md-6 col-12">
            <!-- Content for the second secondary chart column -->
          </div>
          <div class="col-lg-4 col-12">
            <!-- Content for the third secondary chart column -->
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import * as d3 from "d3";
import * as crossfilter from "crossfilter";
import Linechart from "../components/linechart.vue";
import Piechart from "../components/piechart.vue";
import Barchart from "../components/barchart.vue";
import Totaltrips from "../components/totaltrips.vue";



export default {
  name: 'Dashboard',
  components: {
    Linechart,
    Piechart,
    Barchart,
    Totaltrips,
  },
  data() {
    return {
      profileInfo: [
        {
          id: 1,
          Name: "Mike Tyson",
          Birthday: "01 Sep 2000",
        },
      ],
      data: '',

    };
  },
  mounted() {
    },
  
  methods: {

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
};
</script>
  
  
<style scoped>
.img-circle {
  height: 200px;
  border: 2px solid black;
}

div.row img.rounded-circle.custom-width {
  width: auto;
}

.sidebar {
  background-color: black;
  text-align: center;
}

.main-content {
  background-color: grey;
}

.profileInfo {
  color: white;
}

.rounded-rectangle {
  border-radius: 15px;
  padding: 15px;
  margin: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  /* Add a drop shadow */
}
</style>
  