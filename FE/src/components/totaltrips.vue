<template>
    <div class="total-trips-pill">
      <h2>Total Trips Travelled: {{ totalTrips }}</h2>
    </div>
  </template>
  
  <script>
  import data from "./data.json";
  
  export default {
    name: "Totaltrips",
    data() {
      return {
        totalTrips: 0,
      };
    },
    mounted() {
      this.totalTrips = data.reduce((total, item) => {
        const startDate = new Date(item.itinerary_data.destination.start_date);
        const endDate = new Date(item.itinerary_data.destination.end_date);
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        const datesTraveled = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return total + datesTraveled;
      }, 0);
    },
  };
  </script>
  
  <style scoped>
  .total-trips-pill {
    display: inline-block;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border-radius: 20px;
    margin-bottom: 10px;
  }
  </style>
  