<template>
    <div v-for="day of days" :key='day.dayId' class="row">
        <p class="d-inline">
            Day {{ day.dayId + 1 }} ({{ getPrintableDate(day.dayId) }})
            <button type="button" @click="deleteDay(day.dayId)" class="btn btn-outline-danger"
                style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: 0.6rem; margin-left:0.5rem">Delete
                Day</button>
            <button
                style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .5rem; margin-left: 35rem"
                class="btn btn-secondary d-inline" type="button" data-bs-toggle="collapse"
                :data-bs-target="'#Day' + day.dayId + 'Collapse'" aria-expanded="false" aria-controls="collapseExample">
                Expand Day
            </button>

        </p>
        <div class="collapse" :id="'Day' + day.dayId + 'Collapse'">

            <div class="container">
                <div class="row">
                    <!-- include the form to appear -->
                    <div :id="'Day' + day.dayId + 'EndLocation'">
                        <div class="input-group w-50 mb-3">
                            <span class="input-group-text" :id="'Day' + day.dayId + 'location'">
                                <svg width="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path
                                        d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                            <input type="text" @input="findPlace" class="form-control" placeholder="Add a place"
                                :aria-describedby="'Day' + day.dayId + 'location'">
                            <div class="dropend">
                                <button type="button" class="btn btn-sm btn-secondary dropdown-toggle"
                                    data-bs-toggle="dropdown" aria-expanded="false"
                                    data-bs-auto-close="outside">More</button>
                                <form class="dropdown-menu dropdown-menu-start p-4" style="width:50%;" data-bs-theme="dark">
                                    <div class="mb-3">
                                        <label :for="'Day' + day.dayId + 'eventName'" class="form-label">Event Name</label>
                                        <input type="text" class="form-control" :id="'Day' + day.dayId + 'eventName'"
                                            placeholder="Cook lunch">
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'Day' + day.dayId + 'notes'" class="form-label">Notes</label>
                                        <input type="text" class="form-control" :id="'Day' + day.dayId + 'notes'"
                                            placeholder="Fried rice">
                                    </div>
                                    <button type="button" @click="addCustomEvent(day.dayId, day.dayActivities.length)"
                                        class="btn btn-primary">Add event</button>
                                </form>
                            </div>
                        </div>
                        <div class="list-group d-none" :id="'Day' + day.dayId + 'predictionList'">
                        </div>
                    </div>


                </div>

            </div>

            <div v-for="activity in day.dayActivities" :key="activity.number" style="max-width: 665px;">
                <!-- Start Activity Location to store information -->

                <div class="row g-0 card mb-3">
                    <div class="col-md-4">
                        <img :src="getImage(activity.image)" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">

                        <div class="card-body row">
                            <h5 class="card-title col-10">Activity {{ activity.number }} - {{ activity.name }}</h5>
                            <button @click="delActivity(day.dayId, activity.number)" type="button"
                                class="btn btn-outline-danger col-2"
                                style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .25rem;--bs-btn-font-size: 0.6rem">Delete
                                Activity</button>
                            <p class="card-text fs-6">{{ activity.description }}</p>


                            <!-- start and end time of activity -->
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Start</span>
                                <input type="time" class="form-control" placeholder="Username" aria-label="Username"
                                    aria-describedby="basic-addon1">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">End</span>
                                <input type="time" class="form-control" placeholder="Username" aria-label="Username"
                                    aria-describedby="basic-addon1">
                            </div>
                            <!-- <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> -->
                        </div>

                    </div>


                </div>



            </div>
            <!-- check if my dayActivities has at least 2 activities -->
            <div class="container">

            </div>


        </div>
    </div>
</template>
<script>
//  import statements
import axios from 'axios';
// import example from '@/utils/string_formatter'

