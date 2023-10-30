

<template>
    <div class="carousel-item" v-for='set in slicedArr' :key="set[0].id" :class="{ active: isFirstItem(set) }">
        <div class="card-group">
            <div v-for='activity in set' :key="activity.id" class="card" style="width: 18rem;">
                <img :src="getImage(activity.image)" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{activity.name}}</h5>
                    <p class="card-text">{{activity.description}}</p>
                    <div class="dropdown">
                        <button class="btn btn-sm btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Add to itinerary
                        </button>
                        <ul class="dropdown-menu">
                        <li><a class="dropdown-item" v-on:click="addActivity(1,activity.id)" href="#">Day 1</a></li>
                        <li><a class="dropdown-item" v-on:click="addActivity(2,activity.id)" href="#">Day 2</a></li>
                        <li><a class="dropdown-item" v-on:click="addActivity(3,activity.id)" href="#">Day 3</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//  import statements
// import example from '@/utils/string_formatter'

export default {
    props:[
        'allActivities',
        'days'
    ],
    name: 'Activity_Component',
    components: {
        // importing components from other places
    },
    data () {
    // local repository of information
    return {
        itemNum : 0,
    }
},
    computed: {
        // computed
        slicedArr() {
            const result = []
            for (let i = 0; i < this.allActivities.length; i += 3)
                    result.push(this.allActivities.slice(i, i + 3))
            return result
        },

    },

    // start of lifecycle
    async mounted () {
    },

    methods: {
        // methods defined by ourselves
        isFirstItem(set) {
                return set[0].id === this.slicedArr[0][0].id;
        },
        addActivity(dayNum, actId){
            for (let a of this.allActivities){
                if (a.id == actId){
                    var actName = a.name
                    var actNum = this.days[dayNum-1].dayActivities.length + 1
                    var image = a.image
                    var actDesc = a.description
                    // eslint-disable-next-line vue/no-mutating-props
                    this.days[dayNum-1].dayActivities.push({name:actName, number:actNum, description:actDesc, image:image})
                    break
                }
            }
        },
        getImage(image){
            if (image == ""){
                return '/assets/img/DSC00788-3.jpg'
            }
            return '/assets/img/' + image
        },
    },
}

</script>

<style scoped>

</style>
