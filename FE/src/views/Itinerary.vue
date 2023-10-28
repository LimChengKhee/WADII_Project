<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="mt-3">  
    <div v-if="slicedArr.length > 0 && days.length > 0" class="header" style="text-align: start; font-size:20px;">
      <p class="mb-3 fw-bold">Suggested Activities</p>
    </div>

    <div v-if="slicedArr.length > 0 && days.length > 0" id="activityCarousel" class="carousel slide w-75 mb-5">
      <div class="carousel-inner position-relative">
        <div class="carousel-item" v-for='(set,index) in slicedArr' :class="{active: index == 0}">
          <div class="card-group">
              <div v-for='(activity,itemIndex) in set' class="card" style="width: 18rem;">
                  <img :src="this.$refs.dayComp.getImage(activity.photo)" height="210" class="card-img-top" alt="...">
                  <div class="card-body">
                      <h5 class="card-title fw-semibold" style="height:48px">{{activity.name}}</h5>
                      <p class="card-text" style="height:48px">Address: {{activity.address}}</p>
                      <p class="card-text">Ratings: {{activity.rating[0]}} ({{activity.rating[1]}} reviews)</p>
                      <a :href="activity.url" class=" text-dark fw-bold" target="_blank">Link</a>
                      <div class="input-group my-3">
                        <span class="input-group-text col" id="basic-addon1">Day Number</span>
                        <input type="number" min="1" max="days.length" class="col form-control" v-model="addTopAttractionDay[index][itemIndex]">
                      </div>
                      <div class="row">
                        <button v-if="addTopAttractionDay[index][itemIndex] > 0 && addTopAttractionDay[index][itemIndex] <= days.length" class="btn btn-success" type="button" @click="addAttraction(index,itemIndex)">
                            Add to Itinerary
                          </button>
                        <p v-else class="text-danger">
                          Please enter a valid day number.
                        </p>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev carousel-back-button" type="button" data-bs-target="#activityCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next carousel-next-button" type="button" data-bs-target="#activityCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="header" style="text-align: start; font-size:22px;">
        <div class="row">
            <div class="col-2 px-0">
              <p class="d-inline fw-bold"> Itinerary </p>
            </div>
            <div class="col-3 px-0" style="width:28%">
              <Datepicker id='datepick' :min-date="date[0]" :model-value="date" :clearable="false" @update:model-value="selectDate" range class="d-inline" :enable-time-picker="false"/>
            </div>
            <div class="col-2"></div>
            <div class="col-4">
              <button id='addDay' @click="addDaystoEnd(1)" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .5rem;" class="btn btn-warning d-none" type="button">
              Add day
              </button>
            </div>
            <div class="col-4"></div>
        </div>
        <div class="row mt-4">
          <div class="col-2 px-0 fs-5 fw-semibold">
            Origin location
          </div>
          <div class="col"></div>
        </div>

        <div class="row mt-2 mb-4" id="chooseOrigin">
          <template v-if="!editOrigin">
            <div class="col-3 mx-0 px-0 fs-6">
              <input class="form-control" type="text" v-model="origin" disabled>
            </div>
            <div class="col-2">
              <button type="button" class="btn" @click="editOrigin = true">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
              </button>
            </div>
          </template>
          <template v-else>
              <div class="col px-0 input-group w-50">
                <input type="text" class="form-control" v-model="origin">
                <button class="btn btn-secondary" type="button" @click="verifyLocation()" data-bs-toggle="modal" data-bs-target="#confirmLocModal">Verify location</button>
                <button class="btn btn-danger" type="button" @click="origin = baseOrigin, editOrigin = false">Cancel</button>
              </div>
              <div class="modal fade" id="confirmLocModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5">Confirm place</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="editOrigin = false"></button>
                    </div>
                    <template v-if="originResult != 'Place not found'">
                      <div class="modal-body">
                        <p class="fw-semibold text-primary">Is this the place you are looking for?</p>
                        <p><span class="fw-semibold">Name:</span> {{originResult.name}}</p>
                        <p><span class="fw-semibold">Address:</span> {{originResult.formatted_address}}</p>
                      </div>
                    </template>
                    <template v-else>
                      <div class="modal-body">
                        <p class="fw-semibold text-danger">We couldn't find the place you entered. Please try again</p>
                      </div>
                    </template>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="editOrigin = false, origin = baseOrigin">No</button>
                      <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="setOrigin">Yes</button>
                    </div>
                  </div>
                </div>
              </div>
          </template>
          <div class="col"></div>
        </div>
        <Day_Component ref="dayComp" :days="days" :date="date" :originLoc="originLoc" :originName="origin"></Day_Component>
    </div>


  </div>



</template>
  <script>
  import Day_Component from '../components/DayComponent.vue';
  import Datepicker from '../../node_modules/@vuepic/vue-datepicker';
  import '../../node_modules/@vuepic/vue-datepicker/dist/main.css';
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
        this.$refs.dayComp.findPlace(this.origin,['geometry','name','formatted_address']).then(result =>{
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
        // this.getSlicedArr()
        if (this.days.length == 0){
          let start = newDate[0];
          let end = newDate[1];
          let days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
          for (let i=0;i<days+1;i++){
              this.days.push({
                dayId: this.days.length,
                dayActivities: [],
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
            let numDays = Math.floor((startDate - newStart) / (1000 * 60 * 60 * 24));
            this.addDaystoStart(numDays)
          }else if (startDate < newStart){
            let diff = Math.floor((newStart-startDate) / (1000 * 60 * 60 * 24));
            this.removeDaysfromStart(diff)
          }
          if (endDate > newEnd){
            let diff = Math.floor((endDate-newEnd) / (1000 * 60 * 60 * 24));
            this.removeDaysfromEnd(diff)
          }else if (endDate < newEnd){
            let numDays = Math.floor((newEnd - endDate) / (1000 * 60 * 60 * 24));
            this.addDaystoEnd(numDays);
          }
        }
      },
    }
    
      }
  </script>
  
  <style scoped>
  
  </style>
  