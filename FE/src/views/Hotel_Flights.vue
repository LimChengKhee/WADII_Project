<template>
  <!--Sidebar-->
  <div class="parent_container">  
    <div class="header" style="text-align: center; font-size:60px;">
      <p>Hotels & Flights</p>
    </div>
    <div class="flight_container" style="display:flex;justify-content: center;">
      <div class="card" style="width: 50rem;">
        <div class="card-body">
            <div class="row-of-buttons">
              <div class="dropdown">
            <button class="btn btn dropdown-toggle ps-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Round Trip
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Round Trip</a></li>
              <li><a class="dropdown-item" href="#">One-Way</a></li>
              <li><a class="dropdown-item" href="#">Multi-City</a></li>
            </ul>
          </div>

          <div class="row row_of_inputs">
            <div class="col-3">
              <label for="location" class="form-label">Location</label>
              <input type="text" class="form-control" id="location" placeholder="Location">
            </div>
            <div class="col-3">
              <label for="location" class="form-label">Location</label>
              <input type="text" class="form-control" id="location" placeholder="Location">
            </div>
            <div class="col-6">
              <label for="location" class="form-label">Location</label>
              <input type="text" class="form-control" id="location" placeholder="Location">
            </div>
        </div>
      </div>
    </div>
      
    
  </div>
    </div>

    <div class="hotel_container" style="display:flex;justify-content: center; margin-top: 50px;">
      <div class="card" style="width: 50rem;">
        <div class="card-body">

          <div class="row row_of_inputs">
            <div class="col-3">
              <label for="hotel" class="form-label">Hotel</label>
              <input type="text" class="form-control" id="hotel" placeholder="Hotel">
            </div>
            <div class="col-3">
              <label for="location" class="form-label">Duration</label>
              <input type="text" class="form-control" id="duration" placeholder="Duration">
            </div>
            <div class="col-6">
              <label for="people" class="form-label">People</label>
              <input type="text" class="form-control" id="people" placeholder="Number of people">
            </div>
        </div>
      </div>
    </div>
      

    </div>

   </div>
</template>
  <script>
  //  import statements
  // import example from '@/utils/string_formatter'
  import Single
  export default {
    name: 'Hotel_Flights',
    components: { 
      // importing components from other places

    },
    data () {
      // local repository of information
      return {
        example: "hello world"
      }
    },
    computed: {
      // computed
  
    },
  
    // start of lifecycle
    async mounted () {
    },
  
    methods: {
      // methods defined by ourselves
      
    },
  }
  
  </script>
  
  <style scoped>
  
  </style>
  