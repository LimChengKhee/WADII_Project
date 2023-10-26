<template>
  <div class="total-trips-pill">
    <h2>Total Trips Travelled: {{ totalTrips }}</h2>
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
  justify-content: center;
  align-items: center;

}
</style>
  