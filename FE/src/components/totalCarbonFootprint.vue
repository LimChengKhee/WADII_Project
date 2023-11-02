<template>
    <div class="card bg-c-yellow order-card">
      <div class="card-block">
        <h6 class="m-b-20">Total Carbon Footprint</h6>
        <h2 class="text-right"><i class="fa fa-leaf f-left"></i><span>{{ totalCarbonFootprint}}</span></h2>
      </div>
  </div>
</template>
  
<script>
import { useAuthStore } from '../store/piniaStore/authStore';
import { useUsersStore } from '../store/piniaStore/userStore';
import { mapStores } from 'pinia';


export default {
    name: "TotalCarbonFootprint",
    props: {
        dataCP: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {

            totalCarbonFootprint: 0,

        };
    },
    async mounted() {
        // const authStore = useAuthStore();
        // const userStore = useUsersStore();
        // this.userid = authStore.user
        // this.token = authStore.token
        // // await 
        // this.data = await userStore.getItinerary(this.userid, this.token);
        // console.log(this.getInfo(this.data, 'carbon_fp'), 'carbon')
        // this.totalCarbonFootprint = this.getInfo(this.data, 'carbon_fp');

    },
    
    watch: {
        dataCP: {
            immediate: true,
            handler(newVal, oldVal) {
                this.totalCarbonFootprint = this.getInfo(newVal, 'carbon_fp');
            }
        }
    },
    computed: {
        ...mapStores(useAuthStore),
        ...mapStores(useUsersStore)
    },


    methods: {
        
        getInfo(data, category) {
            var total = 0
            for (let itinerary of data) {
                var info = itinerary.itinerary_data.itinerary_data
                //Get total flight cost
                var flights = info.flights
                if (flights.length > 0) {
                    for (let f of flights) {
                        if (category in f) {
                            total += f[category]
                        }
                    }
                }
                //Get total hotel cost
                var hotels = info.hotels
                if (hotels.length > 0) {
                    for (let f of hotels) {
                        if (category in f) {
                            if (category == 'cost') {
                                total += f['cost'] * f['lengthofstay']
                            } else {
                                total += f[category]
                            }

                        }
                    }
                }

                //Get all iternary day cost
                var days = info.itinerary_days
                if (days.length > 0) {
                    for (let d of days) {
                        var activity_list = d.dayActivities
                        for (let a of activity_list)
                            if (category in a) {
                                total += a[category]
                            }
                    }
                }
            }
            return total
        }

    },
};


</script>
  
<style scoped>
body{
    background:#FAFAFA;
}
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
    margin-bottom: 30px;
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
  