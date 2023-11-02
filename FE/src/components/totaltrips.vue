<template>
  <div>
    <div class="card bg-c-blue order-card">
      <div class="card-block">
        <h6 class="m-b-20">Planned Itineraries</h6>
        <h2 class="text-right"><i class="fa fa-book f-left"></i><span>{{ totalTrips }}</span></h2>
      </div>
    </div>
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

.order-card {
    color: #fff;
}

.bg-c-blue {
    background: linear-gradient(45deg,#4099ff,#73b4ff);
}

.bg-c-green {
    background: linear-gradient(45deg,#2ed8b6,#59e0c5);
}

.bg-c-yellow {
    background: linear-gradient(45deg,#FFB64D,#ffcb80);
}

.bg-c-pink {
    background: linear-gradient(45deg,#FF5370,#ff869a);
}


.card {
    border-radius: 5px;
    -webkit-box-shadow: 0 1px 2.94px 0.06px rgba(4,26,55,0.16);
    box-shadow: 0 1px 2.94px 0.06px rgba(4,26,55,0.16);
    border: none;

    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

.card .card-block {
    padding: 25px;
}

.order-card i {
    font-size: 26px;
}

.f-left {
    float: left;
}

.f-right {
    float: right;
}
</style>
  