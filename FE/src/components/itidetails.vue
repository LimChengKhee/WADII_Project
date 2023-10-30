<template>
    <div class="card-container">
      <div class="card">
        <div class="card-header">Top 5 Countries Visited</div>
        <div class="card-body">
          <div class="table-container">
            <table class="details-table fill-table">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in accumulatedData" :key="index">
                  <td>{{ item.country }}</td>
                  <td>{{ item.count }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '../store/piniaStore/authStore';
  import { useUsersStore } from '../store/piniaStore/userStore';
  import { mapStores } from 'pinia';
  
  export default {
    name: 'Itidetails',
    props: {
      dataDC: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      ...mapStores(useAuthStore),
      ...mapStores(useUsersStore),
      accumulatedData() {
        const countryCounts = {};
        this.dataDC.forEach((item) => {
          const country =
            item.itinerary_data.itinerary_data.destination.trip_country || 'Unknown';
          if (countryCounts[country]) {
            countryCounts[country] += 1;
          } else {
            countryCounts[country] = 1;
          }
        });
  
        const sortedCountries = Object.keys(countryCounts).sort(
          (a, b) => countryCounts[b] - countryCounts[a]
        );
  
        const top5Countries = sortedCountries.slice(0, 5);
  
        return top5Countries.map((country) => ({
          country,
          count: countryCounts[country],
        }));
      },
    },
    watch: {
      dataDC: {
        immediate: true,
        handler(newVal, oldVal) {
          console.log(newVal);
        },
      },
    },
  };
  </script>
  
  <style scoped>
  .card-container {
    width: 100%;
  }
  
  .card {
    width: 100%;
  }
  
  .table-container {
    display: flex;
    justify-content: center;
  }
  
  .fill-table {
    width: 100%;
  }
  
  .details-table {
    border-collapse: collapse;
    margin-top: 20px;
    width: 100%;
  }
  
  .details-table th,
  .details-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    width: 50%; /* Adjust the width as needed */
  }
  
  .details-table th {
    background-color: #f2f2f2;
  }
  </style>
  