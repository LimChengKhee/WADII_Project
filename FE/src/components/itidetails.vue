<template>
    <div class="card order-card">
        <div class="card-block">
            <p>Top 5 Countries Visited</p>
            <hr class="divider" />
        </div>
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
            const margin = { top: 20, right: 50, bottom: 50, left: 50 }; // Adjusted left margin for longer labels
            const width = 400 - margin.left - margin.right;
            const height = 300 - margin.top - margin.bottom;


            const svg = d3
                .select('.chart-container')
                .append('svg')
                .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            const x = d3.scaleBand().range([0, width]).padding(0.1).domain(this.accumulatedData.map((d) => d.country));
            const y = d3.scaleLinear().range([height, 0]).domain([0, d3.max(this.accumulatedData, (d) => d.count)]);

            svg.append('g')
                .attr('transform', 'translate(0,' + height + ')')
                .call(d3.axisBottom(x)
                    .tickSize(0)
                    .tickPadding(10)
                    .tickFormat((d) => d)
                    .tickSizeOuter(0))
                .selectAll("text")
                .attr("transform", "translate(0,0)") // Remove the rotation here
                .style("text-anchor", "middle"); // Adjust the text anchor as needed

            svg.append('g').call(d3.axisLeft(y));
            const bar = svg
        .selectAll('.bar')
        .data(this.accumulatedData)
        .enter()
        .append('path')
        .attr('class', 'bar')
        .attr('d', (d) => {
            const radius = 10; // Adjust the radius as needed
            const xVal = x(d.country);
            const yVal = y(d.count);
            const barWidth = x.bandwidth();
            const barHeight = height - y(d.count);
            return `M ${xVal} ${yVal + radius}
                    a ${radius} ${radius} 0 0 1 ${radius} -${radius}
                    h ${barWidth - 2 * radius}
                    a ${radius} ${radius} 0 0 1 ${radius} ${radius}
                    v ${barHeight - radius}
                    h ${-barWidth}
                    v ${-barHeight + radius}
                    Z`;
        })
        .attr('fill', 'url(#gradient)');
        svg.append('linearGradient')
        .attr('id', 'gradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0).attr('y1', 0)
        .attr('x2', 0).attr('y2', height)
        .selectAll('stop')
        .data([
            { offset: '0%', color: '#e66465' }, // Adjust the colors as needed
            { offset: '100%', color: '#9198e5' }
        ])
        .enter().append('stop')
        .attr('offset', (d) => d.offset)
        .attr('stop-color', (d) => d.color);


            


            svg
                .selectAll('.text-label')
                .data(this.accumulatedData)
                .enter()
                .append('text')
                .attr('class', 'text-label')
                .attr('x', (d) => x(d.country) + x.bandwidth() / 2)
                .attr('y', (d) => y(d.count) - 5)
                .attr('text-anchor', 'middle')
                .text((d) => d.count);

            const barRadius = 10; // Adjust the radius as needed
            
        },
    },
};
</script>
  
<style scoped>
/* Your existing styles */


.bar {
    fill: steelblue;
}

.text-label {
    fill: #333;
    font-size: 12px;
    text-anchor: middle;
    overflow-wrap: break-word;
    word-wrap: break-word;
    white-space: normal;

}


.bg-c-blue {
    background: linear-gradient(45deg, #4099ff, #73b4ff);
}

.bg-c-green {
    background: linear-gradient(45deg, #2ed8b6, #59e0c5);
}

.bg-c-yellow {
    background: linear-gradient(45deg, #FFB64D, #ffcb80);
}

.bg-c-pink {
    background: linear-gradient(45deg, #FF5370, #ff869a);
}


.card {
    border-radius: 5px;
    -webkit-box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
    box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
    border: none;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

.card .card-block {
    padding: 25px;
}

.order-card i {
    font-size: 26px;
}

.f-left {
    float: left;
}

.f-right {
    float: right;
}
</style>
  