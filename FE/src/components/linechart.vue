<template>
  <div>
    <h2>Line Chart</h2>
    <div id="chartContainer">
      <svg ref="chart"></svg>
      <button @click="test">test</button>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { useAuthStore } from '../store/piniaStore/authStore';
import { useUsersStore } from '../store/piniaStore/userStore';
import { mapStores } from 'pinia';

export default {
  name: 'Linechart',
  data() {
    return {
      data: '',
      screenWidth: window.innerWidth * 0.8, // Adjust the multiplier to set the desired width proportion
    };
  },

  async mounted() {
    const authStore = useAuthStore();
    const userStore = useUsersStore();
    this.userid = authStore.user
    this.token = authStore.token
    // await 
    this.data = await userStore.getItinerary(this.userid, this.token);
    console.log(this.data)
    this.drawChart();
    window.addEventListener('resize', this.handleResize);

  },
  computed: {
    ...mapStores(useAuthStore),
    ...mapStores(useUsersStore)
  },


  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth * 0.8; // Adjust the multiplier to set the desired width proportion
      this.drawChart();
    },
    drawChart() {
      this.data.sort((a, b) => {
      const dateA = new Date(a.itinerary_data.itinerary_data.destination.start_date);
      const dateB = new Date(b.itinerary_data.itinerary_data.destination.start_date);
      return dateA - dateB;
    });
      const container = d3.select("#chartContainer");
      container.select("svg").remove();
      const containerWidth = container.node().getBoundingClientRect().width;
      const margin = { top: 20, right: 60, bottom: 40, left: 60 };
      const width = Math.min(this.screenWidth, containerWidth) - margin.left - margin.right; // Use the minimum value to prevent exceeding the screen width
      const height = 500 - margin.top - margin.bottom;

      const svg = d3.select("#chartContainer")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      const defs = svg.append("defs");

      const gradient = defs.append("linearGradient")
        .attr("id", "svgGradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#ff7e5f"); // Adjust the color as per your preference

      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#feb47b"); // Adjust the color as per your preference

      svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .style("fill", "url(#svgGradient)");


      const g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const formatTime = d3.timeFormat("%Y-%m-%d");
      const parseTime = d3.timeParse("%Y-%m-%d"); // Adjust the format according to the date format you have

      const x = d3
        .scaleTime()
        .domain([
          d3.min(this.data, d => parseTime(d.itinerary_data.itinerary_data.destination.start_date)),
          d3.max(this.data, d => parseTime(d.itinerary_data.itinerary_data.destination.start_date))
        ])
        .range([0, width]);

      const y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(this.data, d => d.itinerary_data.itinerary_data.hotels[0].cost) * 1.2 // Adjust the multiplier to expand the y-axis
        ])
        .nice()
        .range([height, 0]);

      const line = d3
        .line()
        .x(d => x(parseTime(d.itinerary_data.itinerary_data.destination.start_date)))
        .y(d => y(d.itinerary_data.itinerary_data.hotels[0].cost));

      g.append("path")
        .datum(this.data)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 3)
        .attr("d", line);

      g.selectAll("dot")
        .data(this.data)
        .enter()
        .append("circle")
        .attr("cx", d => x(parseTime(d.itinerary_data.itinerary_data.destination.start_date)))
        .attr("cy", d => y(d.itinerary_data.itinerary_data.hotels[0].cost))
        .attr("r", 5)
        .attr("fill", "steelblue")
        .on("mouseover", function (event, d) {
          const tooltip = d3.select("#chartContainer")
            .append("div")
            .style("position", "absolute")
            .style("background", "#f4f4f4")
            .style("padding", "5px")
            .style("border", "1px solid #333")
            .text(`Date: ${d.itinerary_data.itinerary_data.destination.start_date}, cost: ${d.itinerary_data.itinerary_data.hotels[0].cost}`)
            .style("left", event.pageX + "px")
            .style("top", event.pageY + "px");

          // Dotted lines
          const xPos = x(parseTime(d.itinerary_data.itinerary_data.destination.start_date));
          const yPos = y(d.itinerary_data.itinerary_data.hotels[0].cost);

          g.append("line")
            .attr("class", "x-hover-line hover-line")
            .attr("x1", xPos)
            .attr("y1", yPos)
            .attr("x2", xPos)
            .attr("y2", height)
            .style("stroke", "black")
            .style("stroke-dasharray", "3,3");

          g.append("line")
            .attr("class", "y-hover-line hover-line")
            .attr("x1", 0)
            .attr("y1", yPos)
            .attr("x2", xPos)
            .attr("y2", yPos)
            .style("stroke", "black")
            .style("stroke-dasharray", "3,3");
        })
        .on("mouseout", function () {
          d3.select("#chartContainer").select("div").remove();
          d3.select(".x-hover-line").remove();
          d3.select(".y-hover-line").remove();
        });

      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(formatTime).ticks(this.data.length));

      g.append("g")
        .call(d3.axisLeft(y).tickSizeOuter(0))
        .selectAll("text")
        .attr("x", -30) // Shift the y-axis labels to the left
        .attr("y", -10); // Adjust the vertical alignment of the labels

      // Style x-axis labels
      svg.selectAll(".tick text")
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("dy", "1em");
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style scoped>
#chartContainer {
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  /* Add a drop shadow */

}

* {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-weight: bold;
}
</style>
