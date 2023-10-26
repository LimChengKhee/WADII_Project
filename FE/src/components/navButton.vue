<script setup>
import { useStepStore } from '../store/piniaStore/step';
import { useItineraryStore } from '../store/piniaStore/itinerary';
import { useRouter } from 'vue-router';
import axios from 'axios';
const router = useRouter()


const stepStore = useStepStore();
const itineraryStore = useItineraryStore();
var userid = localStorage.getItem('userid')
var token = localStorage.getItem('token')

 async function nextLocation(){
    itineraryStore.validateH()
    if (itineraryStore.errors.hotel  ) {
            return;
        }
    let itinerary_name =  await itineraryStore.createitinerary();
    // var itinerary_name = "Eleventh"
    console.log(itinerary_name)
    console.log(itineraryStore.flag.hotel,'TESTING TO SEE IF ')
    if (!itineraryStore.flag.hotel){
        router.push({ path: `/hotel/${userid}/${itinerary_name}` })
    }else{
        router.push({ path: `itinerary/${userid}/${itinerary_name}` })
    }
    // 
}
// console.log(itineraryStore)
const nextStep = () => {
    if (stepStore.step == 1) {
        console.log(itineraryStore.arrival_country);
        itineraryStore.validateAll();
        if (itineraryStore.errors.arrival_country|| itineraryStore.errors.trip_date ) {
            return;
        }
    }

    // if (stepStore.step == 2) {
    //     if (!priceStore.validate()) {
    //         return;
    //     }
    // }

    stepStore.nextStep();
};

</script>

<template>
    <div class="nav-buttons">
        <button v-if="stepStore.step > 1" @click="stepStore.previousStep()" class="button prev-button float-start  d-flex flex-row mt-auto mx-auto">Go Back</button>
        <button v-if="stepStore.step < 3" @click="nextStep()" class="button next-button float-end">Next Step</button>
        <button v-if="stepStore.step == 3" @click="nextLocation()" class="button confirm-button float-end">Confirm</button>
    </div>
</template>

<style scoped>

.button {
    /* position: absolute; */
    border-radius: 8px;
    border: none;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    font-size: 18px;
    /* bottom:-400px; */
}

.prev-button {
    background-color: transparent;
    color: var(--cool-gray);
    /* left: 0; */
}

.prev-button:hover {
    color: var(--marine-blue);
}

.next-button {
    padding: 16px 32px;
    background-color: var(--marine-blue);
    color: var(--white);
    /* right: 0; */
}

.next-button:hover {
    opacity: 0.8;
}

.confirm-button {
    padding: 16px 32px;
    background-color: var(--purplish-blue);
    color: var(--white);
    /* right: 0; */
}

.confirm-button:hover {
    opacity: 0.8;
}
@media only screen and (min-width: 992px) {

    .prev-button{
    position:absolute;
    bottom: 0%;
    left:25%;
  }
  .next-button{
    position:absolute;
    bottom: 0%;
    right:7%;
  }
  .confirm-button{
    position:absolute;
    bottom: 0%;
    right:7%;
  }
}

@media only screen and (min-width: 768px) {
    .prev-button{
    position:absolute;
    bottom: 0%;
    left:25%;
  }
  .next-button{
    position:absolute;
    bottom: 0%;
    right:7%;
  }
  .confirm-button{
    position:absolute;
    bottom: 0%;
    right:7%;
  }
}

@media only screen and (min-width: 576px) {

  .prev-button{
    position:absolute;
    bottom: 0%;
    left:-6%;
  }
  .next-button{
    position:absolute;
    bottom: 0%;
    right:0%;
  }
  .confirm-button{
    position:absolute;
    bottom: 0%;
    right:7%;
  }
}

@media only screen and (max-width: 576px) {

.prev-button{
  position:absolute;
  bottom: 0%;
  left:-6%;
}
.next-button{
  position:absolute;
  bottom: 0%;
  right:0%;
}
.confirm-button{
  position:absolute;
  bottom: 0%;
  right:7%;
}
}


</style>