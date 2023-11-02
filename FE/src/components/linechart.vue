<template>
  <div class="container">
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
import { callWithAsyncErrorHandling } from "vue";

export default {
  name: 'Linechart',
  props: {
    dataLC: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {

      screenWidth: window.innerWidth * 0.8,
    };
  },

  async mounted() {
    // const authStore = useAuthStore();
    // const userStore = useUsersStore();
    // this.userid = authStore.user
    // this.token = authStore.token
    // // await 
    // this.dataLC = await userStore.getItinerary(this.userid, this.token);



    window.addEventListener('resize', this.handleResize);


  },
  watch: {
    dataLC: {
      immediate: true,
      handler(newVal, oldVal) {

        this.drawChart();
      }
    }
  },
  computed: {
    ...mapStores(useAuthStore),
    ...mapStores(useUsersStore)
  },


  methods: {
    parseTime(date) {
      const currentDate = new Date();
      const lastYear = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
      const providedDate = new Date(date);
      if (providedDate < lastYear) {
        return lastYear;
      } else {
        return providedDate;
      }
    },

    handleResize() {
      this.screenWidth = window.innerWidth * 0.8;
      const container = d3.select("#chartContainer");
      container.select("svg").remove();
      this.drawChart();
    },

    drawChart() {
      if (this.dataLC.length === 0) {
        return; // Check if the data array is empty
      }
      const resizeDimensions = () => {
        this.screenWidth = container.node().getBoundingClientRect().width * 0.8;
        this.drawChart();
      };
      this.dataLC.sort((a, b) => {
        const dateA = new Date(a.itinerary_data.itinerary_data.destination.start_date);
        const dateB = new Date(b.itinerary_data.itinerary_data.destination.start_date);
        return dateA - dateB;

      });

      this.dataLC.forEach((itinerary) => {
        itinerary.totalCost = itinerary.itinerary_data.itinerary_data.hotels.reduce((acc, cur) => acc + cur.cost, 0) +
          itinerary.itinerary_data.itinerary_data.flights.reduce((acc, cur) => acc + cur.cost, 0);
      });
      // Calculate total cost
      const totalCost = this.dataLC.reduce((acc, cur) => acc + cur.totalCost, 0);

      // Calculate average cost
      const averageCost = totalCost / this.dataLC.length;


      const container = d3.select("#chartContainer");
      container.select("svg").remove();
      const containerWidth = container.node().getBoundingClientRect().width;
      const margin = { top: 20, right: 50, bottom: 40, left: 100 };
      const width = Math.min(this.screenWidth, containerWidth) - margin.left - margin.right;
      const height = 350 - margin.top - margin.bottom;

      const svg = d3
        .select("#chartContainer")
        .append("svg")
        .style("color", "white")
        .attr("border-radius", "5px")
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
        .attr("stop-color", "#ff7e5f");

      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#feb47b");

      svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .style("fill", "#204E59")
        .attr("rx", "5")
        .attr("ry", "5");



      const g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const formatTime = d3.timeFormat("%Y-%m-%d");
      const parseTime = d3.timeParse("%Y-%m-%d");
      const formatTimeMonthYear = d3.timeFormat("%b %Y");

      const x = d3
        .scaleTime()
        .domain([
          d3.min(this.dataLC, d => parseTime(d.itinerary_data.itinerary_data.destination.start_date)),
          d3.max(this.dataLC, d => parseTime(d.itinerary_data.itinerary_data.destination.start_date))
        ])
        .range([0, width]);

      const y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(this.dataLC, d => d.totalCost) * 1.2
        ])
        .nice()
        .range([height, 0]);

      const line = d3
        .line()
        .x(d => x(parseTime(d.itinerary_data.itinerary_data.destination.start_date)))
        .y(d => y(d.totalCost));


      g.append("text")
        .attr("x", width - 10)
        .attr("y", 10)
        .attr("text-anchor", "end")
        .attr("fill", "white")


      g.append("path")
        .datum(this.dataLC)
        .attr("fill", "none")
        .attr("stroke", "#C8EE51")
        .attr("stroke-width", 3)
        .attr("d", line);

      g.selectAll(".verticalLines")
        .data(this.dataLC)
        .enter()
        .append("line")
        .attr("class", "verticalLines")
        .attr("x1", d => x(parseTime(d.itinerary_data.itinerary_data.destination.start_date)))
        .attr("x2", d => x(parseTime(d.itinerary_data.itinerary_data.destination.start_date)))
        .attr("y1", height)
        .attr("y2", d => y(d.totalCost))
        .style("stroke", "gray")
        .style("stroke-dasharray", "3,3");

      g.selectAll("dot")
        .data(this.dataLC)
        .enter()
        .append("circle")
        .attr("cx", d => x(parseTime(d.itinerary_data.itinerary_data.destination.start_date)))
        .attr("cy", d => y(d.totalCost))
        .attr("r", 5)
        .attr("fill", "steelblue")

        .on("mouseover", function (event, d) {
          const xPos = x(parseTime(d.itinerary_data.itinerary_data.destination.start_date));
          const yPos = y(d.totalCost);

          const containerRect = g.node().getBoundingClientRect();

          const descriptionWidth = 400;
          const descriptionHeight = 400;

          const maxPosX = containerRect.width - descriptionWidth - 10;
          const maxPosY = containerRect.height - descriptionHeight - 10;

          const constrainedXPos = Math.max(10, Math.min(maxPosX, xPos + 10));
          const constrainedYPos = Math.max(10, Math.min(maxPosY, yPos - 10));

          const foreignObject = g.select(".description-box");

          if (!foreignObject.empty()) {
            foreignObject.remove();
          }

          const foreignObjectGroup = g.append("g")
            .attr("class", "description-box")
            .attr("transform", `translate(${constrainedXPos},${constrainedYPos})`);


          foreignObjectGroup
            .append("foreignObject")
            .attr("width", descriptionWidth)
            .attr("height", descriptionHeight)
            .append("xhtml:div")
            .style("position", "absolute")
            .style("background", "white")
            .style("color", "black")
            .style("padding", "5px")
            .style("border", "1px solid #333")
            .html(`
    <div style=" width: 300px; background: white; color: black; padding: 5px;">
      <div style="display:flex; justify-content: space-between;">
        <p style="text-align: left; margin: 0;">To:</p>
        <p style="text-align: right; margin: 0;">${d.itinerary_data.itinerary_data.destination.trip_country}</p>
      </div>
      <div style="display:flex; justify-content: space-between;">
        <p style="text-align: left; margin: 0;">Date:</p>
        <p style="text-align: right; margin: 0;"> ${d.itinerary_data.itinerary_data.destination.start_date}</p>
      </div>
      <div style="display:flex; justify-content: space-between;">
        <p style="text-align: left; margin: 0;">Hotel Cost:</p>
        <p style="text-align: right; margin: 0;">$${d.itinerary_data.itinerary_data.hotels.reduce((acc, cur) => acc + cur.cost, 0).toFixed(2)}</p>
      </div>
      <div style="display:flex; justify-content: space-between;">
        <p style="text-align: left; margin: 0;">Flight Cost:</p>
        <p style="text-align: right; margin: 0;">$${d.itinerary_data.itinerary_data.flights.reduce((acc, cur) => acc + cur.cost, 0).toFixed(2)}</p>
      </div>
      <div style="display:flex; justify-content: space-between;">
        <p style="text-align: left; margin: 0;">Total Cost:</p>
        <p style="text-align: right; margin: 0;">$${d.totalCost.toFixed(2)}</p>
      </div>
    </div>
  `);
          // Dotted lines
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
          g.selectAll(".description-box").remove();
          d3.select(".x-hover-line").remove();
          d3.select(".y-hover-line").remove();
        });
      const calculateTickCount = () => {
        const maxTickCount = 10;
        const minWidthPerTick = 100;

        const tickCount = Math.floor(containerWidth / minWidthPerTick);

        return Math.min(tickCount, maxTickCount, this.dataLC.length);
      };

      const tickCount = calculateTickCount();

      g.append("g")
        .attr("style", "color: white;")
        .attr("transform", "translate(0," + height + ")")
        .call(
          d3.axisBottom(x).ticks(tickCount).tickFormat((date, index, dates) => {
            if (this.screenWidth <= 600) {
              if (index === 0 || (index > 0 && !dates[index - 1].getMonth)) {
                return formatTimeMonthYear(date);
              } else if (dates[index - 1].getMonth() !== date.getMonth()) {
                return formatTimeMonthYear(date);
              } else {
                return "";
              }
            } else {
              return formatTime(date);
            }
          })
        );



      g.append("g")
        .call(d3.axisLeft(y).tickSizeOuter(0))
        .selectAll("text")
        .attr("x", this.screenWidth <= 600 ? 0 : -30)
        .attr("y", -10);
      g.append("text")
        .attr("x", width - 10)
        .attr("y", this.screenWidth <= 600 ? 10 : 30)
        .attr("text-anchor", "end")
        .attr("fill", "white")
        .text(`Total Cost: $${totalCost.toFixed(2)}`);

      g.append("text")
        .attr("x", width - 10)
        .attr("y", 10)
        .attr("text-anchor", "end")
        .attr("fill", "white")
        .text(`Average Cost: $${averageCost.toFixed(2)}`);

      // Style x-axis labels
      svg.selectAll(".tick text")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .attr("dy", "1em");

      g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 15 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .attr("fill", "white")
        .text("Total Cost");
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

svg {
  max-width: 100%;

}

#chartContainer {
  width: 100%;
  max-width: 100%;
}

* {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-weight: bold;
}

h2 {
  color: black;
}
</style>
