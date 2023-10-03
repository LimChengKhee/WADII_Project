<template>
  <div class="container">
    <form action="">
    <div class="row">
      <div class="col">
        <input type="text" placeholder="Airline" class="me-2" />
        <input type="text" placeholder="Flight no" />
      </div>
    </div>
    <div class="row">
      <div class="col">

          <div class="form-group">
            <div class="input-group" id="datetimepicker1">
              <button type="button" class="input-group-addon">
                <i class="fa fa-calendar fa-lg"></i>
              </button>
              <input type="text" class="form-control" placeholder="Depart dd/mm/yyyy" />
            </div>
          </div>
        
      </div>

      <div class="col mb-3">
            <div class="form-group">
            <div class='input-group' id='datetimepicker1'>
                    
                <button type="button" class="input-group-addon"><i class="fa fa-calendar fa-lg"></i></button>
                    <input type='text' class="form-control"  placeholder="Arrival dd/mm/yyyy"/>
                </div>
                </div>
        </div>
        <button type="submit" class="btn btn-primary mt-5">Submit</button>
    </div>
</form>
  </div>
</template>

<script>
export default {
  name: 'flightForm',
  data() {
    return {}
  }
}
</script>
