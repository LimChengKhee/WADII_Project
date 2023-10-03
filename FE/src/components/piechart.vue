<template>
    <div>
      <h2>Pie Chart</h2>
      <svg ref="chart"></svg>
    </div>
  </template>
  
  <script>
  import * as d3 from "d3";
  
  export default {
    name: 'Piechart',
    data() {
      return {
        data: [
          { date: "24-Apr-07", amount: 93.24 },
          { date: "25-Apr-07", amount: 95.35 },
          { date: "26-Apr-07", amount: 98.84 },
        ],
      };
    },
    mounted() {
      this.createPieChart();
    },
    methods: {
      createPieChart() {
        const width = 200;
        const height = 200;
        const radius = Math.min(width, height) / 2;
  
        const svg = d3.select(this.$refs.chart)
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', `translate(${width / 2},${height / 2})`);
  
        const color = d3.scaleOrdinal()
          .domain(this.data.map(d => d.date)) // Use 'date' as the domain
          .range(d3.schemeCategory10);
  
        const pie = d3.pie()
          .value(d => d.amount); // Use 'amount' as the value
  
        const dataReady = pie(this.data);
  
        const arcGenerator = d3.arc()
          .innerRadius(0)
          .outerRadius(radius);
  
        const arcs = svg.selectAll('arc')
          .data(dataReady)
          .enter()
          .append('g');
  
        arcs.append('path')
          .attr('d', arcGenerator)
          .attr('fill', d => color(d.data.date)); // Use 'date' for color
  
        arcs.append('text')
          .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
          .attr('text-anchor', 'middle')
          .text(d => d.data.date); // Use 'date' for labels
      },
    },
  };
  </script>
  

<style>
</style>
  