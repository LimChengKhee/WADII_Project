<script setup>
import TheSideBar from '../components/TheSideBar.vue'
import Content from '../components/Content.vue';
import Itinerary from '../components/ItineraryForm.vue';
import Flight from '../components/flightform.vue';
import Hotel from '../components/hotelform.vue';

import { useStepStore } from '../store/piniaStore/step';

const stepStore = useStepStore();

</script>

<template>
  <div class="container mt-3 d-flex h-100 mx-auto">
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
  background-color:#fafbff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
}

@media only screen and (max-width: 576px) {
  .container {
  height:550px;
  width:550px;
  background-color:#fafbff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
}
}

@media only screen and (min-width: 1200px) {
  .container {
  width:1080px;
}
}
</style>
