<template>
  <div class="container-fluid">
    <div class="header row" style="text-align: start; font-size: 20px">
      <p class="mb-3 fw-bold">Suggested Activities</p>
    </div>

    <div id="carouselExample" class="w-50 carousel slide">
      <div class="carousel-inner">
        <Activity_Component :allActivities="allActivities" :days="days"></Activity_Component>
      </div>
      <button
        class="carousel-control-prev btn"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="header mt-5" style="text-align: start; font-size: 22px">
      <div class="row">
        <div class="col-2 mb-5">
          <h2 class="d-inline fw-bold">Itinerary</h2>
        </div>
        <div class="col-3" style="width: 28%">
          <Datepicker
            id="datepick"
            :min-date="date[0]"
            :model-value="date"
            :clearable="false"
            @update:model-value="selectDate"
            v-model="itinerary_date"
            :teleport="true"
            range
            class="d-inline"
            :enable-time-picker="false"
          />
        </div>
        <div class="col-2"></div>
        <div class="col-4">
          <button
            id="addDay"
            @click="addDaystoEnd(1)"
            style="
              --bs-btn-padding-y: 0.25rem;
              --bs-btn-padding-x: 0.5rem;
              --bs-btn-font-size: 0.5rem;
            "
            class="btn btn-warning d-none"
            type="button"
          >
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
    <button class="btn btn-primary" @click="save">Save</button>
    <div class="row">
      <button class="btn btn-warning" @click="addHotel">Add Hotel</button>

      <div class="col">
        <div class="row">
          <div v-for="(hotel,ind) in this.iti_data.itinerary_data.hotels" class="mt-5">
            <p v-if="ind==0"> Recommendation based on this</p>
            {{ hotel.hotelname }}
            {{ hotel.check_indates }}
            {{ hotel.cost }}
            <button class="btn btn-danger" @click="deleteHotel(ind)">Delete</button>
          </div>
        </div>

        <div class="row mt-2 mb-4 ms-3" id="chooseOrigin">
          <template v-if="!editOrigin">
            <div class="input-group mb-3 col-6 col-sm-5 col-lg-3 pe-0 fs-6">
              <input class="form-control d-inline-block" style="max-width:350px;" type="text" v-model="origin" disabled>
              <span class="input-group-text">
                <button type="button" class="btn" @click="editOrigin = true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                  </svg>
                </button>
              </span>
            </div>
          </template>
          <template v-else>
              <div class="col px-0 input-group w-50">
                <input type="text" class="form-control" v-model="origin">
                <button class="btn btn-secondary" type="button" @click="verifyLocation" data-bs-toggle="modal" data-bs-target="#confirmLocModal">Verify location</button>
                <button class="btn btn-danger" type="button" @click="origin = baseOrigin, editOrigin = false">Cancel</button>
              </div>
              <button class="btn btn-danger" @click="deleteFlight(ind)">Delete</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
  import Day_Component from '../components/DayComponent.vue';
  import Datepicker from '../../node_modules/@vuepic/vue-datepicker';
  import '/node_modules/@vuepic/vue-datepicker/dist/main.css';
  import * as bootstrap from 'bootstrap'
  //  import statements
  // import example from '@/utils/string_formatter'
  export default {
    name: 'Itinerary_Page',
    components: { 
      // importing components from other places
      Day_Component,
      Datepicker,
    },
    data () {
      // local repository of information
      return {
        date : [],
        itemNum : 0,
        days: [ // days is an array of dayObjects, each dayObject contains dayId, and an array of activity objects (dayActivities)

      ],
        addTopAttractionDay: [[1,1,1],[1,1,1],[1,1,1]],
        slicedArr: [],
        baseOrigin: "The Fullerton Hotel Sydney",
        origin: "The Fullerton Hotel Sydney",
        editOrigin: false,
        originResult: "",
        originLoc: "",
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
      this.initialiseOrigin();
      var originElem = document.getElementById('originElement')
      new bootstrap.Tooltip(originElem)

    },
  
    methods: {
      // methods defined by ourselves
      initialiseOrigin(){
        this.$refs.dayComp.findPlace(this.origin,['geometry']).then(result => {
          if (result == "No results"){
            this.originLoc = ''
          }else{
            this.originLoc = result.geometry.location
          }
        })
      },
      setOrigin(){
        this.originLoc = this.originResult.geometry.location
        this.origin = this.originResult.name
        this.baseOrigin = this.origin
        this.editOrigin = false
      },
      verifyLocation(){
        this.originResult = ""
        this.$refs.dayComp.findPlace(this.origin,['geometry','name','formatted_address'],this.originLoc).then(result =>{
          if (result == "No results"){
              this.originResult = "Place not found"
          }else{
            this.originResult = result
          }
        })
      },
      getSlicedArr(){
        this.$refs.dayComp.getTopAttractions().then(result =>{
          setTimeout(() => {
            this.slicedArr = [result.slice(0,3), result.slice(3,6), result.slice(6,9)]
          }, 5000);
        })
      },
      addAttraction(index,itemIndex){
        var dayNum = this.addTopAttractionDay[index][itemIndex]
        this.addTopAttractionDay[index][itemIndex] = 1
        var act = this.slicedArr[index][itemIndex]
        var actName = act.name
        var actDesc = act.address
        var type = act.type
        var image = act.photo
        this.days[dayNum-1].dayActivities.push({'name':actName, 'description':actDesc, 'image':image, 'type':type})

        },
      addDaystoEnd(numDays){
        for (let i=0;i<numDays;i++){
          this.days.push({
            dayId: this.days.length,
            dayActivities: []
          })
        }
          let currentEnd = this.date[1]
          this.date[1].setDate(currentEnd.getDate() + numDays)
          // this.date[1] = new Date(this.date[1].getTime() + (i * 24 * 60 * 60 * 1000));
      },
      addDaystoStart(numDays){
        for (let i=0;i<numDays;i++){
          this.days.unshift({
            dayId: 0,
            dayActivities: []
          })
        }
        for (let i=0;i<this.days.length;i++){
          this.days[i].dayId = i
        }
        let currentStart = this.date[0]
        this.date[0].setDate(currentStart.getDate() - numDays)
      }
    },
      removeDaysfromStart(diff){
        this.days.splice(0,diff)
        for (let i=0;i<this.days.length;i++){
          this.days[i].dayId = i
        }
        let currentStart = this.date[0]
        this.date[0].setDate(currentStart.getDate() + diff)
      },
      removeDaysfromEnd(diff){
        this.days = this.days.slice(0,this.days.length-diff)
        let currentEnd = this.date[1]
        this.date[1].setDate(currentEnd.getDate() - diff)
      },
      selectDate(newDate){
        if (this.days.length == 0){
          let start = newDate[0];
          let end = newDate[1];
          let days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
          for (let i=0;i<days+1;i++){
              this.days.push({
                dayId: this.days.length,
                dayActivities: [],
                accoms: ["The Fullerton Hotel Sydney", "Sydney Harbour Marriott Hotel at Circular Quay"] // PLACEHOLDER!!!!
            })
          }
          let addDay = document.getElementById('addDay')
          addDay.classList.remove('d-none')
          addDay.classList.add('d-inline')
          this.date = newDate;
        }else{
          let newStart = newDate[0];
          let newEnd = newDate[1];
          let startDate = this.date[0];
          let endDate = this.date[1];
          if (startDate > newStart){
            console.log("startDate > newStart")
            let numDays = Math.floor((startDate - newStart) / (1000 * 60 * 60 * 24));
            this.addDaystoStart(numDays)
          }else if (startDate < newStart){
            console.log("startDate < newStart")
            let diff = Math.floor((newStart-startDate) / (1000 * 60 * 60 * 24));
            this.removeDaysfromStart(diff)
          }
          if (endDate > newEnd){
            console.log("endDate > newEnd")
            let diff = Math.floor((endDate-newEnd) / (1000 * 60 * 60 * 24));
            this.removeDaysfromEnd(diff)
          }else if (endDate < newEnd){
            console.log("endDate < newEnd")
            let numDays = Math.floor((newEnd - endDate) / (1000 * 60 * 60 * 24));
            console.log(numDays)
            this.addDaystoEnd(numDays);
          }

        }
      },
    
    getHotels() {
      var result = []
      var hotels = this.iti_data.itinerary_data.hotels
      for (let h of hotels) {
        result.push(h.hotelname)
        break
      }
      return result
    },
    deleteAllDays() {
      // for future use
      confirm('This will delete ALL days and clear your ENTIRE itinerary! Please confirm!')
    },
    addHotel() {
      this.$router.push({ path: `/hotel/${this.user}/${this.iti_name}` })
    },
    addFlight() {
      this.$router.push({ path: `/flight/${this.user}/${this.iti_name}` })
    }
  }
}


</script>

<style scoped></style>
