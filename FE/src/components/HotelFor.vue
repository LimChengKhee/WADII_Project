<script setup>
import { useItineraryStore } from '../store/piniaStore/itinerary';
import Datepicker from '@vuepic/vue-datepicker';

const itineraryStore = useItineraryStore();
function getDate(){
        var today = new Date();
        return today;
      };
function handleDate(e){
    console.log(e)
        startdate = format_date(e[0])
        enddate =format_date(e[1])
        console.log(startdate,enddate);
      };
function format_date(date){
        let mth = date.getMonth();
        let day = date.getDate();
        let year = date.getFullYear();
        return `${year}-${mth}-${day}`;
      };
var mindate = "";
var startdate = "";
var enddate = ""
mindate = getDate();

</script>

<template>
    <div>
        <h2>Hotel</h2>
        <p>Please provide your information.</p>


        <div class="form-group">
            <div class="form-group-label">
                <label for="email">Hotel</label>
                <span v-if="itineraryStore.errors.hotel">{{ itineraryStore.errors.hotel }}</span>
            </div>
            <input type="text" id="email" placeholder="" v-model="itineraryStore.hotel" />
        </div>

        <div class="form-group">
            <div class="form-group-label">
                <label for="name">Check in Dates</label>
                <span v-if="itineraryStore.errors.checkin_date">{{ itineraryStore.errors.checkin_date }}</span>
            </div>
            <Datepicker v-model="itineraryStore.checkin_date" placeholder="Start Date | End Date" :enable-time-picker="false"   :min-date="mindate"  range @update:model-value="handleDate"/>
        </div>

        <div class="form-group">
            <div class="form-group-label">
                <label for="name">Cost</label>
                <span v-if="itineraryStore.errors.hotel_cost">{{ itineraryStore.errors.hotel_cost }}</span>
            </div>
            <div class="row">
                
                <div class="col"><input type="Number" id="name" placeholder="" autofocus v-model="itineraryStore.hotel_cost" /></div>
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
                <input type="text" name="quant[1]" v-model="itineraryStore.room" class="form-control input-number" min="1" max="10">
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
                <input type="text" name="quant[1]" class="form-control input-number" v-model="itineraryStore.adult" min="1" max="10">
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
                <input type="text" name="quant[1]" class="form-control input-number" v-model="itineraryStore.child" min="1" max="10">
                <span class="input-group-btn">
              <button type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]">
                <i class="fa fa-plus"></i>
                </button>
                </span>
            </div>

        </div>

    </div>


    </div>
</template>

<style scoped>
h2 {
    font-size: 2.5rem;
    font-weight: 600;
    padding: 20px 0;
}

p {
    font-size: 18px;
    margin-bottom: 60px;
    color: var(--cool-gray);
}

.form-group {
    margin-bottom: 40px;
}

.form-group label {
    display: block;
    font-size: 18px;
    margin-bottom: 10px;
}

.form-group input {
    width: 100%;
    height: 50px;
    border: 1px solid var(--cool-gray);
    border-radius: 8px;
    padding: 0 20px;
    font-size: 18px;
    padding: 24px 16px;
}

.form-group input:focus {
    outline: none;
    border: 1px solid var(--purplish-blue);
}

.form-group input::placeholder {
    color: var(--cool-gray);
}

.form-group input[type="email"] {
    text-transform: lowercase;
}

.form-group input[type="email"]:focus {
    text-transform: lowercase;
}

.form-group-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.form-group-label span {
    color: var(--strawberry-red);
    font-size: 14px;
}
</style>