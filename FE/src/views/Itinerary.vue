<template>
  <div class="container-fluid">  
    <div class="header row" style="text-align: start; font-size:20px;">
      <p class="mb-3 fw-bold">Suggested Activities</p>
    </div>

    <div id="carouselExample" class="w-50 carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="card-group">
            <div class="card" style="width: 18rem;">
              <img src="../assets/img/DSC00625.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Museum</h5>
                <p class="card-text">Generic description...</p>
                <a href="#" class="btn btn-sm btn-primary">Add to itinerary</a>
              </div>
            </div>
            <div class="card" style="width: 18rem;">
              <img src="../assets/img/DSC00630.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Castle</h5>
                <p class="card-text">Generic description ...</p>
                <a href="#" class="btn btn-sm btn-primary">Add to itinerary</a>
              </div>
            </div>
            <div class="card" style="width: 18rem;">
              <img src="../assets/img/DSC00701.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Atrium</h5>
                <p class="card-text">Generic description...</p>
                <a href="#" class="btn btn-sm btn-primary">Add to itinerary</a>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="card-group">
            <div class="card" style="width: 18rem;">
              <img src="../assets/img/DSC00729.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Mountains</h5>
                <p class="card-text">Generic description...</p>
                <a href="#" class="btn btn-sm btn-primary">Add to itinerary</a>
              </div>
            </div>
            <div class="card" style="width: 18rem;">
              <img src="../assets/img/DSC00746.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Village</h5>
                <p class="card-text">Generic description...</p>
                <a href="#" class="btn btn-sm btn-primary">Add to itinerary</a>
              </div>
            </div>
            <div class="card" style="width: 18rem;">
              <img src="../assets/img/DSC00757.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Fast-food Restaurant</h5>
                <p class="card-text">Generic description...</p>
                <a href="#" class="btn btn-sm btn-primary">Add to itinerary</a>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="card-group">
            <div class="card" style="width: 18rem;">
              <img src="../assets/img/DSC00769.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Hill</h5>
                <p class="card-text">Generic description...</p>
                <a href="#" class="btn btn-sm btn-primary">Add to itinerary</a>
              </div>
            </div>
            <div class="card" style="width: 18rem;">
              <img src="../assets/img/DSC00788-3.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Sunset</h5>
                <p class="card-text">Generic description...</p>
                <a href="#" class="btn btn-sm btn-primary">Add to itinerary</a>
              </div>
            </div>
            <div class="card" style="width: 18rem;">
              <img src="../assets/img/DSC00601.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Colorful buildings</h5>
                <p class="card-text">Generic description...</p>
                <a href="#" class="btn btn-sm btn-primary">Add to itinerary</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="header" style="text-align: start; font-size:22px;">
      <p class="d-inline fw-bold">Itinerary</p>
      <!--Supposed Date picker on the right side of Itinerary-->
<!-- <date-pick class="col-6" v-model="date"> 
        <template v-slot:default="{toggle, inputValue}">
            <button @click="toggle">
                 {{ inputValue || 'Toggle calendar' }}
            </button>
        </template>
        <template v-slot:cellContent="{item}">
            <div class="vdpCellContent">
                <strong>{{ item.date.getDate() }}</strong>
            </div>
        </template>
    </date-pick> -->
      <button style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .5rem; margin-left: 520px" class="btn btn-warning d-inline" type="button">
        Add day
        </button><!--Add Day button-->
    </div>
    <div class="row">
      <p class="d-inline">
        Day 1
        <button style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .5rem; margin-left: 35rem" class="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          Expand Day
        </button>
      </p>
      <div class="collapse" id="collapseExample">
        <div class="card mb-3" style="max-width: 665px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="../assets/img/DSC00625.jpg" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body row">
                <h5 class="card-title col-10">Activity 1 - Museum</h5>
                <button type="button" class="btn btn-outline-danger col-2" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .25rem;--bs-btn-font-size: 0.6rem">Delete Activity</button>
                <p class="card-text">This museum was built in 1669 (nice)</p>
                <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
              <label for="location" class="form-label">Location</label>
              <div class="input-group mb-3">
              <span class="input-group-text" id="location"><svg width="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg></span>
              <input type="text" class="form-control" placeholder="Enter a location" aria-label="location" aria-describedby="location">
</div>
        </div>
    </div>
    </div>
    <div>
      
    </div>
    </div>

  <div class="container-fluid">
    
  </div>


    
    <!-- <div class="flight_container" style="display:flex;justify-content: center;">
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
  </div> -->
      
    

    <!-- <div class="hotel_container" style="display:flex;justify-content: center; margin-top: 50px;">
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
      

    </div> -->

</template>
  <script>
  //  import statements
  // import DatePick from '../../node_modules/vue-date-pick';
  // import '../../node_modules/vue-date-pick/dist/vueDatePick.css';
  // app.component('DatePick', DatePick)
  // import example from '@/utils/string_formatter'
  export default {
    name: 'Itinerary_Page',
    components: { 
      // importing components from other places
      // DatePick
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
      console.log(localStorage.userid)
    },
  
    methods: {
      // methods defined by ourselves
      
    },
  };
  
  </script>
  
  <style scoped>
  
  </style>
  