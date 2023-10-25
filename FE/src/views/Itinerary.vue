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
          <div v-for="hotel in this.iti_data.itinerary_data.hotels" class="mt-5">
            {{ hotel.hotelname }}
            {{ hotel.check_indates }}
            {{ hotel.cost }}
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <button class="btn btn-warning" @click="addFlight">Add Flight</button>
      <div class="col">
        <div class="row">
          <div v-for="flight in this.iti_data.itinerary_data.flights" class="mt-5">
            <div class="card mb-3 rounded-0">
              <div class="row">
                <div class="col">
                  {{ flight.flight_no }}
                </div>
                <div class="col">
                  {{ flight.departure_country }}
                  {{ flight.departure_datetime }}
                </div>
                <div class="col">{{ flight.duration }}min</div>
                <div class="col">
                  COuntry{{ flight.arrival_country }}
                  ||{{ flight.arrival_datetime }}
                </div>
                <div class="col bg-primary"></div>
              </div>
              <div class="row mt-5">
                <div class="col mt-5">${{ flight.cost }}</div>

                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Activity_Component from '../components/ActivityComponent.vue'
import Day_Component from '../components/DayComponent.vue'
import Datepicker from '../../node_modules/@vuepic/vue-datepicker'
import '../../node_modules/@vuepic/vue-datepicker/dist/main.css'
import { mapStores } from 'pinia'
import { useAuthStore } from '../store/piniaStore/authStore'
import { useUsersStore } from '../store/piniaStore/userStore'
import { useItineraryStore } from '../store/piniaStore/itinerary'
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
    Datepicker
  },
  data() {
    // local repository of information
    return {
      iti_data: {
        itinerary_name: '',
        username: '',
        itinerary_data: {
          destination: {},
          flights: [{}],
          hotels: [{}],
          itinerary_days: []
        }
      },
      itinerary_date: '',
      user: '',
      iti_name: '',
      date: [],
      itemNum: 0,
      allActivities: [
        {
          id: 0,
          name: 'Museum',
          description: 'This museum was built in 1669 (nice)',
          image: 'DSC00625.jpg'
        },
        {
          id: 1,
          name: 'Castle',
          description: 'This castle was built in 1669 (nice)',
          image: 'DSC00630.jpg'
        },
        {
          id: 2,
          name: 'Atrium',
          description: 'This atrium was built in 1669 (nice)',
          image: 'DSC00701.jpg'
        },
        {
          id: 3,
          name: 'Mountains',
          description: 'These mountains were built in 1669 (nice)',
          image: 'DSC00729.jpg'
        },
        {
          id: 4,
          name: 'Village',
          description: 'This village was built in 1669 (nice)',
          image: 'DSC00746.jpg'
        },
        {
          id: 5,
          name: 'Fast-food Restaurant',
          description: 'This fast-food restaurant was built in 1669 (nice)',
          image: 'DSC00757.jpg'
        },
        {
          id: 6,
          name: 'Hill',
          description: 'This hill was built in 1669 (nice)',
          image: 'DSC00769.jpg'
        },
        {
          id: 7,
          name: 'Sunset',
          description: 'This sunset was built in 1669 (nice)',
          image: 'DSC00788-3.jpg'
        },
        {
          id: 8,
          name: 'Colorful buildings',
          description: 'These colorful buildings were built in 1669 (nice)',
          image: 'DSC00601.jpg'
        }
      ],
      days: [
        // days is an array of dayObjects, each dayObject contains dayId, and an array of activity objects (dayActivities)
      ]
    }
  },
  computed: {
    // computed
    ...mapStores(useAuthStore),
    ...mapStores(useUsersStore),
    ...mapStores(useItineraryStore)
    // activeFlight() {
    //   let res = this.iti_data.itinerary_data.flights
    //   return res == null ? []: res
    // },
  },

  // start of lifecycle
  async mounted() {
    if (this.date.length == 0) {
      const startDate = new Date()
      const endDate = new Date(new Date().setDate(startDate.getDate() + 7))
      this.date = [startDate, endDate]
    }
    const authStore = useAuthStore()
    const userStore = useUsersStore()
    const itineraryStore = useItineraryStore()
    this.user = this.$route.params.username
    this.iti_name = this.$route.params.itinerary_name

    var iti_data = await userStore.getUserItinerary(this.user, this.iti_name)
    console.log(iti_data)
    if (iti_data.itinerary_data.hotels.length == 0) {
      this.$router.push({ path: `/hotel/${this.user}/${this.iti_name}` })
    }

    let item = iti_data.itinerary_data.destination.itinerary_date.split(',')
    let date_range = [new Date(item[0]), new Date(item[1])]
    this.iti_data = iti_data
    this.selectDate(date_range)
    this.itinerary_date = date_range
    console.log(this.iti_data)


    this.$nextTick(() => this.activeFlight())
  },
  async created() {
    //  const authStore = useAuthStore();
    // const userStore = useUsersStore();
    // const itineraryStore = useItineraryStore();
    this.user = this.$route.params.username
    this.iti_name = this.$route.params.itinerary_name
    const userStore = useUsersStore()
    this.iti_data = await userStore.getUserItinerary(this.user, this.iti_name)
    // console.log(iti_data)
    // if (iti_data.itinerary_data.hotels.length == 0){

    //   this.$router.push({ path: `/hotel/${this.user}/${this.iti_name}` })
    // }

    // this.iti_data = iti_data
  },

  methods: {
    async save() {
      const userStore = useUsersStore()
      const authStore = useAuthStore()
      console.log(this.iti_data)
      this.iti_data.itinerary_data.itinerary_days = this.days
      await userStore.updateItinerary(this.iti_data, this.user, this.iti_name)
    },
    async activeFlight() {
      let res = this.iti_data.itinerary_data.flights
      console.log(res, 'func')
      return res == null ? [] : res
    },

    // methods defined by ourselves
    addDaystoEnd(numDays) {
      for (let i = 0; i < numDays; i++) {
        this.days.push({
          dayId: this.days.length,
          dayActivities: []
        })

      }
      let currentEnd = this.date[1]
      this.date[1].setDate(currentEnd.getDate() + numDays)
      // this.date[1] = new Date(this.date[1].getTime() + (i * 24 * 60 * 60 * 1000));
    },
    addDaystoStart(numDays) {
      for (let i = 0; i < numDays; i++) {
        this.days.unshift({
          dayId: 0,
          dayActivities: []
        })
      }
      for (let i = 0; i < this.days.length; i++) {
        this.days[i].dayId = i
      }
      let currentStart = this.date[0]
      this.date[0].setDate(currentStart.getDate() - numDays)
    },
    removeDaysfromStart(diff) {
      this.days.splice(0, diff)
      for (let i = 0; i < this.days.length; i++) {
        this.days[i].dayId = i
      }
      let currentStart = this.date[0]
      this.date[0].setDate(currentStart.getDate() + diff)
    },
    removeDaysfromEnd(diff) {
      this.days = this.days.slice(0, this.days.length - diff)
      let currentEnd = this.date[1]
      this.date[1].setDate(currentEnd.getDate() - diff)
    },
    selectDate(newDate) {
      if (this.days.length == 0) {
        let start = newDate[0]
        let end = newDate[1]
        let days = Math.floor((end - start) / (1000 * 60 * 60 * 24))
        for (let i = 0; i < days + 1; i++) {
          this.days.push({
            dayId: this.days.length,
            dayActivities: [],
            accoms: this.getHotels() // PLACEHOLDER!!!!
          })
        }
        let addDay = document.getElementById('addDay')
        addDay.classList.remove('d-none')
        addDay.classList.add('d-inline')
        this.date = newDate
      } else {
        let newStart = newDate[0]
        let newEnd = newDate[1]
        let startDate = this.date[0]
        let endDate = this.date[1]
        if (startDate > newStart) {
          console.log('startDate > newStart')
          let numDays = Math.floor((startDate - newStart) / (1000 * 60 * 60 * 24))
          this.addDaystoStart(numDays)
        } else if (startDate < newStart) {
          console.log('startDate < newStart')
          let diff = Math.floor((newStart - startDate) / (1000 * 60 * 60 * 24))
          this.removeDaysfromStart(diff)
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
      }
    },
    getHotels() {
      var result = []
      var hotels = this.iti_data.itinerary_data.hotels
      for (let h of hotels) {
        result.push(h.hotelname)
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
