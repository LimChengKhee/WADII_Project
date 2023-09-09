<template>
  <div class="container">  
    <div class="header row" style="text-align: start; font-size:30px;">
      <p>Suggested Activities</p>
    </div>

    <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="card-group">
            <div class="card" style="width: 18rem;">
              <img src="../assets/img/DSC00625.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Museum</h5>
                <p class="card-text">Generic description...</p>
                <a href="#" class="btn btn-primary">Add to itinerary</a>
              </div>
            </div>
            <div class="card" style="width: 18rem;">
              <img src="../assets/img/DSC00630.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Castle</h5>
                <p class="card-text">Generic description ...</p>
                <a href="#" class="btn btn-primary">Add to itinerary</a>
              </div>
            </div>
            <div class="card" style="width: 18rem;">
              <img src="../assets/img/DSC00701.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Atrium</h5>
                <p class="card-text">Generic description...</p>
                <a href="#" class="btn btn-primary">Add to itinerary</a>
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
                <a href="#" class="btn btn-primary">Add to itinerary</a>
              </div>
            </div>
            <div class="card" style="width: 18rem;">
              <img src="../assets/img/DSC00746.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Village</h5>
                <p class="card-text">Generic description...</p>
                <a href="#" class="btn btn-primary">Add to itinerary</a>
              </div>
            </div>
            <div class="card" style="width: 18rem;">
              <img src="../assets/img/DSC00757.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Fast-food Restaurant</h5>
                <p class="card-text">Generic description...</p>
                <a href="#" class="btn btn-primary">Add to itinerary</a>
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
                <a href="#" class="btn btn-primary">Add to itinerary</a>
              </div>
            </div>
            <div class="card" style="width: 18rem;">
              <img src="../assets/img/DSC00788-3.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Sunset</h5>
                <p class="card-text">Generic description...</p>
                <a href="#" class="btn btn-primary">Add to itinerary</a>
              </div>
            </div>
            <div class="card" style="width: 18rem;">
              <img src="../assets/img/DSC00601.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Colorful buildings</h5>
                <p class="card-text">Generic description...</p>
                <a href="#" class="btn btn-primary">Add to itinerary</a>
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
  </div>
      
    

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
  // import example from '@/utils/string_formatter'
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
  