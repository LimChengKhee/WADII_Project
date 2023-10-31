<template>
    <div>
      <p>Days Travelled</p>
      <hr class="divider">
      <div class="chart-container"></div>
    </div>
  </template>
  
  <script>
  import * as d3 from 'd3';
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
          const country = item.itinerary_data.itinerary_data.destination.trip_country || 'Unknown';
          if (countryCounts[country]) {
            countryCounts[country] += 1;
          } else {
            countryCounts[country] = 1;
          }
        });
  
        const sortedCountries = Object.keys(countryCounts).sort((a, b) => countryCounts[b] - countryCounts[a]);
  
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
          this.drawChart();
        },
      },
    },
    methods: {
      drawChart() {
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 960 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;
  
        const svg = d3
          .select('.chart-container')
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  
        const x = d3.scaleBand().range([0, width]).padding(0.1).domain(this.accumulatedData.map((d) => d.country));
        const y = d3.scaleLinear().range([height, 0]).domain([0, d3.max(this.accumulatedData, (d) => d.count)]);
  
        svg.append('g').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(x));
  
        svg.append('g').call(d3.axisLeft(y));
  
        svg
          .selectAll('.bar')
          .data(this.accumulatedData)
          .enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('x', (d) => x(d.country))
          .attr('width', x.bandwidth())
          .attr('y', (d) => y(d.count))
          .attr('height', (d) => height - y(d.count))
          .attr('fill', 'steelblue');
      },
    },
  };
  </script>
  
  <style scoped>
  .divider {
    width: 100%;
    height: 1px;
    background-color: #000;
    /* Adjust the color as needed */
    margin-top: -10px;
  }
  .chart-container {
    width: 100%;
    height: 500px;
  }
  </style>
  