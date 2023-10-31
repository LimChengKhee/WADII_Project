<template>
  <div class = "chart-container" ref="chartContainer">
    <h2>Pie Chart</h2>
    <svg :width="width" :height="height" ref="chart"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import { useAuthStore } from '../store/piniaStore/authStore';
import { useUsersStore } from '../store/piniaStore/userStore';
import { mapStores } from 'pinia';

export default {
  name: 'Piechart',
  props: {
    dataPC: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      width: 400,
      height: 400,
      margin: 40,
    };
  },
  mounted() {
    this.createPieChart();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  computed: {
    ...mapStores(useAuthStore),
    ...mapStores(useUsersStore),
  },
  watch: {
    dataPC: {
      immediate: true,
      handler(newVal, oldVal) {
        this.createPieChart();
      },
    },
  },
  methods: {
    handleResize() {
      this.updateDimensions();
      this.createPieChart();
    },

    updateDimensions() {
      const containerWidth = this.$refs.chart.parentElement.clientWidth;
      this.width = containerWidth;
      this.height = containerWidth;
    },

    createPieChart() {
      if (this.dataPC.length === 0) {
        console.error('Data is not available or empty.');
        return;
      }

      const countryCounts = {};
      this.dataPC.forEach((item) => {
        const country =
          item.itinerary_data?.itinerary_data?.destination?.trip_country || 'Unknown';
        if (countryCounts[country]) {
          countryCounts[country] += 1;
        } else {
          countryCounts[country] = 1;
        }
      });

      const data = Object.keys(countryCounts).map((country) => ({
        country,
        count: countryCounts[country],
      }));

      const radius = Math.min(this.width, this.height) / 2 - this.margin;

      const svg = d3.select(this.$refs.chart);

      svg.selectAll('*').remove(); // Clear existing elements before re-rendering

      const chartGroup = svg
        .append('g')
        .attr('transform', `translate(${this.width / 2},${this.height / 2})`);

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const pie = d3.pie().value((d) => d.count);

      const dataReady = pie(data);

      const innerRadius = radius * 0.5;

      const arcGenerator = d3.arc().innerRadius(innerRadius).outerRadius(radius);

      const arcs = chartGroup.selectAll('arc').data(dataReady).enter().append('g');

      arcs
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', (_, i) => color(i));

      arcs
        .append('text')
        .attr('transform', (d) => `translate(${arcGenerator.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .style('font-size', `${Math.min(this.width, this.height) / 20}px`)
        .text((d) => d.data.country);
    },
  },
};
</script>
<style scoped>
/* Add your styles here */
.chart-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.chart-container svg {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
