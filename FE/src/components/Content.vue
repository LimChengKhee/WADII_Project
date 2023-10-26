<script setup>
import NavButtons from '../components/navButton.vue';
import { useStepStore } from '../store/piniaStore/step';

const stepStore = useStepStore();
</script>

<template>
    <div class="main-container px-5 pt-3 px-sm-0 w-100 position-relative">
        <div class="main-content">
            <slot />
        </div>
        <NavButtons v-if="stepStore.step < 4" />
    </div>
</template>

<style scoped>


.main-content {
    width: 100%;
    
}
@media only screen and (min-width: 992px) {
  .main-container {
    width:560px;
    height:960px;
    margin-left:60px;
    margin-right:60px;
}
}

@media only screen and (min-width: 768px) {
  .main-container {
    height:600px;
}
}

@media only screen and (max-width: 768px) {
  .main-container {
    height:760px;
    padding-left:0px !important;

}

}


</style>