<template>
  <div class="total-trips-pill">
    <p>Planned Itineraries</p>
    <hr class="divider">
    <p><span style="font-size:40px  ;">{{ totalTrips }}</span></p>
  </div>
</template>
  
<script>
import { useAuthStore } from '../store/piniaStore/authStore';
import { useUsersStore } from '../store/piniaStore/userStore';
import { mapStores } from 'pinia';


export default {
  name: "Totaltrips",
  props: {
    dataTT: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      totalTrips: 0,

    };
  },
  async mounted() {
    // const authStore = useAuthStore();
    // const userStore = useUsersStore();
    // this.userid = authStore.user
    // this.token = authStore.token
    // // await 
    // this.data = await userStore.getItinerary(this.userid, this.token);
    // this.totalTrips = this.data.length;
    // console.log(this.data)

  },
  computed: {
    ...mapStores(useAuthStore),
    ...mapStores(useUsersStore)
  },
  watch: {
    dataTT: {
      immediate: true,
      handler(newVal, oldVal) {
        this.totalTrips = newVal.length;
      }
    }
  },


  methods: {

  },
};


</script>
  
<style scoped>
.total-trips-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;


}
.divider{
    width: 100%;
    height: 1px;
    background-color: #000; /* Adjust the color as needed */
    margin-top: -10px;
}
</style>
  