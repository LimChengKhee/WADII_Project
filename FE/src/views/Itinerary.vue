<template>
  <div class="container-fluid">  
    <div class="header row" style="text-align: start; font-size:20px;">
      <p class="mb-3 fw-bold">Suggested Activities</p>
    </div>
    <div id="carouselExample" class="w-50 carousel slide">
      <div class="carousel-inner">
        <Activity_Component :allActivities="allActivities" :days="days"></Activity_Component>
      </div>
        <button class="carousel-control-prev btn" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
    </div>
    <div class="header" style="text-align: start; font-size:22px;">
        <div class="row">
          <div class="col-2">
            <p class="d-inline fw-bold"> Itinerary </p>
          </div>
          <div class="col-3" style="width:28%">
            <Datepicker id='datepick' :min-date="date[0]" :model-value="date" :clearable="false" @update:model-value="selectDate" range class="d-inline" :enable-time-picker="false"/>
          </div>
          <div class="col-2"></div>
          <div class="col-4">
            <button id='addDay' @click="addDaystoEnd(1)" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .5rem;" class="btn btn-warning d-none" type="button">
            Add day
            </button>
            <!-- <button @click="deleteAllDays" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .5rem;" class="btn btn-danger d-inline mx-2" type="button">
            Delete all days
            </button> -->
          </div>
          <div class="col-4"></div>
    </div>
      <Day_Component :allActivities="allActivities" :days="days" :date="date"></Day_Component>
    </div>
  </div>



</template>
  <script>
  import Activity_Component from '../components/ActivityComponent.vue';
  import Day_Component from '../components/DayComponent.vue';
  import Datepicker from '../../node_modules/@vuepic/vue-datepicker';
  import '../../node_modules/@vuepic/vue-datepicker/dist/main.css';
  import axios from 'axios'
  // import {GMapAutocomplete} from '../../node_modules/@fawmi/vue-google-maps'
  //  import statements
  // import example from '@/utils/string_formatter'
  export default {
    name: 'Itinerary_Page',
    components: { 
      // importing components from other places
      // GMapAutocomplete,
      // DatePick
      Activity_Component,
      Day_Component,
      Datepicker,
    },
    data () {
      // local repository of information
      return {      
        date : [],
        itemNum : 0,
        allActivities: [
            {
                id: 0,
                name: "Museum",
                description: "This museum was built in 1669 (nice)",
                image: "DSC00625.jpg"
            },
            {
                id: 1,
                name: "Castle",
                description: "This castle was built in 1669 (nice)",
                image: "DSC00630.jpg"
            },
            {
                id: 2,
                name: "Atrium",
                description: "This atrium was built in 1669 (nice)",
                image: "DSC00701.jpg"
            },
            {
                id: 3,
                name: "Mountains",
                description: "These mountains were built in 1669 (nice)",
                image: "DSC00729.jpg"
            },
            {
                id: 4,
                name: "Village",
                description: "This village was built in 1669 (nice)",
                image: "DSC00746.jpg"
            },
            {
                id: 5,
                name: "Fast-food Restaurant",
                description: "This fast-food restaurant was built in 1669 (nice)",
                image: "DSC00757.jpg"
            },
            {
                id: 6,
                name: "Hill",
                description: "This hill was built in 1669 (nice)",
                image: "DSC00769.jpg"
            },
            {
                id: 7,
                name: "Sunset",
                description: "This sunset was built in 1669 (nice)",
                image: "DSC00788-3.jpg"
            },
            {
                id: 8,
                name: "Colorful buildings",
                description: "These colorful buildings were built in 1669 (nice)",
                image: "DSC00601.jpg"
            }
        ],
        days: [ // days is an array of dayObjects, each dayObject contains dayId, and an array of activity objects (dayActivities)
      ],
      }
    },
    computed: {
      // computed
  
    },
  
    // start of lifecycle
    async mounted () {
      if (this.date.length == 0){
        const startDate = new Date();
        const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
        this.date = [startDate, endDate];
      }
    },
  
    methods: {
      // methods defined by ourselves
      addDay(){
        this.days.push({
          dayId: this.days.length,
          dayActivities: []
        })
      },
      populateDays(){
        let start = this.date[0];
        let end = this.date[1];
        let days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
        console.log(days)
        for (let i=0;i<days;i++){
          this.addDay();
      }
      },
    }
      // }
      // async initMap() {
      //   const { Map } = await google.maps.importLibrary("maps");
      //   var map;
      //   var service;
      //   var infowindow;
      //   var sydney = new google.maps.LatLng(-33.867, 151.195);

      //   infowindow = new google.maps.InfoWindow();

      //   map = new Map(
      //       document.getElementById('map'), {center: sydney, zoom: 15});

      //   var request = {
      //     query: 'Museum of Contemporary Art Australia',
      //     fields: ['name', 'geometry'],
      //   };

      //   var service = new google.maps.places.PlacesService(map);

      //   service.findPlaceFromQuery(request, function(results, status) {
      //     if (status === google.maps.places.PlacesServiceStatus.OK) {
      //       for (var i = 0; i < results.length; i++) {
      //         createMarker(results[i]);
      //       }
      //       map.setCenter(results[0].geometry.location);
      //     }
      //   });
      // }
      }
  </script>
  
  <style scoped>
  
  </style>
  