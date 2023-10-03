<template>
    <div>
      <h2>Line Chart</h2>
      <div id="chartContainer">
        <svg></svg>
      </div>
    </div>
  </template>
  
  <script>
  import * as d3 from "d3";
  
  export default {
    name: 'Linechart',
    data() {
      return {};
    },
    mounted() {
      const container = d3.select("#chartContainer");
      const containerWidth = container.node().getBoundingClientRect().width;
      const margin = { top: 20, right: 20, bottom: 40, left: 40 };
      const width = containerWidth - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;
      const data = [
      { date: "24-Apr-07", amount: 93.24 },
        { date: "25-Apr-07", amount: 95.35 },
        { date: "26-Apr-07", amount: 98.84 },
        { date: "27-Apr-07", amount: 99.92 },
        { date: "30-Apr-07", amount: 99.8 },
        { date: "1-May-07", amount: 99.47 },
        { date: "2-May-07", amount: 100.39 },
        { date: "3-May-07", amount: 100.4 },
        { date: "4-May-07", amount: 100.81 },
        { date: "7-May-07", amount: 103.92 },
        { date: "8-May-07", amount: 105.06 },
        { date: "9-May-07", amount: 106.88 },
        { date: "10-May-07", amount: 107.34 },
      ];
  
      const svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
        
  
      const g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
      const parseTime = d3.timeParse("%d-%b-%y");
  
      const x = d3
        .scaleTime()
        .domain(d3.extent(data, d => parseTime(d.date)))
        .rangeRound([0, width]);
  
      const y = d3
        .scaleLinear()
        .domain(d3.extent(data, d => d.amount))
        .rangeRound([height, 0]);
  
      const line = d3
        .line()
        .x(d => x(parseTime(d.date)))
        .y(d => y(d.amount));
  
      g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 3)
        .attr("d", line);
  
      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
  
      // Style x-axis labels
      svg.selectAll(".tick text")
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("dy", "1em")
    },
  };
  </script>
  
  <style scoped>
  #chartContainer {
    width: 100%; /* Ensure the container takes the full width */
  }

  *{
    background-color: beige;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: bold;
  }
  </style>
  