<template>
  <div class="container-fluid">
    <div class="row px-0">
      <div class="col-lg-3 col-md-4 col-12 p-5 sidebar">
        <img class="shadow-4-strong img-circle rounded-circle custom-width my-3" alt="profileImg"
          src="../img/steve.jpg" />
        <div class="profileInfo">
          <h5>{{ profileInfo[0].Name }}</h5>
          <p>{{ profileInfo[0].Birthday }}</p>
        </div>
      </div>
      <div class="col-lg-9 col-md-8 col-12 main-content">
        
        <div class="row keyStats">
          <div class="col-lg-3 col-md-6 col-12">
            <!-- Content for the first key stat column -->
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <!-- Content for the second key stat column -->
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <!-- Content for the third key stat column -->
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <!-- Content for the fourth key stat column -->
          </div>
        </div>
        <div class="row priChart">
          <div class="col-lg-12 px-0">
            <Linechart />
          </div>
        </div>
        <div class="row secCharts">
          <div class="col-lg-4 col-md-6 col-12">
            <Piechart/>
          </div>
          <div class="col-lg-4 col-md-6 col-12">
            <Piechart/>
          </div>
          <div class="col-lg-4 col-12">
            <Piechart/>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import * as d3 from "d3";
import crossfilter from "crossfilter"; //may remove if not needed
import Linechart from "../components/linechart.vue";
import Piechart from "../components/piechart.vue";

export default {
  name: 'Dashboard',
  components: {
    Linechart,
    Piechart,
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
      data: [
        {
          "id": "1",
          "itinerary_name": "japan-2023-10-19",
          "username": "tester2",
          "itinerary_data": {
            "destination": {
              "trip_country": "japan",
              "itinerary_date": "2023-10-19, 2023-10-20",
              "start_date": "2023-10-19",
              "end_date": "2023-10-19"
            },
            "flights": [
              {
                "flight_no": "SQ-222",
                "departure_datetime": "2023-10-19, 17:03",
                "arrival_datetime": "2023-10-19, 19:03",
                "departure_country": "singapore",
                "arrival_country": "japan",
                "duration": 100,
                "distance": 5246,
                "cost": 500,
                "currency": "sgd",
                "carbon_fp": 0,
                "notes": ""
              }
            ],
            "hotels": [
              {
                "hotelname": "Novotel Hotel",
                "check_indates": "2023-10-19, 2023-10-28",
                "start_date": "2023-10-19",
                "end_date": "2023-10-28",
                "duration": "9",
                "lengthofstay": 10,
                "cost": 500,
                "currency": "sgd",
                "rooms": 2,
                "adult": 2,
                "child": 2,
                "people": 4,
                "carbon_fp": 0,
                "img": "https://url.com",
                "notes": ""

              }
            ],
            "itinerary_days": [
              {
                "activity_name": "Resaurant",
                "activity_type": "food/activity",
                "location": "Fort Bragg, CA 959499",
                "description": "testing",
                "cords": {
                  "lat": 121.2,
                  "lng": 222
                },
                "tags": ["seafood", "steak", "bakery"],
                "ratings": {
                  "no": 2000,
                  "stars": 4.5
                },
                "cost": 200,
                "avg_price": 100,
                "img": "https://url.com",
                "carbon_fp": 0,
                "notes": ""
              }
            ]
          }
        }
      ],


      // crossfilterData: null,
      // filteredData: [],
    };
  },
  mounted() {
    // Call a function to set up Crossfilter when the component is mounted
    // this.setupCrossfilter();
  },
  methods: {
    // setupCrossfilter() {
    //   // Create a Crossfilter instance
    //   this.crossfilterData = crossfilter(this.data);

    //   // Define dimensions based on the data properties you want to filter on
    //   const dateDimension = this.crossfilterData.dimension((d) => d.date);

    //   // Store the dimension in the component's data
    //   this.dateDimension = dateDimension;

    //   // Apply an initial filter
    //   this.dateDimension.filterRange(["24-Apr-07", "27-Apr-07"]);

    //   // Initialize the filteredData
    //   this.updateFilteredData();

    //   // Listen for changes to the Crossfilter data
    //   this.crossfilterData.on("filtered", () => {
    //     this.updateFilteredData();
    //   });
    // },
    // updateFilteredData() {
    //   // Update the filteredData based on the current Crossfilter state
    //   this.filteredData = this.dateDimension.top(Infinity);
    // },

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
  
  
<style>
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
</style>
  