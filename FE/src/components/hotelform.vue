<template>
  <div class="container">
    <form>
        <h1>Hotel</h1>
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
      
      <button type="submit" class="btn btn-primary mt-5">Submit</button>
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
//   methods: {
//     calender () {
//    var bindDatePicker = function() {
// 		$(".date").datetimepicker({
//         format:'YYYY-MM-DD',
// 			icons: {
// 				time: "fa fa-clock-o",
// 				date: "fa fa-calendar",
// 				up: "fa fa-arrow-up",
// 				down: "fa fa-arrow-down"
// 			}
// 		}).find('input:first').on("blur",function () {
// 			// check if the date is correct. We can accept dd-mm-yyyy and yyyy-mm-dd.
// 			// update the format if it's yyyy-mm-dd
// 			var date = parseDate($(this).val());

// 			if (! isValidDate(date)) {
// 				//create date based on momentjs (we have that)
// 				date = moment().format('YYYY-MM-DD');
// 			}

// 			$(this).val(date);
// 		});
// 	}
   
//    var isValidDate = function(value, format) {
// 		format = format || false;
// 		// lets parse the date to the best of our knowledge
// 		if (format) {
// 			value = parseDate(value);
// 		}

// 		var timestamp = Date.parse(value);

// 		return isNaN(timestamp) == false;
//    }
   
//    var parseDate = function(value) {
// 		var m = value.match(/^(\d{1,2})(\/|-)?(\d{1,2})(\/|-)?(\d{4})$/);
// 		if (m)
// 			value = m[5] + '-' + ("00" + m[3]).slice(-2) + '-' + ("00" + m[1]).slice(-2);

// 		return value;
//    }
   
//    bindDatePicker();
//  }
//   }
}
</script>
