<template>
  <div>
    <h2>Bar Chart</h2>
    <div id="chartContainer">
      <svg ref="chart"></svg>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { useAuthStore } from '../store/piniaStore/authStore';
import { useUsersStore } from '../store/piniaStore/userStore';
import { mapStores } from 'pinia';

export default {
  name: 'Barchart',
  props: {
    dataBC: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      data: itiData,
      screenWidth: window.innerWidth * 0.8,
    };
  },
  watch: {
    dataLC: {
      immediate: true,
      handler(newVal, oldVal) {
        console.log(this.dataLC)
        this.drawChart();
      }
    }
  },
  computed: {
    ...mapStores(useAuthStore),
    ...mapStores(useUsersStore)
  },

  mounted() {
    
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth * 0.8;
      this.drawChart();
    },
    drawChart() {
      const container = d3.select("#chartContainer");
      container.select("svg").remove();
      const containerWidth = container.node().getBoundingClientRect().width;
      const margin = { top: 20, right: 20, bottom: 40, left: 60 };
      const width = Math.min(this.screenWidth, containerWidth) - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const svg = d3.select("#chartContainer")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      const g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const parseTime = d3.timeParse("%Y-%m-%d");
      const y = d3.scaleLinear()
        .domain([0, d3.max(this.data, d => d.itinerary_data.flights[0].distance) * 1.2])
        .range([height, 0]);

      const x = d3.scaleBand()
        .domain(this.data.map(d => parseTime(d.itinerary_data.destination.start_date)))
        .range([0, width])
        .padding(0.1);

      g.selectAll(".bar")
        .data(this.data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(parseTime(d.itinerary_data.destination.start_date)))
        .attr("y", d => y(d.itinerary_data.flights[0].distance))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.itinerary_data.flights[0].distance))
        .attr("fill", "steelblue")
        .on("mouseover", function (event, d) {
          const tooltip = d3.select("#chartContainer")
            .append("div")
            .style("position", "absolute")
            .style("background", "#f4f4f4")
            .style("padding", "5px")
            .style("border", "1px solid #333")
            .text(`Date: ${d.itinerary_data.destination.start_date}, Distance: ${d.itinerary_data.flights[0].distance}`)
            .style("left", event.pageX + "px")
            .style("top", event.pageY + "px");
        })
        .on("mouseout", function () {
          d3.select("#chartContainer").select("div").remove();
        });

      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")).ticks(this.data.length))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

      g.append("g")
        .call(d3.axisLeft(y).tickSizeOuter(0))
        .selectAll("text")
        .attr("x", -30)
        .attr("y", -10);

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
}

* {
  background-color: beige;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-weight: bold;
}
</style>
