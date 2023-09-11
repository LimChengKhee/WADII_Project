<template>
  <div class="container mt-4 mb-2">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">

        <div class="card mb-3" style="width: 75vw; height: 50vh">
          <div class="row g-0">
            <div class="col-md-3">
              <img src="../assets/mbs.jpg" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-7">
              <div class="card-body">
                <h5 class="card-title">PARKROYAL Service Hotel Kuala Lumpur</h5>
                <div class="features">
                    <span class="badge rounded-pill text-bg-secondary">2.2km from City Centre</span><br/>
                    <div class="container mt-5">
                        <div class="row mt-3 mb-4">
                            <img src="../icons/bathroom.png" alt="" style="width:45px;"><div class="col-3 ps-0">
                                Bathroom</div>
                            <img src="../icons/bathroom.png" alt="" style="width:45px;"><div class="col-3 ps-0">Bathroom</div>
                        </div>

                        <div class="row mt-3 mb-4">
                            <img src="../icons/bathroom.png" alt="" style="width:45px;"><div class="col-3 ps-0">
                                Bathroom</div>
                            <img src="../icons/bathroom.png" alt="" style="width:45px;"><div class="col-3 ps-0">Bathroom</div>
                        </div>

                        <div class="row mt-3 mb-4">
                            <img src="../icons/bathroom.png" alt="" style="width:45px;"><div class="col-3 ps-0">
                                Bathroom</div>
                            <img src="../icons/bathroom.png" alt="" style="width:45px;"><div class="col-3 ps-0">Bathroom</div>
                        </div>


                    </div>
                </div>
              </div>
            </div>
            <div class="col-md-2 pe-4">
                <div class="container">
                    <div class="row mt-5">
                        <!--Ratings / achievements-->
                        Ratings / Achievements
                    </div>
                    <div class="row mt-3 mb-5">
                        <!--Price-->
                        Price
                    </div>
                    <div class="row mt-3 mb-5">
                        <!--Rating-->
                        Rating
                    </div>
                    <div class="row mt-3">
                        <button type="button" class="btn btn-warning">More Info</button>
                    </div>

                </div>
            </div>

          </div>
        </div>

      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'HotelCard',
  components: {},
  data() {
    // local repository of information
    return {}
  },
  computed: {
    // computed
  },

  // start of lifecycle
  async mounted() {},

  methods: {
    // methods defined by ourselves
    example() {}
  }
}
</script>

<style scoped></style>
