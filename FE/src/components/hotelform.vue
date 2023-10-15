<template>
  <div class="container">
    <form>
        <h1>Hotel</h1>
        <div class="row">
          <input type="text" name="" id="hotelname" placeholder="Hotel">
        </div>
      <div class="row justify-content-center mt-4">
        <div class="col mb-3">
            <div class="form-group">
            <div class='input-group' id='datetimepicker1'>
                    
                <button type="button" class="input-group-addon"><i class="fa fa-calendar fa-lg"></i></button>
                    <input type='text' class="form-control"  placeholder="dd/mm/yyyy"/>
                </div>
                </div>
        </div>
        <div class="col mb-3">
            <div class="form-group">
            <div class='input-group' id='datetimepicker1'>
                    
                <button type="button" class="input-group-addon"><i class="fa fa-calendar fa-lg"></i></button>
                    <input type='text' class="form-control"  placeholder="dd/mm/yyyy"/>
                </div>
                </div>
        </div>

      </div>
      <div class="row">
        <div class="col d-flex">
            <label for="exampleFormControlInput1" class="form-label my-auto">Room</label>
            <div class="input-group">
                <span class="input-group-btn">
              <button type="button" class="btn btn-default btn-number" data-type="minus" data-field="quant[1]">
                <i class="fa fa-minus"></i>
                </button>
                </span>
                <input type="text" name="quant[1]" class="form-control input-number" value="1" min="1" max="10">
                <span class="input-group-btn">
              <button type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]">
                <i class="fa fa-plus"></i>
                </button>
                </span>
            </div>

        </div>
        <div class="col d-flex">
            <label for="exampleFormControlInput1" class="form-label my-auto">Adult</label>
            <div class="input-group">
                <span class="input-group-btn">
              <button type="button" class="btn btn-default btn-number" data-type="minus" data-field="quant[1]">
                <i class="fa fa-minus"></i>
                </button>
                </span>
                <input type="text" name="quant[1]" class="form-control input-number" value="1" min="1" max="10">
                <span class="input-group-btn">
              <button type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]">
                <i class="fa fa-plus"></i>
                </button>
                </span>
            </div>

        </div>

        <div class="col d-flex">
            <label for="exampleFormControlInput1" class="form-label my-auto">Child</label>
            <div class="input-group">
                <span class="input-group-btn">
              <button type="button" class="btn btn-default btn-number" data-type="minus" data-field="quant[1]">
                <i class="fa fa-minus"></i>
                </button>
                </span>
                <input type="text" name="quant[1]" class="form-control input-number" value="1" min="1" max="10">
                <span class="input-group-btn">
              <button type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]">
                <i class="fa fa-plus"></i>
                </button>
                </span>
            </div>

        </div>


      </div>
      <router-link to="/itinerary">
      <button type="submit" class="btn btn-primary mt-5">Submit</button>
    </router-link>
    </form>
  </div>
</template>

<script>

export default {
  name: 'hotelForm',
  data() {
    return {

    }
  },

}
</script>
