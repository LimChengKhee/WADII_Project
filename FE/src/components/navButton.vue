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
    let itinerary_name =  await itineraryStore.createitinerary();
    // var itinerary_name = "Eleventh"
    console.log(itinerary_name)

    
    router.push({ path: `itinerary/${userid}/${itinerary_name}` })
}
// console.log(itineraryStore)
const nextStep = () => {
    if (stepStore.step == 1) {
        console.log(itineraryStore.arrival_country);
        itineraryStore.validateAll();
        if (itineraryStore.errors.arrival_country ) {
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
        <button v-if="stepStore.step > 1" @click="stepStore.previousStep()" class="button prev-button">Go Back</button>
        <button v-if="stepStore.step < 3" @click="nextStep()" class="button next-button">Next Step</button>
        <button v-if="stepStore.step == 3" @click="nextLocation()" class="button confirm-button">Confirm</button>
    </div>
</template>

<style scoped>
.nav-buttons {
    position: relative;
    bottom: 20px;
}

.button {
    position: absolute;
    border-radius: 8px;
    border: none;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    font-size: 18px;
    bottom:-400px;
}

.prev-button {
    background-color: transparent;
    color: var(--cool-gray);
    left: 0;
}

.prev-button:hover {
    color: var(--marine-blue);
}

.next-button {
    padding: 16px 32px;
    background-color: var(--marine-blue);
    color: var(--white);
    right: 0;
}

.next-button:hover {
    opacity: 0.8;
}

.confirm-button {
    padding: 16px 32px;
    background-color: var(--purplish-blue);
    color: var(--white);
    right: 0;
}

.confirm-button:hover {
    opacity: 0.8;
}
</style>