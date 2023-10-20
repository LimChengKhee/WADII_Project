<template>

<div v-for="day of days" :key='day.dayId'  class="row">
    <p class="d-inline">
         Day {{ day.dayId + 1 }}  ({{getPrintableDate(day.dayId)}})
        <button type="button" @click="deleteDay(day.dayId)" class="btn btn-outline-danger" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: 0.6rem; margin-left:0.5rem">Delete Day</button>
        <button style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .5rem; margin-left: 35rem" class="btn btn-secondary d-inline" type="button" data-bs-toggle="collapse" :data-bs-target="'#Day' + day.dayId + 'Collapse'" aria-expanded="false" aria-controls="collapseExample">
            Expand Day
        </button>

    </p>
    <div class="collapse" :id="'Day' + day.dayId + 'Collapse'">
        <!-- <div v-if="day.dayActivities.length > 0">
            
        </div> -->
        <div v-if="day.dayActivities.length>0" >
            <div v-for="activity in day.dayActivities" :key="activity.number" class="card mb-3" style="max-width: 665px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img :src="getImage(activity.image)" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body row">
                            <h5 class="card-title col-10">Activity {{activity.number}} - {{activity.name}}</h5>
                            <button @click="delActivity(day.dayId,activity.number)" type="button" class="btn btn-outline-danger col-2" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .25rem;--bs-btn-font-size: 0.6rem">Delete Activity</button>
                            <p class="card-text fs-6">{{activity.description}}</p>
                            <!-- <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> -->
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-outline-primary mb-3" data-bs-toggle="modal" data-bs-target="#recommendModal">Recommend me activities!</button>
            <div class="modal fade" id="recommendModal" tabindex="-1" aria-labelledby="breakfastModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="breakfastModalLabel">Recommended activities</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <!-- <div v-if="day.accoms.length > 0">
                                <p class="d-inline" id="reccInit" v-if="!chosenBreakfast">Since you have no activities added for this day currently, we recommend choosing a breakfast location first. 
                                    <br><br>
                                    <button type="button" @click="chooseBreakfastFunc(day.dayId)" class="btn btn-success mx-2">OK</button>
                                    <button type="button" @click="skipBreakfastFunc" class="btn btn-danger mx-2">Skip breakfast for now</button>
                                </p>
                                <p id="breakfastRecc" v-if="!skipBreakfast"> 
                                    <div v-for="(rec,index) in recs">
                                        <div class="card mb-3 px-0" style="max-width: 665px;">
                                            <div class="row g-0">
                                                <div class="col-md-4">
                                                    <img :src="rec.photo.getUrl({maxWidth:221})" class="img-fluid rounded-start" alt="...">
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="card-body row">
                                                        <h5 class="card-title col-10"> {{rec.name}} - {{rec.address}} </h5>
                                                        <p class="card-text fs-6">
                                                            <span class="fw-bold">Cost:</span> {{displayCost(rec.price_level)}} <br>
                                                            <span class="fw-bold">Ratings:</span> {{rec.rating[0]}} ({{rec.rating[1]}} reviews) <br>
                                                            <span class="fw-bold">Link:</span> {{rec.url}}
                                                        </p>
                                                    </div>
                                                    <button type="button" @click="chooseRec(index)" class="btn btn-primary mx-2">Add to Day {{day.dayId + 1}}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </p>
                                <div id="testingDiv"></div> for google api purposes, DO NOT DELETE 
                                <p v-if="skipBreakfast">

                                </p>
                            </div>
                            <div v-else>
                                <p>Unfortunately, you need to have an accommodation for us to accurately recommend places to you</p>
                            </div> -->
                        </div>
                        <div class="modal-footer">
                            <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addActivityFromReccs(day.dayId)">Save changes</button> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h4 class="p-4">
                You have no activities currently. <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#breakfastModal">Recommend me activities!</button>
            </h4>
            <div class="modal fade" id="breakfastModal" tabindex="-1" aria-labelledby="breakfastModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="breakfastModalLabel">Recommended activities</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div v-if="day.accoms.length > 0">
                                <p v-if="!chosenBreakfast">Since you have no activities added for this day currently, we recommends choosing a breakfast location first. 
                                    <br><br>
                                    <button type="button" @click="chooseBreakfastFunc(day.dayId)" class="btn btn-success mx-2">OK</button>
                                    <button type="button" @click="skipBreakfastFunc" class="btn btn-danger mx-2">Skip breakfast for now</button>
                                </p>
                                <p id="breakfastRecc" v-if="!skipBreakfast"> <!--Breakfast recc-->
                                    <div v-for="(rec,index) in recs"> <!--this.recs.push({"name": p.name, "address" : p.vicinity, "rating" : [p.rating,p.user_ratings_total], "cost": p.price_level, "photo" : p.photos[0]})-->
                                        <div class="card mb-3 px-0" style="max-width: 665px;">
                                            <div class="row g-0">
                                                <div class="col-md-4">
                                                    <img :src="rec.photo.getUrl({maxWidth:221})" class="img-fluid rounded-start" alt="...">
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="card-body row">
                                                        <h5 class="card-title col-10"> {{rec.name}} - {{rec.address}} </h5>
                                                        <p class="card-text fs-6">
                                                            <span class="fw-bold">Cost:</span> {{displayCost(rec.price_level)}} <br>
                                                            <span class="fw-bold">Ratings:</span> {{rec.rating[0]}} ({{rec.rating[1]}} reviews)
                                                            <span class="fw-bold">Link:</span> {{rec.url}}
                                                        </p>
                                                    </div>
                                                    <button type="button" @click="chooseRec(index)" class="btn btn-primary mx-2 mb-2">Add to Day {{day.dayId + 1}}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </p>
                                <div id="testingDiv"></div>
                                <p v-if="skipBreakfast">

                                </p>
                            </div>
                            <div v-else>
                                <p>Unfortunately, you need to have an accommodation for us to accurately recommend places to you</p>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addActivityFromReccs(day.dayId)">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :id="'Day' + day.dayId + 'EndLocation'"> 
            <div class="input-group w-50 mb-3">
                <span class="input-group-text" :id="'Day' + day.dayId + 'location'">
                    <svg width="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
                <input type="text" @input="placeAutocomplete" class="form-control" placeholder="Add a place" :aria-describedby="'Day' + day.dayId + 'location'">
                <div class="dropend">
                    <button type="button" class="btn btn-sm btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" style="height:38px;">Custom events</button>
                    <form class="dropdown-menu dropdown-menu-start p-4" style="width:50%;" data-bs-theme="dark">
                        <div class="mb-3">
                            <label :for="'Day' + day.dayId + 'eventName'" class="form-label">Event Name</label>
                            <input type="text" class="form-control" :id="'Day' + day.dayId + 'eventName'" placeholder="Cook lunch">
                        </div>
                        <div class="mb-3">
                            <label :for="'Day' + day.dayId + 'notes'" class="form-label">Notes</label>
                            <input type="text" class="form-control" :id="'Day' + day.dayId + 'notes'" placeholder="Fried rice">
                        </div>
                        <button type="button" @click="addCustomEvent(day.dayId,day.dayActivities.length)" class="btn btn-primary">Add event</button>
                    </form>
                </div>
            </div>
            <div class="list-group d-none" :id="'Day' + day.dayId + 'predictionList'">
            </div>
        </div>
    </div>
