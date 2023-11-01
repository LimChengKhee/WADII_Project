<template>
    <div id="testingDiv"></div>
    <div class="row" v-for="day of days" :key="day.dayId" :id="'Day' + day.dayId + 'Row'">
        <div class="col mt-4">
            <div class="card">
                <div class="card-header m-0 row pb-0">
                    <h6 class="p-0 col-1 my-auto">
                        Day {{ day.dayId+1 }}
                    </h6>
                    <button v-if="day.dayActivities.length > 0" type="button" class="mt-0 py-0 col-4 btn btn-link my-auto text-warning text-gradient my-auto px-0 mb-0" data-bs-toggle="modal" @click="initialiseRec(-1)" :data-bs-target="'#filter'+ day.dayId + 'Modal'"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightbulb-fill me-1" style="margin-bottom:0.15rem" viewBox="0 0 16 16">
                            <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                        Add recommended activities
                    </button>
                    <button v-else type="button" class="col-4 btn btn-link text-warning text-gradient my-auto px-0 mb-0" @click="initialiseRec(-1)" data-bs-toggle="modal" :data-bs-target="'#noActivitiesConsideration' + day.dayId + 'Modal'">  
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightbulb-fill me-1" style="margin-bottom:0.15rem" viewBox="0 0 16 16">
                            <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                        Add recommended activities
                    </button>
                    <button type="button" class="py-0 col-3 btn btn-link text-primary text-gradient px-0 mb-0" @click="position = -1" data-bs-toggle="modal" :data-bs-target="'#customEvent' + day.dayId + 'Modal'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle me-1" style="margin-bottom:0.15rem" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        Add custom activity
                    </button>
                    <div class="col-4 p-0 d-inline align-items-center">
                        <div class="input-group bg-gray-100">
                            <span class="input-group-text text-body"><i class="fas fa-search" aria-hidden="true"></i></span>
                            <input type="text" class="form-control"  @input="position = -1, processAutocomplete(day.dayId)" :id="'Day' + day.dayId + 'searchBar'" placeholder="Enter a location..."> <!--@input="processAutocomplete"-->
                        </div>
                    </div>
                </div>
                <div v-if="displayPredictions.day == day.dayId && displayPredictions.psn == '-1'" class="list-group position-absolute bg-gray-100" style="z-index: 2; right:2rem; top:64px; width:17rem">
                    <button v-for="prediction in predictionList" :key="prediction.place_id" type="button" class="list-group-item list-group-item-action" @click="addActivityFromPrediction(day.dayId,prediction,-1)">{{prediction.description}}</button>
                </div>
                <div class="card-body row pt-4 p-3" style="z-index:1">
                <ul class="list-group px-3">
                    <li v-if="day.dayActivities.length==0" class="text-center list-group-item border-0 p-4 mb-2 bg-gray-100 border-radius-lg">
                        <h4 class="my-auto d-inline">No activities found</h4>
                    </li>
                    <li v-else v-for="(activity,actIdx) in day.dayActivities" :key="activity.name" class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                        <div class="col-md-4"><img :src="getImage(activity.image)" class="img-fluid border-radius-lg" style="max-height:300px" alt="..."></div>
                        <div class="col-md-8 position-relative">
                            <div class="ms-4 d-flex flex-column">
                                <span class="row">
                                    <h4 class="mb-3 col-9">Activity {{actIdx+1}} - <span class="text-dark fw-medium">{{activity.name}}</span></h4>
                                    <a class="col-3 px-0 btn btn-link text-danger text-gradient mb-0" @click="delActivity(day.dayId,actIdx)"><i class="far fa-trash-alt me-2"></i>Delete</a>
                                </span>
                                <h4 class="mb-3 text-sm font-weight-bolder">Address/Description:<span class="text-dark fw-medium ms-sm-2">{{activity.description}}</span></h4>
                                <div class="row">
                                    <div class="col">
                                        <div class="dropdown" >
                                            <button class="btn btn-link text-dark p-0 mb-0" data-bs-toggle="dropdown" aria-expanded="false">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-square-fill me-2" viewBox="0 0 16 16">
                                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6H4z"/>
                                                </svg>Insert activity below
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><button type="button" class="dropdown-item" data-bs-toggle="modal" @click="initialiseRec(actIdx)" :data-bs-target="'#filter'+ day.dayId + 'Modal'">Recommended activities</button></li>
                                                <li><hr class="dropdown-divider" style="background-color:lightgray"></li>
                                                <li><button type="button" class="dropdown-item" @click="position=actIdx" data-bs-toggle="modal" :data-bs-target="'#customEvent' + day.dayId + 'Modal'">Custom event</button></li> <!--INSERT STUFF-->
                                                <li><hr class="dropdown-divider" style="background-color:lightgray"></li>
                                                <li><button type="button" class="dropdown-item" @click="position=actIdx" data-bs-toggle="modal" :data-bs-target="'#locationSearch' + day.dayId + 'Modal'" >Activity search</button></li> <!--INSERT STUFF-->
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                </div>
            </div>
        </div>
        <div class="modal fade" :id="'filter'+ day.dayId + 'Modal'" tabindex="-1" :aria-labelledby="'#filter'+ day.dayId + 'Label'" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" :id="'filter'+ day.dayId + 'Label'">Filters</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label :for="'distance' + day.dayId + 'Select'" class="form-label">Please select how far you are willing to travel (in km)</label>
                        <div class="text-center">Current selection: {{distance}} km</div>
                        <input type="range" class="form-range" :id="'distance'+ day.dayId + 'Select'" min="1" max="50" v-model="distance"> 
                        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" :data-bs-target="'#filter'+ day.dayId + 'Collapse'" aria-expanded="false">
                            Filter
                        </button>
                        <div class="collapse" :id="'filter'+ day.dayId + 'Collapse'">
                            <button class="btn btn-outline-secondary my-2" type="button" @click="checkRecommended">
                            Randomise
                            </button>
                            <p class=" d-inline text-success ms-2 fs-6"> Pick up to 3 types of activities </p>
                            <div v-for="(searchType,name) in types">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox"
                                    v-model="selectedTypes" :value="searchType" :id="day.dayId + searchType + 'Check'">
                                    <label class="form-check-label" :for="day.dayId + searchType + 'Check'">
                                        {{ name }}
                                    </label>
                                    <p class="d-inline text-success text-sm ms-2 fs-6" v-if="recommendedTypes.includes(searchType)">Recommended</p>
                                    <p class="d-inline text-success ms-1 fs-6" v-if="searchType == 'tourist_attraction'">(Might overlap) </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div v-if="selectedTypes.length > 0 && selectedTypes.length <=3">
                            <button v-if="checkPreviousMeal(day.dayId)" type="button" class="btn btn-secondary" data-bs-toggle="modal" :data-bs-target="'#mealConsideration' + day.dayId + 'Modal'">Search</button>
                            <button v-else type="button" class="btn btn-primary" @click="recommendAny(day.dayId)" data-bs-toggle="modal" :data-bs-target="'#recommend' + day.dayId + 'Modal'">Search</button>
                        </div>
                        <p class="fs-5 text-danger" v-else-if="selectedTypes.length > 3">Please select at most 3 categories.</p>
                        <p class="fs-5 text-danger" v-else>Please select at least one category.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" :id="'recommend' + day.dayId + 'Modal'" tabindex="-1" :aria-labelledby="'recommend' + day.dayId + 'ModalLabel'" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" :id="'recommend' + day.dayId + 'ModalLabel'">Recommended activities</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body mx-auto">
                        <template v-if="slicedRecs.length ==0 && anyRecs[0] != anyRecs[1]">
                            <div class="spinner-border text-primary" role="status">
                            </div>
                            <div>Loading...</div>
                        </template>
                        <div v-if="slicedRecs.length == 0 && anyRecs[0] == anyRecs[1]">There are no results for your search parameters</div>
                        <div v-for="(rec,index) in slicedRecs">
                            <div class="card mb-3 px-0" style="max-width: 665px;">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img :src="getImage(rec.photo)" class="img-fluid border-radius-lg" alt="...">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body row">
                                            <h5 class="card-title col-10"> {{rec.name}} - {{rec.address}} </h5>
                                            <p class="card-text fs-6">
                                                <span class="fw-bold">Cost:</span> {{displayCost(rec.price_level)}} <br>
                                                <span class="fw-bold">Ratings:</span> {{rec.rating[0]}} ({{rec.rating[1]}} reviews)<br>
                                                <a :href="rec.url" class="text-dark fw-bold" target="_blank">Link</a>
                                            </p>
                                        </div>
                                        <button type="button" @click="chooseRec(index)" class="btn btn-primary mx-2 mb-2">Add to Day {{day.dayId + 1}}</button>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger me-3" :disabled="sliceCount==0" @click="sliceCount--">Previous Page</button>
                        <button type="button" class="btn btn-success me-3" :disabled="sliceCount==(numPages-1)" @click="sliceCount++">Next Page</button>
                        <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close (Reset recommendations!)</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addActivityFromReccs(day.dayId)" :disabled="selectedRec.length==0">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" :id="'mealConsideration' + day.dayId + 'Modal'" tabindex="-1" :aria-labelledby="'mealConsideration' + day.dayId + 'Label'" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" :id="'mealConsideration' + day.dayId + 'Label'">Suggestion</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>As your previous activity is a meal, we suggest that you avoid <span class="text-primary">intense activities</span> for an hour or two.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="recommendAny(day.dayId)" data-bs-toggle="modal" :data-bs-target="'#recommend' + day.dayId + 'Modal'">Ignore suggestion</button>
                        <button type="button" class="btn btn-primary" @click="recommendNonIntense(day.dayId)" data-bs-toggle="modal" :data-bs-target="'#recommend' + day.dayId + 'Modal'">Choose non-intense activity</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" :id="'noActivitiesConsideration' + day.dayId + 'Modal'" tabindex="-1" :aria-labelledby="'noActivitiesConsideration' + day.dayId + 'Label'" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" :id="'noActivitiesConsideration' + day.dayId + 'Label'">Suggestion</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Since you have no activities added for this day currently, we recommend choosing a breakfast location first. 
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="chooseBreakfast" data-bs-toggle="modal" :data-bs-target="'#recommend' + day.dayId + 'Modal'" class="btn btn-success mx-2">OK</button>
                        <button type="button" data-bs-toggle="modal" :data-bs-target="'#filter' + day.dayId + 'Modal'" class="btn btn-danger mx-2">Skip breakfast for now</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" :id="'customEvent' + day.dayId + 'Modal'" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Creating custom event</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label :for="day.dayId + 'customName'" class="form-label">Event Name</label>
                            <input type="text" class="form-control" :id="day.dayId + 'customName'">
                        </div>
                        <div class="mb-3">
                            <label :for="day.dayId + 'customNotes'" class="form-label">Event Notes</label>
                            <input type="text" class="form-control" :id="day.dayId + 'customNotes'">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-success" @click="addCustomEvent(day.dayId)" data-bs-dismiss="modal">Add custom activity</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade modal-lg" :id="'locationSearch' + day.dayId + 'Modal'" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Searching for location</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <input type="text" class="form-control"  @input="processAutocomplete(day.dayId)" :id="'Day' + day.dayId + 'modalAutocomplete'"  placeholder="Enter a location...">
                        </div>
                        <div>
                            <div class="row" v-if="displayPredictions.day == day.dayId && displayPredictions.psn != '-1'">
                                <div class="col-12">
                                <div class="card mb-4">
                                    <div class="card-header pb-0">
                                    <h6>Predictions</h6>
                                    </div>
                                    <div class="card-body px-0 pt-0 pb-2">
                                    <div class="table-responsive p-0">
                                        <table class="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                            <th class="text-uppercase text-black text-xxs font-weight-bolder opacity-7">Name/Description</th>
                                            <th class="text-uppercase text-black text-xxs font-weight-bolder opacity-7 ps-2">Choose 1</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="prediction in predictionList" :key="prediction.place_id">
                                            <td>
                                                <div class="d-flex px-2 py-1">
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-0 text-sm">{{prediction.description}}</h6>
                                                </div>
                                                </div>
                                            </td>
                                            <td>
                                                <button type="button" class="mb-0 btn btn-primary" @click="selectedPrediction = prediction">Select</button>
                                            </td>
                                            </tr>
                                        </tbody>
                                        </table>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-success" @click="addActivityFromPrediction(day.dayId,selectedPrediction,position)" data-bs-dismiss="modal">Add selected item to day</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
