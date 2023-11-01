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
  <div class="con mt-3 d-flex">
    <TheSideBar />
    <Content>
      <Itinerary v-if="stepStore.step == 1" />
      <Flight v-if="stepStore.step == 2" />
      <Hotel v-if="stepStore.step == 3" />
    </Content>

</div>
</div>
</template>

<style scoped>
.a{
  display: flex;
  justify-content: center;
  align-items: center;
    
}
.con {
  background-color:#fafbff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
  width:50%;
  height: 680px;

  

}

@media only screen and (min-width: 577px)and (max-width: 767px) {
  .con {
  height:830px;
  width:550px;

  background-color:#fafbff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
}
}

@media only screen and (min-width: 768px)and (max-width: 991px) {
  .con {
  height:880px;
  width:550px;

  background-color:#fafbff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
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