</div>
</template>
<script>
//  import statements
import axios from 'axios';
// import { Loader } from "../../node_modules/@googlemaps/js-api-loader";
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
data () {
// local repository of information
    return {
        skipBreakfast: false,
        recs: [],
        // respLength: 0,
        selectedRecs: [],
        chosenBreakfast: false,
    }
},
computed: {
    // computed
    // recsFinished(){
    //     return this.recs.length == this.respLength
    // }
},

// start of lifecycle
async mounted () {

},

methods: {
    // methods defined by ourselves
    skipBreakfastFunc(){
        this.skipBreakfast = true;
        // recommend others
    },
    chooseBreakfastFunc(dayId){
        this.chosenBreakfast = true;
        var keyword = 'breakfast'
        var startAccoms = this.days[dayId].accoms[0]
        this.recs = []
        this.findPlace(startAccoms,['location']).then(result=>
        {
            var places = result
            var loc = places.location
            var formattedLoc = loc.lat.toString() + "," + loc.lng.toString() 
            this.nearbySearch(keyword,loc).then(resp =>{
                // this.respLength = resp.length
                console.log(resp)
                for (let p of resp){
                    console.log(p)
                    console.log(p.url)
                    this.recs.push({"name": p.name, "address" : p.vicinity, "rating" : [p.rating,p.user_ratings_total], "cost": p.price_level, "photo" : p.photos[0], "url": p.url})
                }
                console.log(this.recs)
            })
        })  
    },
    displayCost(price_level){
        let displayedCost = "" 
        for (let i=0;i<price_level;i++){
            displayedCost += '$'
        }
        return displayedCost
    },
    chooseRec(index){
        this.selectedRecs = []
        this.selectedRecs.push(this.recs[index])
    }, 
    addActivityFromReccs(dayId){
        if (this.selectedRecs.length > 0){
            var a = this.selectedRecs[0]
            var actName = a.name
            var actNum = this.days[dayId].dayActivities.length + 1
            var image = a.photo
            var actDesc = a.address 
            // eslint-disable-next-line vue/no-mutating-props
            this.days[dayId].dayActivities.push({name:actName, number:actNum, description:actDesc, image:image})
        }
    },
    async nearbySearch(kw, loc) {
        var testDiv = document.getElementById('testingDiv');
        const { PlacesService } = await google.maps.importLibrary('places');
        let request = {
        location: loc,
        radius: '5000',
        keyword: kw,
        };
        var service = new PlacesService(testDiv);
        return new Promise((resolve, reject) => {
            service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (let place of results){
                    let id = place.place_id
                    service.getDetails({placeId:id,fields:['url']},(gdResults,gdStatus) =>{
                    if (gdStatus === google.maps.places.PlacesServiceStatus.OK){
                        place['url'] = gdResults['url']
                    } else{
                        reject (new Error(`Places service request failed with status: ${gdStatus}`));
                    }
                })
                }
                resolve(results); // Resolve the promise with the results
            } else {
                reject(new Error(`Places service request failed with status: ${status}`));
            }
            });
        });

        // var url = '/api/place/nearbysearch/json'
        // console.log(kw, loc)
        // var params = {
        //     keyword: kw,
        //     location: loc,
        //     radius: 5000,
        //     key: 'AIzaSyC27_uXwB2Wdx05nP3pezmdAH5svn1oqr4',
        // }
        // return axios.get(url,{params})
        // .then(response=>{
        //     return response.data.results
        // })
    },
    async findPlace(query,fieldList){

        const {Place} = await google.maps.importLibrary("places");
        let request = {
            query: query,
            fields: fieldList
        }
        const { places } = await Place.findPlaceFromQuery(request);
        if (places.length){
            console.log(places[0].g)
            return places[0].g
        }
        
        // })
        // var url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json'
        // var params = {
        //     input: query,
        //     inputtype: "textquery",
        //     fields: fields,
        //     key: 'AIzaSyC27_uXwB2Wdx05nP3pezmdAH5svn1oqr4',
        // }
        // return axios.get(url,{params}, {headers: { 
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        // }})
        // .then(response=>{
        //     // return response.data.candidates
        //     console.log(response.data.candidates[0].geometry.location)
        // }) 
    },
    getImage(image){
        if (image == ""){
            return '/assets/img/DSC00788-3.jpg'
        }else if (typeof(image) == 'object'){
            return image.getUrl({maxWidth:221})
        }else{
            return '/assets/img/' + image
        }
    },
    async getGoogleImage(photoObj){
        const imageUrl = photoObj.getUrl({maxWidth:221})
        const response = await fetch(imageUrl);
        if (response.ok){
            const redirectedUrl = response.url
            return redirectedUrl
        }else{
            console.error('Failed to fetch the redirected image URL');
            return ''; // Or provide a placeholder image URL
        }
        // let url = 'https://maps.googleapis.com/maps/api/place/photo'
        // let params = {
        //     photo_reference: photoref,
        //     maxwidth: 221,
        //     key: 'AIzaSyC27_uXwB2Wdx05nP3pezmdAH5svn1oqr4',
        // }
        // return axios.get(url,{params})
        // .then(response=>{
        //     return response
        //     // console.log(response.data.candidates[0].geometry.location)
        // }) 
    },
    // placeAutocomplete(event){ // calls api to get you candidates for search and their place id
    //     var location = event.target
    //     var dayId = location.parentNode.parentNode.id[3]
    //     var query = location.value
    //     var url = '/api/place/autocomplete/json';
    //     var params = {
    //         input: query,
    //         radius: 30000, /// change later on to be dynamic
    //         components: 'country:sg', // change later on to be dynamic
    //         location: '1.2975775529697462, 103.84947406178404', // change later on to be dynamic
    //         key: 'AIzaSyC27_uXwB2Wdx05nP3pezmdAH5svn1oqr4',
    //     }
    //     axios.get(url,{params})
    //         .then(response => {
    //             var predictionList = document.getElementById(`Day${dayId}predictionList`)
    //             predictionList.innerHTML = '' // clear the list of past predictions on each input
    //             var predictions = response.data.predictions
    //             let dayActivities = this.days[dayId].dayActivities
    //             if (predictions.length > 0 ){ // if there are predictions
    //                 predictionList.classList.remove('d-none') // display the list
    //                 for (let p=0;p<predictions.length;p++){
    //                     var desc = predictions[p].description
    //                     var listGroupItem = document.createElement('button') // creating the button for each prediction
    //                     listGroupItem.type = 'button'
    //                     listGroupItem.classList.add('list-group-item')
    //                     listGroupItem.classList.add('list-group-item-action')
    //                     listGroupItem.innerHTML = desc // displaying the place description for each item
    //                     listGroupItem.addEventListener('click',function(){ //making sure that upon click of the prediction, will add it to the activities
    //                         var indivDesc = predictions[p].description // requires definition inside so that the eventlistener is using the correct description (desc var will be updated to be the last prediction description)
    //                         var name = predictions[p].structured_formatting.main_text
    //                         var place_id = predictions[p].place_id
    //                         var actNum = dayActivities.length + 1
    //                         // eslint-disable-next-line vue/no-mutating-props
    //                         dayActivities.push({name:name, number:actNum, description:indivDesc, image:'DSC00788-3.jpg', placeId: place_id}) // at some point get image, push place id
    //                         predictionList.classList.add('d-none') // hiding the list upon selection of prediction
    //                     }.bind(this)) // for eventlistener to have latest data
    //                     predictionList.appendChild(listGroupItem) // adding the button to the lists
    //                 }
    //             }
    //         })
    //         .catch(error=>{
    //             console.log(error)
    //         })
    // },
    delActivity(dayId,actNum){
        var activities = this.days[dayId].dayActivities
        activities.splice(actNum-1,1)
        let startNum = 1;
        for (let a of activities){
            a.number = startNum;
            startNum += 1;
        }
    },
    deleteDay(deleteId){
        this.days.splice(deleteId,1)
        for (let i=0;i<this.days.length;i++){
            // eslint-disable-next-line vue/no-mutating-props
            this.days[i].dayId = i;
        }
        this.date[1].setDate(this.date[1].getDate() - 1)
    },
    getPrintableDate(day){
        let startDate = this.date[0]
        let printableDate = new Date(new Date().setDate(startDate.getDate() + day));
        return printableDate.toDateString()
    },
    addCustomEvent(day,position){
        let dayActivities = this.days[day].dayActivities
        if (position == dayActivities.length){
            let name = document.getElementById(`Day${day}eventName`).value
            let notes = document.getElementById(`Day${day}notes`).value
            let num = dayActivities.length + 1
            dayActivities.push({
                name: name, number: num, description:notes, image: '', placeId: ''
            })
        }
    }
},
}

</script>

<style scoped>

</style>