//  import statements
import '../assets/day.css';
// import axios from 'axios';


export default {
props: [
    // props
    'allActivities',
    'days',
    'date',
    'originLoc',
    'originName',
    'openModal'
],
name: 'Day_Component',
components: {
    // importing components from other places
},
data () {
// local repository of information
    return {
        selectedPrediction: "",
        recs: [],
        // respLength: 0,
        selectedRec: [],
        anyRecs: [],
        distance: 5,
        sliceCount: 0,
        mealTypes: ['meal','bakery','cafe','restaurant'],
        types: {'Amusement parks':'amusement_park',
                'Aquariums':'aquarium', 
                'Art galleries': 'art_gallery',
                'Bakeries':'bakery',
                'Bars':'bar',
                'Book stores': 'book_store', 
                'Bowling alleys': 'bowling_alley',
                'Cafes':'cafe',
                'Casinos':'casino',
                'Gyms':'gym', 
                'Libraries':'library',
                'Movie theaters':'movie_theater',
                'Museums':'museum', 
                'Night clubs':'night_club',
                'Parks':'park',
                'Restaurants':'restaurant',
                'Shopping malls':'shopping_mall',
                'Spas':'spa',
                'Stadiums':'stadium',
                'Tourist attractions':'tourist_attraction',
                'Zoos':'zoo'
            },

        countryList: {
            'Afghanistan': 'AF',
            'Aland Islands': 'AX',
            'Albania': 'AL',
            'Algeria': 'DZ',
            'American Samoa': 'AS',
            'Andorra': 'AD',
            'Angola': 'AO',
            'Anguilla': 'AI',
            'Antarctica': 'AQ',
            'Antigua And Barbuda': 'AG',
            'Argentina': 'AR',
            'Armenia': 'AM',
            'Aruba': 'AW',
            'Australia': 'AU',
            'Austria': 'AT',
            'Azerbaijan': 'AZ',
            'Bahamas': 'BS',
            'Bahrain': 'BH',
            'Bangladesh': 'BD',
            'Barbados': 'BB',
            'Belarus': 'BY',
            'Belgium': 'BE',
            'Belize': 'BZ',
            'Benin': 'BJ',
            'Bermuda': 'BM',
            'Bhutan': 'BT',
            'Bolivia': 'BO',
            'Bosnia And Herzegovina': 'BA',
            'Botswana': 'BW',
            'Bouvet Island': 'BV',
            'Brazil': 'BR',
            'British Indian Ocean Territory': 'IO',
            'Brunei Darussalam': 'BN',
            'Bulgaria': 'BG',
            'Burkina Faso': 'BF',
            'Burundi': 'BI',
            'Cambodia': 'KH',
            'Cameroon': 'CM',
            'Canada': 'CA',
            'Cape Verde': 'CV',
            'Cayman Islands': 'KY',
            'Central African Republic': 'CF',
            'Chad': 'TD',
            'Chile': 'CL',
            'China': 'CN',
            'Christmas Island': 'CX',
            'Cocos (Keeling) Islands': 'CC',
            'Colombia': 'CO',
            'Comoros': 'KM',
            'Congo': 'CG',
            'Congo, Democratic Republic': 'CD',
            'Cook Islands': 'CK',
            'Costa Rica': 'CR',
            "Cote D'Ivoire": 'CI',
            'Croatia': 'HR',
            'Cuba': 'CU',
            'Cyprus': 'CY',
            'Czech Republic': 'CZ',
            'Denmark': 'DK',
            'Djibouti': 'DJ',
            'Dominica': 'DM',
            'Dominican Republic': 'DO',
            'Ecuador': 'EC',
            'Egypt': 'EG',
            'El Salvador': 'SV',
            'Equatorial Guinea': 'GQ',
            'Eritrea': 'ER',
            'Estonia': 'EE',
            'Ethiopia': 'ET',
            'Falkland Islands (Malvinas)': 'FK',
            'Faroe Islands': 'FO',
            'Fiji': 'FJ',
            'Finland': 'FI',
            'France': 'FR',
            'French Guiana': 'GF',
            'French Polynesia': 'PF',
            'French Southern Territories': 'TF',
            'Gabon': 'GA',
            'Gambia': 'GM',
            'Georgia': 'GE',
            'Germany': 'DE',
            'Ghana': 'GH',
            'Gibraltar': 'GI',
            'Greece': 'GR',
            'Greenland': 'GL',
            'Grenada': 'GD',
            'Guadeloupe': 'GP',
            'Guam': 'GU',
            'Guatemala': 'GT',
            'Guernsey': 'GG',
            'Guinea': 'GN',
            'Guinea-Bissau': 'GW',
            'Guyana': 'GY',
            'Haiti': 'HT',
            'Heard Island & Mcdonald Islands': 'HM',
            'Holy See (Vatican City State)': 'VA',
            'Honduras': 'HN',
            'Hong Kong': 'HK',
            'Hungary': 'HU',
            'Iceland': 'IS',
            'India': 'IN',
            'Indonesia': 'ID',
            'Iran, Islamic Republic Of': 'IR',
            'Iraq': 'IQ',
            'Ireland': 'IE',
            'Isle Of Man': 'IM',
            'Israel': 'IL',
            'Italy': 'IT',
            'Jamaica': 'JM',
            'Japan': 'JP',
            'Jersey': 'JE',
            'Jordan': 'JO',
            'Kazakhstan': 'KZ',
            'Kenya': 'KE',
            'Kiribati': 'KI',
            'Korea': 'KR',
            'Kuwait': 'KW',
            'Kyrgyzstan': 'KG',
            "Lao People's Democratic Republic": 'LA',
            'Latvia': 'LV',
            'Lebanon': 'LB',
            'Lesotho': 'LS',
            'Liberia': 'LR',
            'Libyan Arab Jamahiriya': 'LY',
            'Liechtenstein': 'LI',
            'Lithuania': 'LT',
            'Luxembourg': 'LU',
            'Macao': 'MO',
            'Macedonia': 'MK',
            'Madagascar': 'MG',
            'Malawi': 'MW',
            'Malaysia': 'MY',
            'Maldives': 'MV',
            'Mali': 'ML',
            'Malta': 'MT',
            'Marshall Islands': 'MH',
            'Martinique': 'MQ',
            'Mauritania': 'MR',
            'Mauritius': 'MU',
            'Mayotte': 'YT',
            'Mexico': 'MX',
            'Micronesia, Federated States Of': 'FM',
            'Moldova': 'MD',
            'Monaco': 'MC',
            'Mongolia': 'MN',
            'Montenegro': 'ME',
            'Montserrat': 'MS',
            'Morocco': 'MA',
            'Mozambique': 'MZ',
            'Myanmar': 'MM',
            'Namibia': 'NA',
            'Nauru': 'NR',
            'Nepal': 'NP',
            'Netherlands': 'NL',
            'Netherlands Antilles': 'AN',
            'New Caledonia': 'NC',
            'New Zealand': 'NZ',
            'Nicaragua': 'NI',
            'Niger': 'NE',
            'Nigeria': 'NG',
            'Niue': 'NU',
            'Norfolk Island': 'NF',
            'Northern Mariana Islands': 'MP',
            'Norway': 'NO',
            'Oman': 'OM',
            'Pakistan': 'PK',
            'Palau': 'PW',
            'Palestinian Territory, Occupied': 'PS',
            'Panama': 'PA',
            'Papua New Guinea': 'PG',
            'Paraguay': 'PY',
            'Peru': 'PE',
            'Philippines': 'PH',
            'Pitcairn': 'PN',
            'Poland': 'PL',
            'Portugal': 'PT',
            'Puerto Rico': 'PR',
            'Qatar': 'QA',
            'Reunion': 'RE',
            'Romania': 'RO',
            'Russian Federation': 'RU',
            'Rwanda': 'RW',
            'Saint Barthelemy': 'BL',
            'Saint Helena': 'SH',
            'Saint Kitts And Nevis': 'KN',
            'Saint Lucia': 'LC',
            'Saint Martin': 'MF',
            'Saint Pierre And Miquelon': 'PM',
            'Saint Vincent And Grenadines': 'VC',
            'Samoa': 'WS',
            'San Marino': 'SM',
            'Sao Tome And Principe': 'ST',
            'Saudi Arabia': 'SA',
            'Senegal': 'SN',
            'Serbia': 'RS',
            'Seychelles': 'SC',
            'Sierra Leone': 'SL',
            'Singapore': 'SG',
            'Slovakia': 'SK',
            'Slovenia': 'SI',
            'Solomon Islands': 'SB',
            'Somalia': 'SO',
            'South Africa': 'ZA',
            'South Georgia And Sandwich Isl.': 'GS',
            'Spain': 'ES',
            'Sri Lanka': 'LK',
            'Sudan': 'SD',
            'Suriname': 'SR',
            'Svalbard And Jan Mayen': 'SJ',
            'Swaziland': 'SZ',
            'Sweden': 'SE',
            'Switzerland': 'CH',
            'Syrian Arab Republic': 'SY',
            'Taiwan': 'TW',
            'Tajikistan': 'TJ',
            'Tanzania': 'TZ',
            'Thailand': 'TH',
            'Timor-Leste': 'TL',
            'Togo': 'TG',
            'Tokelau': 'TK',
            'Tonga': 'TO',
            'Trinidad And Tobago': 'TT',
            'Tunisia': 'TN',
            'Turkey': 'TR',
            'Turkmenistan': 'TM',
            'Turks And Caicos Islands': 'TC',
            'Tuvalu': 'TV',
            'Uganda': 'UG',
            'Ukraine': 'UA',
            'United Arab Emirates': 'AE',
            'United Kingdom': 'GB',
            'United States': 'US',
            'United States Outlying Islands': 'UM',
            'Uruguay': 'UY',
            'Uzbekistan': 'UZ',
            'Vanuatu': 'VU',
            'Venezuela': 'VE',
            'Viet Nam': 'VN',
            'Virgin Islands, British': 'VG',
            'Virgin Islands, U.S.': 'VI',
            'Wallis And Futuna': 'WF',
            'Western Sahara': 'EH',
            'Yemen': 'YE',
            'Zambia': 'ZM',
            'Zimbabwe': 'ZW',
            'North Macedonia': 'MK',
            'Češka': 'CZ'
        },
        countryName: "Australia",
        country: "",
        predictionList: [],
        selectedTypes: ['tourist_attraction','museum','cafe'],
        topAttractions: [],
        position: 0,
        displayPredictions: {},
        recommendedTypes: ['tourist_attraction','park','museum','cafe', 'aquarium', 'zoo'],
        openedModal: false
    }
},
computed: {
    // computed properties
    slicedRecs(){
        if (this.sliceCount == 0){
            return this.recs.slice(0,20)
        }else if (this.sliceCount == 1){
            return this.recs.slice(20,40)
        }else{
            return this.recs.slice(40,60)
        }
    },
    numPages(){
        if (this.recs.length <= 20){
            return 1
        }
        else if (this.recs.length <= 40){
            return 2
        }
        else{
            return 3
        }
    },
},

// start of lifecycle
async mounted () {
    this.country = this.getCountryCode(this.countryName)
    this.setTriggers()
},

methods: {
    setTriggers(){
        setTimeout(()=>{let modalTriggerList = document.querySelectorAll('div.modal')
            for (let modal of modalTriggerList){
                if (modal.getAttribute('added-listener') == undefined){
                    modal.setAttribute('added-listener','true')
                    modal.addEventListener('show.bs.modal', event => {
                        this.$parent.changeOpenModal()
                    })
                    modal.addEventListener('hidden.bs.modal', event => {
                        this.$parent.changeOpenModal()
                })
            }
        }
        },50)
        
    },
    checkPreviousMeal(dayId){
        if (this.days[dayId].dayActivities.length == 0 || this.position == -1){
            return false
        }else{
            return this.mealTypes.includes(this.days[dayId].dayActivities[this.position].type)
        }
        
    },
    initialiseRec(actIndex){
        this.recs = []
        this.selectedRec = []
        this.position = actIndex

        
    },
    getImage(image){
        if (image == "custom"){
            return '/assets/img/customevent.jpg'
        }else if (typeof(image) == 'object'){
            return image.getUrl({maxHeight:300})
        }else{
            return '/assets/img/noimage.png'
        }
    },
    getCountryCode(countryName){
        return this.countryList[countryName]
    },
    checkRecommended(){
        if (this.selectedTypes.length > 0){
            this.selectedTypes = []
        }else{
            const uniqueNumbers = new Set();
            while (uniqueNumbers.size < 3) {
                uniqueNumbers.add(Math.floor(Math.random() * 6));
            }
            let tempArr = Array.from(uniqueNumbers);
            this.selectedTypes = [this.recommendedTypes[tempArr[0]],this.recommendedTypes[tempArr[1]],this.recommendedTypes[tempArr[2]]]
        }
    },
    getTopAttractions(){
        var search = "tourist attractions in " + this.countryName
        for (let i=0;i<this.days.length;i++){
            if (this.originName != ""){
                var search = "tourist attractions near " + this.originName
                break
            }
        }
        var attractionsCount = 0
        var topAttractions = [];
        return new Promise((resolve) => {
            this.textSearch(search).then(resp =>{
                for (let p of resp){
                    if (attractionsCount == 9){
                        resolve(topAttractions)
                        break;
                    }
                    if (p.rating < 4 || p.user_ratings_total < 50){
                        continue;
                    }
                    this.getPlaceDetails(p.place_id,['url']).then(result =>{   
                        if (result == "No results"){
                            var url = ""
                        }else{
                            var url = result.url
                        }
                        topAttractions.push({"name": p.name, "address" : p.formatted_address, "rating" : [p.rating,p.user_ratings_total], "photo" : p.photos[0], "url": url})
                    })
                    attractionsCount++;
                }
            })
        })

    },
    async textSearch(kw){
        var testDiv = document.getElementById('testingDiv');
        const { PlacesService } = await google.maps.importLibrary('places');
            var request = {
                query: kw
            }
        var service = new PlacesService(testDiv);
        var finished = false;
        var pageCount = 0;
        var final = []
        return new Promise((resolve, reject) => {
            service.textSearch(request, (results, status, pagination) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                if (pagination.hasNextPage && pageCount <1) {
                    final = final.concat(results) 
                    pagination.nextPage(); // Fetches the next 20 results from the next page.
                    pageCount += 1;
                }else{
                    final = final.concat(results)
                    finished = true;
                }
                if (finished == true){
                    resolve(final)
                }
            }
            else if(status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS){
                resolve("No valid results")
            } 
            else {
                    reject(new Error(`Places service request failed with status: ${status}`));
            }
            });
        });
    },
    chooseBreakfast(){
        var range = this.distance * 1000
        var keyword = 'breakfast'
        this.recs = []
        this.sliceCount = 0
        this.anyRecs = [1,0]
        this.nearbySearch(keyword,this.originLoc,range,60).then(resp =>{
            if (resp == "No valid results"){
                this.anyRecs[1]++;
            }else{
                for (let p of resp){
                    this.getPlaceDetails(p.place_id,['url']).then(result =>{   
                        if (result == "No results"){
                            var url = ""
                        }else{
                            var url = result.url
                        }
                        this.recs.push({"name": p.name, "address" : p.vicinity, "rating" : [p.rating,p.user_ratings_total], "cost": p.price_level, "photo" : p.photos[0], "url": url, "type":"meal"})
                    })
                }
            }
        })  
    },
    recommendAny(dayId){
        if (this.days[dayId].dayActivities.length == 0 || this.position == -1){
            var origin = this.originLoc
        }else{
            var prevAct = this.days[dayId].dayActivities[this.position]
            if (prevAct.type == "custom"){
                var origin = this.originLoc
            }else{
                var origin = prevAct.description
            }
        }
        this.sliceCount = 0
        var range = this.distance * 1000
        var types = this.selectedTypes
        var numReccsPerType = Math.floor(60/types.length)
        var reccsLeft = 60
        this.recs = []
        this.anyRecs = [types.length,0]
        var acceptableRating = 4
        if (typeof origin == 'object'){
            for (let i=0;i<types.length;i++){
                this.nearbySearch(types[i],origin,range,numReccsPerType).then(resp =>{
                    if (resp == "No valid results"){
                        this.anyRecs[1]++;
                    }
                    else{
                        if (resp.length < 5){
                            acceptableRating = 3.5
                        }
                        var pushCount = 0
                        for (let p of resp){
                            if (pushCount >= numReccsPerType){
                                break;
                            }
                            if (p.rating === undefined){
                                continue
                            }
                            if (p.rating < acceptableRating || p.user_ratings_total < 50 || p.business_status != "OPERATIONAL"){
                                continue;
                            }
                            if (p.types.includes('car_dealer')){
                                continue;
                            }
                            this.getPlaceDetails(p.place_id,['url']).then(result =>{   
                                if (p.vicinity === undefined){
                                var address = ""
                                }else{
                                    var address = p.vicinity
                                }
                                if (p.rating === undefined){
                                    var rating = ["-", "-"]
                                }else{
                                    var rating = [p.rating,p.user_ratings_total]
                                }
                                if (p.price_level === undefined){
                                    var cost = 0
                                }else{
                                    var cost = p.price_level
                                }
                                if (p.photos === undefined){
                                    var photo = ""
                                }else{
                                    var photo = p.photos[0]
                                }
                                if (result == "No results"){
                                    var url = ""
                                }else{
                                    var url = result.url
                                }
                                this.recs.push({"name": p.name, "address" : address, "rating" : rating, "cost": cost, "photo" : photo, "url": url, "type":types[i]})
                            })
                            pushCount++;
                        }
                        reccsLeft = reccsLeft - pushCount
                        if (pushCount < numReccsPerType){
                            numReccsPerType = Math.floor(reccsLeft / (types.length-1-i))
                        }
                        if (pushCount == 0){
                            this.anyRecs[1]++;
                        }
                    }
                })
            }
        }else{
            this.findPlace(origin,['geometry'],this.originLoc).then(result=>
            {   
                result = result.geometry.location
                for (let i=0;i<types.length;i++){
                    this.nearbySearch(types[i],result,range,numReccsPerType).then(resp =>{
                        if (resp == "No valid results"){
                            this.anyRecs[1]++;
                        }
                        else{
                            if (resp.length < 5){
                                acceptableRating = 3.5
                            }
                            var pushCount = 0
                            for (let p of resp){
                                if (pushCount >= numReccsPerType){
                                    break;
                                }
                                if (p.rating === undefined){
                                    continue
                                }
                                if (p.rating < acceptableRating || p.user_ratings_total < 50 || p.business_status != "OPERATIONAL"){
                                    continue;
                                }
                                if (p.types.includes('car_dealer')){
                                    continue;
                                }
                                this.getPlaceDetails(p.place_id,['url']).then(result =>{   
                                    if (p.vicinity === undefined){
                                    var address = ""
                                    }else{
                                        var address = p.vicinity
                                    }
                                    if (p.rating === undefined){
                                        var rating = ["-", "-"]
                                    }else{
                                        var rating = [p.rating,p.user_ratings_total]
                                    }
                                    if (p.price_level === undefined){
                                        var cost = 0
                                    }else{
                                        var cost = p.price_level
                                    }
                                    if (p.photos === undefined){
                                        var photo = ""
                                    }else{
                                        var photo = p.photos[0]
                                    }
                                    if (result == "No results"){
                                        var url = ""
                                    }else{
                                        var url = result.url
                                    }
                                    this.recs.push({"name": p.name, "address" : address, "rating" : rating, "cost": cost, "photo" : photo, "url": url, "type":types[i]})
                                })
                                pushCount++;
                            }
                            reccsLeft = reccsLeft - pushCount
                            if (pushCount < numReccsPerType){
                                numReccsPerType = Math.floor(reccsLeft / (types.length-1-i))
                            }
                            if (pushCount == 0){
                                this.anyRecs[1]++;
                            }
                        }
                    })
                }
            })
    }
    },  
    recommendNonIntense(dayId){
        if (this.days[dayId].dayActivities.length == 0 || this.position == -1){
            var origin = this.originLoc
        }else{
            var prevAct = this.days[dayId].dayActivities[this.position]
            if (prevAct.type == "custom"){
                var origin = this.originLoc
            }else{
                var origin = prevAct.description
            }
        }
        this.sliceCount = 0
        var range = this.distance * 1000
        var types = ['aquarium','art_gallery', 'museum', 'park', 'shopping_mall', 'zoo', 'tourist_attraction']
        var numReccsPerType = Math.floor(60/types.length)
        var reccsLeft = 60
        this.recs = []
        this.anyRecs = [types.length,0]
        if (typeof origin == "object"){
            for (let i=0;i<types.length;i++){
                this.nearbySearch(types[i],origin,range,numReccsPerType).then(resp =>{
                    if (resp == "No valid results"){
                        this.anyRecs[1]++;
                    }else{
                        var pushCount = 0
                        // update numReccsPerType if resp.length < numReccsPerType
                        for (let p of resp){
                            if (pushCount >= numReccsPerType){
                                break;
                            }
                            if (p.rating < 4 || p.user_ratings_total < 50){
                                continue;
                            }
                            this.getPlaceDetails(p.place_id,['url']).then(result =>{   
                                if (result == "No results"){
                                    var url = ""
                                }else{
                                    var url = result.url
                                }
                                this.recs.push({"name": p.name, "address" : p.vicinity, "rating" : [p.rating,p.user_ratings_total], "cost": p.price_level, "photo" : p.photos[0], "url": url, "type":types[i]})
                            })
                            pushCount++;
                        }
                        reccsLeft = reccsLeft - pushCount
                        if (pushCount < numReccsPerType){
                            numReccsPerType = Math.floor(reccsLeft / (types.length-1-i))
                        }
                    }
                })
            }
        }else{
            this.findPlace(origin,['geometry'],this.originLoc).then(result=>
            {   
                result = result.geometry.location
                for (let i=0;i<types.length;i++){
                    this.nearbySearch(types[i],result,range,numReccsPerType).then(resp =>{
                        if (resp == "No valid results"){
                            this.anyRecs[1]++;
                        }else{
                            var pushCount = 0
                            // update numReccsPerType if resp.length < numReccsPerType
                            for (let p of resp){
                                if (pushCount >= numReccsPerType){
                                    break;
                                }
                                if (p.rating < 4 || p.user_ratings_total < 50){
                                    continue;
                                }
                                if (p.vicinity === undefined){
                                    var address = ""
                                }else{
                                    var address = p.vicinity
                                }
                                if (p.rating === undefined){
                                    var rating = ["-", "-"]
                                }else{
                                    var rating = [p.rating,p.user_ratings_total]
                                }
                                if (p.price_level === undefined){
                                    var cost = 0
                                }else{
                                    var cost = p.price_level
                                }
                                if (p.photos === undefined){
                                    var photo = ""
                                }else{
                                    var photo = p.photos[0]
                                }
                                if (result == "No results"){
                                    var url = ""
                                }else{
                                    var url = result.url
                                }
                                this.getPlaceDetails(p.place_id,['url']).then(result =>{   
                                    if (result == "No results"){
                                        var url = ""
                                    }else{
                                        var url = result.url
                                    }
                                    this.recs.push({"name": p.name, "address" : address, "rating" : rating, "cost": cost, "photo" : photo, "url": url, "type":types[i]})
                                })
                                pushCount++;
                            }
                            reccsLeft = reccsLeft - pushCount
                            if (pushCount < numReccsPerType){
                                numReccsPerType = Math.floor(reccsLeft / (types.length-1-i))
                            }
                        }
                    })
                }
            })
        }
    },  
    displayCost(price_level){
        let displayedCost = "-" 
        for (let i=0;i<price_level;i++){
            displayedCost += '$'
        }
        return displayedCost
    },
    chooseRec(index){
        if (this.sliceCount == 0){
            this.selectedRec = this.recs[index]
        }else if (this.sliceCount == 1){
            this.selectedRec = this.recs[index+20]
        }else{
            this.selectedRec = this.recs[index+40]
        }
    }, 
    addActivityFromReccs(dayId){
        if (this.selectedRec != []){
            var a = this.selectedRec
            var actName = a.name
            var image = a.photo
            var actDesc = a.address 
            var type = a.type
            if (this.position == -1){
                this.days[dayId].dayActivities.unshift({'name':actName, 'description':actDesc, 'image':image, 'type':type})
            }else{
                this.days[dayId].dayActivities.splice(this.position+1,0,{'name':actName, 'description':actDesc, 'image':image, 'type':type})
            }
        }
    },
    addActivityFromPrediction(dayId,prediction,position){
        if (position == -1){
            let autoInput = document.getElementById('Day' + dayId + 'searchBar')
            autoInput.value = ""
        }else{
            let autoInput = document.getElementById('Day' + dayId + 'modalAutocomplete')
            autoInput.value = ""
        }
        this.displayPredictions = {}
        this.getPlaceDetails(prediction.place_id,['name','vicinity','photos']).then(result=>{
            console.log(result)
            // eslint-disable-next-line vue/no-mutating-props
            if (result.photos === undefined){
                var image = ""
            }else{
                var image = result.photos[0]
            }
            if(result.vicinity === undefined){
                var address  = "No result found"
            }else{
                var address  = result.vicinity
            }
            if (position == -1){
                this.days[dayId].dayActivities.unshift({'name':result.name, 'description':address, 'image':image, 'type':'prediction'})
            }
            else{
                this.days[dayId].dayActivities.splice(position+1,0,{'name':result.name, 'description':address, 'image':image, 'type':'prediction'})
            }
        })

        
        
    },
    async nearbySearch(kw, loc, dist, numReccs) {
        var testDiv = document.getElementById('testingDiv');
        const { PlacesService } = await google.maps.importLibrary('places');
        if (kw == "breakfast"){
            var request = {
                location: loc,
                radius: dist,
                keyword: "breakfast",
            }
        }
        else{
            var request = {
                location: loc,
                radius: dist,
                type: kw,
            }   
        }

        var service = new PlacesService(testDiv);
        var finished = false;
        var pageCount = 0;
        var final = []
        return new Promise((resolve, reject) => {
            service.nearbySearch(request, (results, status, pagination) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                if (numReccs <= 20){
                    final = results
                    finished = true
                }else{
                    if (numReccs > 20 && numReccs <= 40){
                        if (pageCount == 1 || !pagination.hasNextPage){
                            finished = true
                            final = final.concat(results)
                        }else{
                            final = final.concat(results)
                            pagination.nextPage(); // Fetches the next 20 results from the next page.
                            pageCount = 1;
                        }
                    }else{
                        if (pageCount == 2 || !pagination.hasNextPage){
                            finished = true
                            final = final.concat(results)
                        }else{
                            final = final.concat(results) 
                            pagination.nextPage(); // Fetches the next 20 results from the next page.
                            pageCount++;
                        }
                    }
                }
                if (finished == true){
                    resolve(final)
                }
            }
            else if(status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS){
                resolve("No valid results")
            } 
            else {
                    reject(new Error(`Places service request failed with status: ${status}`));
            }
            });
        });
    },
    async findPlace(query,fieldList,locBias){
        var testDiv = document.getElementById('testingDiv');
        const {PlacesService} = await google.maps.importLibrary("places");
        let request = {
            query: query,
            fields: fieldList,
            locationBias: locBias,
        }
        var service = new PlacesService(testDiv);
        return new Promise((resolve, reject) => {service.findPlaceFromQuery(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve(results[0]); // Resolve the promise with the results
            }
            else if(status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS){
                resolve("No results")
            }
            else{
                reject(new Error(`Places service request failed with status: ${status}`));
            }
        })
        })

    },
    async getPlaceDetails(id,fieldList){
        var testDiv = document.getElementById('testingDiv');
        const {PlacesService} = await google.maps.importLibrary("places");
        let request = {
            placeId: id,
            fields: fieldList
        }
        var service = new PlacesService(testDiv);
        return new Promise((resolve, reject) => {
            service.getDetails(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                    resolve(results)
            }else if(status === google.maps.places.PlacesServiceStatus.NOT_FOUND){
                resolve("Place not found")
            }
            else if(status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS){
                resolve("No valid results")
            }
            else{
                    reject (new Error(`Places service request failed with status: ${status}`));
                }
            });
        });
    },
    processAutocomplete(dayId){
        if (this.position == -1){
            var value = document.getElementById('Day' + dayId + 'searchBar').value
        }else{
            var value = document.getElementById('Day' + dayId + 'modalAutocomplete').value
        }
        this.displayPredictions = {day: dayId, psn: this.position}
        this.predictionList = []
        this.placeAutocomplete(value,this.originLoc,this.country).then(suggestions =>{
            if (suggestions == "No valid results"){
                this.predictionList = []
            }
            else{
                this.predictionList = suggestions
            }
        })
    },
    async placeAutocomplete(query,bias,c){
        const {AutocompleteService} = await google.maps.importLibrary("places");
        var request = {
            input: query,
            componentRestrictions: {country:c}, // change later on to be dynamic
            origin: bias,
        }
        var service = new AutocompleteService();
        return new Promise((resolve,reject) => {
            service.getPlacePredictions(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve(results)
            }else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS){
                resolve("No valid results")
            }
            else{
                reject (new Error(`Places service request failed with status: ${status}`));
            }
        })
    })
    },
    delActivity(dayId,actIndex){
        this.days[dayId].dayActivities.splice(actIndex,1)
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
    addCustomEvent(dayId){ // Make dynamic for all positions
        let dayActivities = this.days[dayId].dayActivities
        let nameElem = document.getElementById(dayId + 'customName')
        let notesElem = document.getElementById(dayId + 'customNotes')
        let name = nameElem.value
        let notes = notesElem.value
        nameElem.value = ""
        notesElem.value = ""
        if (this.position == -1){
            dayActivities.unshift({
                'name': name, 'description':notes, 'image': 'custom', 'type':'custom'
        })
        }else{
            dayActivities.splice(this.position+1,0,{
                'name': name, 'description':notes, 'image': 'custom', 'placeId': '', 'type':'custom'
            })
        }
    }
},
}

</script>

<style scoped>

</style>
