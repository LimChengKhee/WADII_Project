<script setup>
import NavButtons from '../components/navButton.vue';
import { useStepStore } from '../store/piniaStore/step';

const stepStore = useStepStore();
</script>

<template>
    <div class="main-container px-5 pt-3 px-sm-0 w-100 position-relative">
        <div class="main-content">
            <slot ></slot>
            
        </div>
        <NavButtons v-if="stepStore.step < 4" />
        
    </div>
    
</template>

<style scoped>
.main-container {
    padding: 20px 100px;
    margin-left: 20px;
}

.main-content {
    height: 550px;
    width: 100%;
}

@media only screen and (min-width: 768px)and (max-width: 991px) {
.main-content {
    height: 750px;
    width: 100%;
}
}
@media only screen and (min-width: 577px)and (max-width: 767px) {
  .main-content {
    height: 700px;
    width: 100%;
}
}

@media only screen and (max-width: 576px) {
  .main-content {
    height: 660px;
}
.main-container {
    padding: 0px !important;
    margin-left: 20px;
}
}

</style>