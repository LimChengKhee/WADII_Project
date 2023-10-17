<script setup>
import { useStepStore } from '../store/piniaStore/step';
import StepComponent from './StepComponent.vue';

const stepStore = useStepStore()

function gotostep(step){
    stepStore.setStep(step);
}

let steps = [
    {
        number: 1,
        label: "DESTINATION"
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
    <div class="sidebar">
        <StepComponent v-for="step in steps" :step="step" @click.native="gotostep(step)" :active="step.number == stepStore.step" />
    </div>
</template>

<style scoped>
.sidebar {
    height: 100%;
    width: 320px;
    padding: 60px 40px;
    background: url("../assets/img/bg-sidebar-desktop.svg");
    background-size: cover;
    border-radius: 16px;
}
</style>