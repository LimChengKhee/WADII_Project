<template>
    <div class="total-trips-pill">
        <p>Total Carbon Footprint:</p>
        <p><span style="font-size:40px;">{{ totalCarbonFootprint }}</span></p>
        
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
        updateChart() {
        // Clear the existing chart
        d3.select("#chart-container").selectAll("*").remove();

        // Re-create the chart with updated data
        const chart = dc.barChart("#chart-container");
        chart
          .dimension(this.dimension)
          .group(this.dimension.group().reduceSum((d) => d.carbon_fp)) // Replace with your actual metric
          .x(d3.scaleBand())
          .xUnits(dc.units.ordinal)
          .render();

        // Call renderAll to render all charts
        dc.renderAll();
      },
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
.total-trips-pill {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin:0;

}
</style>
  