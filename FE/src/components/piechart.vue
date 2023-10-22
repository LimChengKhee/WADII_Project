<template>
  <div>
    <h2>Pie Chart</h2>
    <svg ref="chart"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import itiData from "./data.json";

export default {
  name: 'Piechart',
  data() {
    return {
      data: itiData
    };
  },
  mounted() {
    // console.log(this.data)
    this.createPieChart();
  },
  methods: {
    createPieChart() {
      // defining dimnesions of svg
      const width = 200;
      const height = 200;
      const margin = 40;
      const radius = Math.min(width, height) / 2 - margin;

      // $refs allow direct access to child elements or components
      const svg = d3.select(this.$refs.chart)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const pie = d3.pie().value(d => d.cost); // Use 'cost' as the value

      const dataReady = pie(this.data[0].itinerary_data.flights); // Use the flights data for the pie chart
      

      const arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

      const arcs = svg.selectAll('arc')
        .data(dataReady)
        .enter()
        .append('g');

      arcs.append('path')
        .attr('d', arcGenerator)
        .attr('fill', (d, i) => color(i));

      arcs.append('text')
        .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .text(d => d.data.flight_no); // Use 'flight_no' for labels
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
