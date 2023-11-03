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
  <div class="a my-auto">
  <div class="con my-3 d-flex">
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

@media only screen and (min-width: 577px)and (max-width: 767px) {
  .con {
  height:770px;
  width:550px;
  background-color:#fafbff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
}
}

@media only screen and (min-width: 768px)and (max-width: 991px) {
  .con {
  height:810px;
  width:550px;

  background-color:#fafbff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
}
}

@media only screen and (min-width: 992px)and (max-width: 1090px) {
  .con {
  width:85%;

}
}

@media only screen and (min-width: 1091px)and (max-width: 1199px) {
  .con {
  width:85%;

}
}

@media only screen and (min-width: 1256px)and (max-width: 1600px) {
  .con {
  width:70%;

}
}

@media only screen and (min-width: 1200px)and (max-width: 1256px) {
  .con {
  width:75%;

}
}


@media only screen and (max-width: 576px) {
  .con {
  height:780px;
  width:550px;

  background-color:#fafbff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
  margin:10px 10px 10px 10px;
}
}
</style>
