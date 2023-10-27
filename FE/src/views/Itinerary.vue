<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="mt-3 container-fluid">  
    <div v-if="slicedArr.length > 0" class="header row" style="text-align: start; font-size:20px;">
      <p class="mb-3 fw-bold">Suggested Activities</p>
    </div>

    <div v-if="slicedArr.length > 0" id="activityCarousel" class="w-50 carousel slide mb-5">
      <div class="carousel-inner">
        <div class="carousel-item" v-for='(set,index) in slicedArr' :class="{active: index == 0}">
        <div class="card-group">
            <div v-for='activity of set' class="card" style="width: 18rem;">
                <img :src="getImage(activity.image)" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{activity.name}}</h5>
                    <p class="card-text">Address: {{activity.address}}</p>
                    <p class="card-text">Ratings: {{activity.rating[0]}} ({{activity.rating[1]}} reviews)</p>
                    <a :href="activity.url" class="text-dark fw-bold">Link</a>
                    <div></div>
                      <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Day Number</span>
                        <input type="text" class="form-control" v-model="addTopAttractionDay">
                        <button class="btn btn-success" type="button" id="button-addon1" @click="addAttraction(addTopAttractionDay,index,activity.name)">Add to Itinerary</button>
                        <div v-if="addTopAttractionDay<=0 || addTopAttractionDay > days.length" class="invalid-feedback">
                          Please enter a valid day number.
                        </div>
                      </div>
                </div>
            </div>
        </div>
    </div>
      </div>
        <button class="carousel-control-prev btn" type="button" data-bs-target="#activityCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#activityCarousel" data-bs-slide="next">
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
          </div>
          <div class="col-4"></div>
    </div>
      <Day_Component ref="dayComp" :allActivities="allActivities" :days="days" :date="date"></Day_Component>
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
        addTopAttractionDay: 1,
        slicedArr: []
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
      this.getSlicedArr();

      
    },
  
    methods: {
      // methods defined by ourselves
      getSlicedArr(){
        this.$refs.dayComp.getTopAttractions().then(result =>{
          this.slicedArr = [result.slice(1,3), result.slice(3,6), result.slice(6,9)]
          console.log(result.slice(1,3))
        })
      },
      addAttraction(dayNum,index,actName){
            for (let act of dayComp.topAttractions[index]){
              if (act.name == actName){
                var actNum = this.days[dayNum-1].dayActivities.length + 1
                var actDesc = act.address
                var type = act.type
                var image = act.photo
                this.days[dayNum-1].dayActivities.push({'name':actName, 'number':actNum, 'description':actDesc, 'image':image, 'type':type})
              }
            }
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
      deleteAllDays(){ // for future use
        confirm("This will delete ALL days and clear your ENTIRE itinerary! Please confirm!");
      }
    }
    
      }
  </script>
  
  <style scoped>
  
  </style>
  