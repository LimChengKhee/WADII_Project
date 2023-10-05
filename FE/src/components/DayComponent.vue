<template>

<div v-for="day of days" :key='day.dayId' class="row">
    <p class="d-inline">
         Day {{ day.dayId + 1 }}
        <button type="button" @click="deleteDay(day.dayId)" class="btn btn-outline-danger" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: 0.6rem; margin-left:0.5rem">Delete Day</button>
        <button style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .5rem; margin-left: 35rem" class="btn btn-secondary d-inline" type="button" data-bs-toggle="collapse" :data-bs-target="'#Day' + day.dayId + 'Collapse'" aria-expanded="false" aria-controls="collapseExample">
            Expand Day
        </button>

    </p>
    <div class="collapse" :id="'Day' + day.dayId + 'Collapse'">
        <div v-for="activity in day.dayActivities" :key="activity.number" class="card mb-3" style="max-width: 665px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img v-bind:src="'/assets/img/' + activity.image" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body row">
                        <h5 class="card-title col-10">Activity {{activity.number}} - {{activity.name}}</h5>
                        <button @click="delActivity(day.dayId,activity.name)" type="button" class="btn btn-outline-danger col-2" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .25rem;--bs-btn-font-size: 0.6rem">Delete Activity</button>
                        <p class="card-text fs-6">{{activity.description}}</p>
                        <!-- <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6" id="DayLocation"> 
            <!-- May need to add dynamic id above -->
            <label for="location" class="form-label">Location</label>
            <div class="input-group mb-3">
                <span class="input-group-text" id="location">
                    <svg width="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
                <input type="text" class="form-control" placeholder="Enter a location" aria-label="location" aria-describedby="location">
            <!-- <GMapAutocomplete
                placeholder="SMU"
                @place_changed="setPlace"
                >
            </GMapAutocomplete> -->
            </div>
        </div>
    </div>
</div>
</template>
<script>
//  import statements
// import example from '@/utils/string_formatter'

export default {
props: [
    // props
    'allActivities',
    'days',
],
name: 'Day_Component',
components: {
    // importing components from other places
},
data () {
// local repository of information
    return {
    }
},
computed: {
    // computed
},

// start of lifecycle
async mounted () {
},

methods: {
    // methods defined by ourselves
    delActivity(dayName,actName){
        for (let i=0;i<this.days.length;i++){
            if (this.days[i].dayId == dayName){
                var d = this.days[i];
                for (let a of d.dayActivities){
                    if (a.name == actName){
                        d.dayActivities.splice(d.dayActivities.indexOf(a),1)
                        break
                    }
                }
                break
            }
        }
        let startNum = 1;
        for (let a of d.dayActivities){
            a.number = startNum;
            startNum += 1;
        }
    },
    deleteDay(deleteId){
        for (let i=0;i<this.days.length;i++){
            if (this.days[i].dayId == deleteId){
                // eslint-disable-next-line vue/no-mutating-props
                this.days.splice(i,1)
                break
            }
        }
        for (let i=0;i<this.days.length;i++){
            // eslint-disable-next-line vue/no-mutating-props
            this.days[i].dayId = i;
        }
    },
},
}

</script>

<style scoped>

</style>
