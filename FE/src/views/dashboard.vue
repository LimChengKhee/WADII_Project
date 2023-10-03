<template>
    <div class="container-fluid">
        <div class="row px-0">
            <div class="col-3 p-5 sidebar">
                <img class="shadow-4-strong img-circle rounded-circle custom-width my-3" alt="profileImg"
                    src="../img/steve.jpg" />
                <div class="profileInfo">
                    <h5>{{ profileInfo[0].Name }}</h5>
                    <p>{{ profileInfo[0].Birthday }}</p>
                    <p>{{ profileInfo[0].Gender }}</p>
                </div>
            </div>
            <div class="col-9 main-content">
                <!-- Your main content here -->
                <div class="row keyStats">
                    <div class="col-3">
                        <Linechart/>
                    </div>
                    <div class="col-3">

                    </div>
                    <div class="col-3">

                    </div>
                    <div class="col-3">

                    </div>
                </div>
                <div class="row priChart">
                    <Linechart/>
                </div>
                <div class="row secCharts">
                    <div class="col-4">

                    </div>
                    <div class="col-4">

                    </div>
                    <div class="col-4">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import Linechart from "../components/linechart.vue";

export default {
    name: 'Dashboard',
    components:{
    Linechart,
  },
    data() {
        return {
            profileInfo: [
                {
                    id: 1,
                    Name: "Mike Tyson",
                    Birthday: "01 Sep 2000",
                    Gender: "M",
                },
            ],
        };
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

