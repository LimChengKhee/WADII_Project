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
import itiData from "./data.json";

export default {
  name: 'Linechart',
  data() {
    return {
      data: itiData
    };
  },
  mounted() {
    const container = d3.select("#chartContainer");
    const containerWidth = container.node().getBoundingClientRect().width;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const width = containerWidth - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const formatTime = d3.timeFormat("%Y-%m-%d");
    const parseTime = d3.timeParse("%Y-%m-%d");// Adjust the format according to the date format you have

    this.data.forEach(d => {
      const parsedDate = parseTime(d.itinerary_data.destination.start_date);
      console.log(parsedDate);
    });

    const x = d3
      .scaleTime()
      .domain(d3.extent(this.data, d => parseTime(d.itinerary_data.destination.start_date))) // Use d3.extent to automatically set the domain
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, d => d.itinerary_data.flights[0].distance)])
      .nice() // Use .nice() to ensure that the y-axis values are presented more clearly
      .range([height, 0]);


    const line = d3
      .line()
      .x(d => x(parseTime(d.itinerary_data.destination.start_date)))
      .y(d => y(d.itinerary_data.flights[0].distance));

    g.append("path")
      .datum(this.data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 3)
      .attr("d", line);

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(formatTime) // Adjust the format as you want
        .ticks(this.data.length));

    g.append("g")
      .call(d3.axisLeft(y));

    // Style x-axis labels
    svg.selectAll(".tick text")
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("dy", "1em");
  },
};
</script>

<style scoped>
#chartContainer {
  width: 80%;
}

* {
  background-color: beige;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-weight: bold;
}
</style>
