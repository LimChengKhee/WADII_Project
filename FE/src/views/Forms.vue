<script setup>
import TheSideBar from '../components/TheSideBar.vue'
import Content from '../components/Content.vue';
import Itinerary from '../components/ItineraryForm.vue';
import Flight from '../components/FlightForm.vue';
import Hotel from '../components/HotelForm.vue';
// import AddOns from '../components/AddOns.vue';
// import Summary from '../components/Summary.vue';
// import ThankYou from '../components/ThankYou.vue';

import { useStepStore } from '../store/piniaStore/step';

const stepStore = useStepStore();

</script>

<template>
  <div class="container mt-5 d-flex h-100">
    <TheSideBar />
    <Content>
      <Itinerary v-if="stepStore.step == 1" />
      <Flight v-if="stepStore.step == 2" />
      <Hotel v-if="stepStore.step == 3" />
    </Content>
  </div>
</template>

<style scoped>
.container {
  /* width: 1080px;
  height: 1080px; */
  background-color: hsl(231, 100%, 99%);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
}
</style>