export default {
    props: [
        // props
        'allActivities',
        'days',
        'date'
    ],
    name: 'Day_Component',
    components: {
        // importing components from other places
    },
    data() {
        // local repository of information
        return {
        }
    },
    computed: {
        // computed
    },

    // start of lifecycle
    async mounted() {
    },

    methods: {
        // methods defined by ourselves
        // getPlaceDetails(candidates){
        //     for (let c=0;c<candidates.length;c++){ // for each place candidate
        //         var id = candidates[c].place_id
        //         axios.get('/api/place/details/json',{params: {place_id:id,fields:'name,photos,address_components,editorial_summary',key:'AIzaSyC27_uXwB2Wdx05nP3pezmdAH5svn1oqr4'}})
        //         .then(res =>{
        //             console.log(res)
        //             var result = res.data.result
        //             var name=result.name
        //             // var photo=result.photos[0].photo_reference
        //             // photo = axios.get('/api/place/photo',{params: {photoreference:photo,maxwidth:300,key:'AIzaSyC27_uXwB2Wdx05nP3pezmdAH5svn1oqr4'}})
        //             var adrComponents = result.address_components
        //             for (let i=0;i<adrComponents.length;i++){
        //                 if (adrComponents[i].types[0] == 'street_number'){
        //                     var address = adrComponents[i].long_name + " "
        //                 }
        //                 else if (adrComponents[i].types[0] == 'route'){
        //                     address += adrComponents[i].long_name
        //                 }
        //             }
        //             var desc = result.editorial_summary.overview
        //         })
        // }},
        // displayPlaces(){
        //     var dayLocation = document.getElementById('DayLocation')
        //                 var cardDiv = document.createElement('div')
        //                 cardDiv.classList.add('card')
        //                 cardDiv.classList.add('mb-3')
        //                 cardDiv.classList.add('mb-3')
        //                 cardDiv.style = 'max-width: 540px;'
        //                 cardDiv.innerHTML = `
        //                     <div class="row g-0">
        //                         <div class="col-md-4">
        //                         // <img src='' class="img-fluid rounded-start" alt="...">
        //                         </div>
        //                         <div class="col-md-8">
        //                         <div class="card-body">
        //                             <h5 class="card-title">${name}</h5>
        //                             <p class="card-text">
        //                                 ${address}
        //                                 ${desc}
        //                             </p>
        //                         </div>
        //                         </div>
        //                     </div>
        //             `
        //             dayLocation.appendChild(cardDiv)
        //             .catch(error=>{
        //                 console.log(error)
        //             })
        // },
        getImage(image) {
            console.log(image)
            if (image == "") {
                return '/assets/img/DSC00788-3.jpg'
            }
            return '/assets/img/' + image
        },
        findPlace(event) { // calls api to get you candidates for search and their place id
            var location = event.target
            var dayId = location.parentNode.parentNode.id[3]
            var query = location.value
            var url = '/api/place/autocomplete/json';
            var params = {
                input: query,
                radius: 30000, /// change later on to be dynamic
                components: 'country:sg', // change later on to be dynamic
                location: '1.2975775529697462, 103.84947406178404', // change later on to be dynamic
                key: 'AIzaSyC27_uXwB2Wdx05nP3pezmdAH5svn1oqr4',
            }
            axios.get(url, { params })
                .then(response => {
                    var predictionList = document.getElementById(`Day${dayId}predictionList`)
                    predictionList.innerHTML = '' // clear the list of past predictions on each input
                    var predictions = response.data.predictions
                    let dayActivities = this.days[dayId].dayActivities
                    if (predictions.length > 0) { // if there are predictions
                        predictionList.classList.remove('d-none') // display the list
                        for (let p = 0; p < predictions.length; p++) {
                            var desc = predictions[p].description
                            var listGroupItem = document.createElement('button') // creating the button for each prediction
                            listGroupItem.type = 'button'
                            listGroupItem.classList.add('list-group-item')
                            listGroupItem.classList.add('list-group-item-action')
                            listGroupItem.innerHTML = desc // displaying the place description for each item
                            listGroupItem.addEventListener('click', function () { //making sure that upon click of the prediction, will add it to the activities
                                var indivDesc = predictions[p].description // requires definition inside so that the eventlistener is using the correct description (desc var will be updated to be the last prediction description)
                                var name = predictions[p].structured_formatting.main_text
                                var place_id = predictions[p].place_id
                                var actNum = dayActivities.length + 1
                                // eslint-disable-next-line vue/no-mutating-props
                                dayActivities.push({ name: name, number: actNum, description: indivDesc, image: 'DSC00788-3.jpg', placeId: place_id }) // at some point get image, push place id
                                predictionList.classList.add('d-none') // hiding the list upon selection of prediction
                            }.bind(this)) // for eventlistener to have latest data
                            predictionList.appendChild(listGroupItem) // adding the button to the lists
                        }
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        delActivity(dayId, actNum) {
            var activities = this.days[dayId].dayActivities
            activities.splice(actNum - 1, 1)
            let startNum = 1;
            for (let a of activities) {
                a.number = startNum;
                startNum += 1;
            }
        },
        deleteDay(deleteId) {
            this.days.splice(deleteId, 1)
            for (let i = 0; i < this.days.length; i++) {
                // eslint-disable-next-line vue/no-mutating-props
                this.days[i].dayId = i;
            }
            this.date[1].setDate(this.date[1].getDate() - 1)
            console.log(this.date)
        },
        getPrintableDate(day) {
            let startDate = this.date[0]
            let printableDate = new Date(new Date().setDate(startDate.getDate() + day));
            return printableDate.toDateString()
        },
        addCustomEvent(day, position) {
            let dayActivities = this.days[day].dayActivities
            if (position == dayActivities.length) {
                let name = document.getElementById(`Day${day}eventName`).value
                let notes = document.getElementById(`Day${day}notes`).value
                let num = dayActivities.length + 1
                dayActivities.push({
                    name: name, number: num, description: notes, image: '', placeId: ''
                })
            }
            else {
                // else check the position of the activity that i will be inserting
                // then insert the activity in between the 2 activities
                // then update the activity number of all the activities in the day

                let name = document.getElementById(`Day${day}eventName`).value
                let notes = document.getElementById(`Day${day}notes`).value
                let num = dayActivities.length + 1
                dayActivities.splice(position, 0, {
                    name: name, number: num, description: notes, image: '', placeId: ''
                })
                let startNum = 1;
                for (let a of dayActivities) {
                    a.number = startNum;
                    startNum += 1;
                }
            }
        },


        displayAddBtn() {
            let startLoc = document.getElementsByClassName("startActLoc");

            //get day id 



            // Iterate over each element with the class name
            //             for (let i = 0; i < startLoc.length; i++) {
            //                 startLoc[i].innerHTML = `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            //   <div class="modal-dialog">
            //     <div class="modal-content">
            //       <div class="modal-header">
            //         <h5 class="modal-title" id="exampleModalLabel">Search for a Place</h5>
            //         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            //       </div>
            //       <div class="modal-body">
            //         <div class="container">
            //                 <div class="row">
            //                     <!-- include the form to appear -->
            //                     <div :id="'Day' + day.dayId + 'EndLocation'">
            //                         <div class="input-group w-50 mb-3">
            //                             <span class="input-group-text" :id="'Day' + day.dayId + 'location'">
            //                                 <svg width="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            //                                     <path
            //                                         d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
            //                                         stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            //                                     <path
            //                                         d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
            //                                         stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            //                                 </svg>
            //                             </span>
            //                             <input type="text" @input="findPlace" class="form-control" placeholder="Add a place"
            //                                 :aria-describedby="'Day' + day.dayId + 'location'">
            //                             <div class="dropend">
            //                                 <button type="button" class="btn btn-sm btn-secondary dropdown-toggle"
            //                                     data-bs-toggle="dropdown" aria-expanded="false"
            //                                     data-bs-auto-close="outside">More</button>
            //                                 <form class="dropdown-menu dropdown-menu-start p-4" style="width:50%;" data-bs-theme="dark">
            //                                     <div class="mb-3">
            //                                         <label :for="'Day' + day.dayId + 'eventName'" class="form-label">Event Name</label>
            //                                         <input type="text" class="form-control" :id="'Day' + day.dayId + 'eventName'"
            //                                             placeholder="Cook lunch">
            //                                     </div>
            //                                     <div class="mb-3">
            //                                         <label :for="'Day' + day.dayId + 'notes'" class="form-label">Notes</label>
            //                                         <input type="text" class="form-control" :id="'Day' + day.dayId + 'notes'"
            //                                             placeholder="Fried rice">
            //                                     </div>
            //                                     <button type="button" @click="addCustomEvent(day.dayId, day.dayActivities.length)"
            //                                         class="btn btn-primary">Add event</button>
            //                                 </form>
            //                             </div>
            //                         </div>
            //                         <div class="list-group d-none" :id="'Day' + day.dayId + 'predictionList'">
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>
            //       </div>
            //       <div class="modal-footer">
            //         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            //         <button type="button" class="btn btn-primary">Save changes</button>
            //       </div>
            //     </div>
            //   </div>
            // </div>`;
            // }
            console.log("hello");
        },

        // create function to check if dayActivities has at least 2 activities currently
        // if so, locate the id of previous activity and after activity of the activity that i will be inserting
        // then insert the activity in between the 2 activities
        // else just push the activity to the end of the array
        // then update the activity number of all the activities in the day

    
       
    },
}

</script>



<style scoped></style>
