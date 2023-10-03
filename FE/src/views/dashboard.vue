<template>
    <div class="container-fluid">
      <div class="row px-0">
        <div class="col-lg-3 col-md-4 col-12 p-5 sidebar">
          <img class="shadow-4-strong img-circle rounded-circle custom-width my-3" alt="profileImg" src="../img/steve.jpg" />
          <div class="profileInfo">
            <h5>{{ profileInfo[0].Name }}</h5>
            <p>{{ profileInfo[0].Birthday }}</p>
          </div>
        </div>
        <div class="col-lg-9 col-md-8 col-12 main-content">
          <div class="row keyStats">
            <div class="col-lg-3 col-md-6 col-12">
              <!-- Content for the first key stat column -->
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <!-- Content for the second key stat column -->
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <!-- Content for the third key stat column -->
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <!-- Content for the fourth key stat column -->
            </div>
          </div>
          <div class="row priChart">
            <div class="col-lg-12 px-0">
              <Linechart :filteredData="filteredData" />
            </div>
          </div>
          <div class="row secCharts">
            <div class="col-lg-4 col-md-6 col-12">
              <Piechart :filteredData="filteredData" />
            </div>
            <div class="col-lg-4 col-md-6 col-12">
              <Piechart :filteredData="filteredData" />
            </div>
            <div class="col-lg-4 col-12">
              <Piechart :filteredData="filteredData" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import * as d3 from "d3";
  import crossfilter from "crossfilter"; // Use crossfilter2 for ES6 compatibility
  
  import Linechart from "../components/linechart.vue";
  import Piechart from "../components/piechart.vue";
  
  export default {
    name: 'Dashboard',
    components: {
      Linechart,
      Piechart,
    },
    data() {
      return {
        profileInfo: [
          {
            id: 1,
            Name: "Mike Tyson",
            Birthday: "01 Sep 2000",
          },
        ],
        data: [
          { date: "24-Apr-07", amount: 93.24 },
          { date: "25-Apr-07", amount: 95.35 },
          { date: "26-Apr-07", amount: 98.84 },
          // ... more data ...
        ],
        crossfilterData: null,
        filteredData: [],
      };
    },
    mounted() {
      // Call a function to set up Crossfilter when the component is mounted
      this.setupCrossfilter();
    },
    methods: {
      setupCrossfilter() {
        // Create a Crossfilter instance
        this.crossfilterData = crossfilter(this.data);
  
        // Define dimensions based on the data properties you want to filter on
        const dateDimension = this.crossfilterData.dimension((d) => d.date);
  
        // Store the dimension in the component's data
        this.dateDimension = dateDimension;
  
        // Apply an initial filter
        this.dateDimension.filterRange(["24-Apr-07", "27-Apr-07"]);
  
        // Initialize the filteredData
        this.updateFilteredData();
  
        // Listen for changes to the Crossfilter data
        this.crossfilterData.on("filtered", () => {
          this.updateFilteredData();
        });
      },
      updateFilteredData() {
        // Update the filteredData based on the current Crossfilter state
        this.filteredData = this.dateDimension.top(Infinity);
      },
    },
  };
  </script>
  
  
  <style>
  .img-circle {
    height: 200px;
    border: 2px solid black;
  }
  
  div.row img.rounded-circle.custom-width {
    width: auto;
  }
  
  .sidebar {
    background-color: black;
    text-align: center;
  }
  
  .main-content {
    background-color: grey;
  }
  
  .profileInfo {
    color: white;
  }
  </style>
  