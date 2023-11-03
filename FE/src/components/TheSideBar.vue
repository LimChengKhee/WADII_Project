<script setup>
import { useStepStore } from '../store/piniaStore/step';
import StepComponent from './StepComponent.vue';
import { useItineraryStore } from '../store/piniaStore/itinerary';

const stepStore = useStepStore()
const itineraryStore = useItineraryStore();

function gotostep(step){
    if (stepStore.step == 1) {
        console.log(itineraryStore.arrival_country);
        itineraryStore.validateAll();
        if (itineraryStore.errors.arrival_country ) {
            return;
        }
    }
    stepStore.setStep(step);
}

let steps = [
    {
        number: 1,
        label: "TRIP"
    },
    {
        number: 2,
        label: "FLIGHTS"
    },
    {
        number: 3,
        label: "HOTELS"
    },

];

</script>

<template>
    <div class="sidebar pt-5 ps-4 me-5 no-scroll ">
        <StepComponent class="" v-for="step in steps" :step="step" @click.native="gotostep(step)" :active="step.number == stepStore.step" />
    </div>
</template>

<style scoped>

.no-scroll{
    overflow-x: hidden; 
    overflow-y: auto;
}
.sidebar {
    padding: 10px 5px;
    /* background: url("../assets/img/bg-sidebar-desktop.svg"); */
    background: url("../assets/sidebar_img2.jpg");
    background-size: cover;
    border-radius: 16px;
    height: 100%;
    width:50%;

}



</style>