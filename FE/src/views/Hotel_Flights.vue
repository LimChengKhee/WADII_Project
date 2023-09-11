<template>

  <div class="parent-container">
    <div class="header">
      <div class="container-fluid mt-5 ms-5 mb-3">
        <div class="row">
          <div class="col">
            <h2 style="text-align: center;">Search accomodation</h2>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p style="text-align: center;">
              Search for accomodation deals for {} in {}
            </p>
          </div>
        </div>
      </div>
      
      <div class="container-fluid ms-5 mb-3">
        <div class="row">
          <div class="col-4"></div>
          <div class="col-2 me-3">
            <!--inputted value in it-->
            <input type="text" value="Kuala Lumpur">
          </div>
          <div class="col-3">
            <input type="date" value="13th September 2023">
          </div>
          <div class="col-3">
            <!-- human logos in it -->
          </div>
        </div>
      </div>

      <div class="container-fluid filter-button">
        <div class="row ms-4">
          <div class="col-3"></div>
          <!--PRICE FILTER-->
          <div class="col-1 ms-4" style="padding-left: 0px;">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Price  
            </button>
            <!--slider-->
          </div>

          <!--AMENITIES FILTER-->
          <div class="col-1 mx-1" style="padding-left: 0px;">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Amenities
            </button>

            <!--SHOWER CHECKBOX-->
            <div class="dropdown-menu ps-2">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="showerCheck">
                <label class="form-check-label" for="showerCheck">
                  Shower
                </label>
              </div>

            <!--BATHROOM CHECKBOX-->
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="bathroomCheck">
                <label class="form-check-label" for="bathroomCheck">
                  Bathroom
                </label>
              </div>

              <!--CASINO CHECKBOX-->
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="casinoCheck">
                <label class="form-check-label" for="casinoCheck">
                  Casino
                </label>
              </div>
            </div>

          </div>
          
          <div class="col-1 mx-4" style="padding-left: 0px;">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Star Rating
            </button>
            <div class="dropdown-menu ps-2">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="one_star">
                <label class="form-check-label" for="one_star">
                  1 Star
                </label>
              </div>

            <!--BATHROOM CHECKBOX-->
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="two_star">
                <label class="form-check-label" for="two_star">
                  2 Star
                </label>
              </div>

              <!--CASINO CHECKBOX-->
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="three_star">
                <label class="form-check-label" for="three_star">
                  3 Star
                </label>
              </div>

                <!--CASINO CHECKBOX-->
                <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="four_star">
                <label class="form-check-label" for="four_star">
                  4 Star
                </label>
              </div>

              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="five_star">
                <label class="form-check-label" for="five_star">
                  5 Star
                </label>
              </div>
            </div>
          </div>
          
          <div class="col-1 mx-4" style="padding-left: 0px;">
            <input type="text" class="search">
              <!--Search text box-->
          
          </div>

          <!--Pending search button-->

        </div>
      </div>
      </div>
      <div class="card_section">
        <HotelCard/>
        <HotelCard/>
        <HotelCard/>
        <HotelCard/>
        <HotelCard/>
      </div>

  </div>
  
</template>
  <script>
  import HotelCard from '../components/Hotel_Card.vue';

  export default {
    name: 'Hotel_Flights',
    components: { 
      // importing components from other places
      HotelCard
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
    .banner {
      background-color: blue;
    }
  </style>
  