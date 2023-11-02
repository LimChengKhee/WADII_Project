<template>
  <div>
    <div class="card bg-c-pink order-card">
      <div class="card-block">
        <h6 class="m-b-20">Days Travelled</h6>
        <h2 class="text-right"><i class="fa fa-plane f-left"></i><span>{{ totalDays }}</span></h2>
      </div>
    </div>
  </div>
</template>
  
<script>
import { useAuthStore } from '../store/piniaStore/authStore';
import { useUsersStore } from '../store/piniaStore/userStore';
import { mapStores } from 'pinia';

export default {
  name: "TotalDays",
  props: {
    dataDT: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      totalDays: 0,
    };
  },
  computed: {
    ...mapStores(useAuthStore),
    ...mapStores(useUsersStore),

  },
  watch: {
    dataDT: {
      immediate: true,
      handler(newVal, oldVal) {
        this.calculateTotalDays(newVal);

      },
    },
  },
  methods: {
    calculateTotalDays(itineraries) {
      let totalDays = 0;
      itineraries.forEach((itinerary) => {
        const start = new Date(itinerary.itinerary_data.itinerary_data.destination.start_date);
        const end = new Date(itinerary.itinerary_data.itinerary_data.destination.end_date);
        const timeDiff = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        totalDays += diffDays + 1; // including the start day
      });
      this.totalDays = totalDays;
    },
  },
};
</script>
  
<style scoped>
.order-card {
  color: #fff;
}

.bg-c-blue {
  background: linear-gradient(45deg, #4099ff, #73b4ff);
}

.bg-c-green {
  background: linear-gradient(45deg, #2ed8b6, #59e0c5);
}

.bg-c-yellow {
  background: linear-gradient(45deg, #FFB64D, #ffcb80);
}

.bg-c-pink {
  background: linear-gradient(45deg, #FF5370, #ff869a);
}


.card {
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
  box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
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
  