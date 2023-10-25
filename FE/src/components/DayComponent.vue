<template>

<div v-for="day of days" :key='day.dayId'  class="row">
    <p class="d-inline">
         Day {{ day.dayId + 1 }}  ({{getPrintableDate(day.dayId)}})
        <button type="button" @click="deleteDay(day.dayId)" class="btn btn-outline-danger" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: 0.6rem; margin-left:0.5rem">Delete Day</button>
        <button style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .5rem; margin-left: 35rem" class="btn btn-secondary d-inline float-end" type="button" data-bs-toggle="collapse" :data-bs-target="'#Day' + day.dayId + 'Collapse'" aria-expanded="false" aria-controls="collapseExample">
            Expand Day
        </button>
        
    </p>
    <div class="collapse" :id="'Day' + day.dayId + 'Collapse'">
        <div v-if="day.dayActivities.length>=0" > 
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
            <button type="button" class="btn btn-outline-primary mb-3" data-bs-toggle="modal" @click="source='end', recs=[], loadingRecs=false" data-bs-target="#filterModal">Recommend me activities!</button>
            <div class="modal fade" id="filterModal" tabindex="-1" aria-labelledby="filterLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="filterLabel">Filters</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label for="distanceSelect" class="form-label">Please select how far you are willing to travel (in km)</label>
                            <div class="text-center">Current selection: {{distance}} km</div>
                            <input type="range" class="form-range" id="distanceSelect" min="1" max="50" v-model="distance">
                            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#filterCollapse" aria-expanded="false" aria-controls="collapseExample">
                                Filter
                            </button>
                            <div class="collapse" id="filterCollapse">
                                <button class="btn btn-outline-success my-2" type="button" @click="checkAll">
                                Check/uncheck all
                                </button>
                                <div v-for="(searchType,name) in types">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox"
                                        v-model="selectedTypes" :value="searchType" :id="searchType + 'Check'" :checked="allChecked">
                                        <label class="form-check-label" :for="searchType + 'Check'">
                                            {{ name }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button v-if="prevMeal" type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#mealConsiderationModal">Search</button>
                            <button v-else type="button" class="btn btn-primary" @click="recommendAny(day.dayId,day.dayActivities.length-1)" data-bs-toggle="modal" data-bs-target="#recommendModal">Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="recommendModal" tabindex="-1" aria-labelledby="recommendModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="recommendModalLabel">Recommended activities</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div id="testingDiv"></div>
                            <div v-if="loadingRecs && slicedRecs.length==0">
                                    <div class="spinner-border text-primary" role="status">
                                    </div>
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            <div v-if="source=='start'">
                                <h5> <!--State time of first activity-->

                                </h5>
                            </div>
                            <div v-else-if="source=='mid'">
                                <h5> <!--State time of previous and next activity-->
                                    
                                </h5>
                            </div>
                            <div v-else>
                                <h5> <!--State time of last activity-->
                                    
                                </h5>
                                <!-- Modal -->
                                <div v-for="(rec,index) in slicedRecs">
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
                                                        <span class="fw-bold">Ratings:</span> {{rec.rating[0]}} ({{rec.rating[1]}} reviews)<br>
                                                        <a :href="rec.url" class="text-dark fw-bold">Link</a>
                                                    </p>
                                                </div>
                                                <button type="button" @click="chooseRec(index)" class="btn btn-primary mx-2 mb-2">Add to Day {{day.dayId + 1}}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>    
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger me-3" :disabled="sliceCount==0" @click="sliceCount--">Previous Page</button>
                            <button type="button" class="btn btn-success me-3" :disabled="sliceCount==(numPages-1)" @click="sliceCount++">Next Page</button>
                            <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close (Reset recommendations!)</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addActivityFromReccs(day.dayId)">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="mealConsiderationModal" tabindex="-1" aria-labelledby="mealConsiderationLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="mealConsiderationLabel">Suggestion</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>As your previous activity is a meal, we suggest that you avoid intense activities for an hour or two.</p>
                            <p>
                                If you choose to ignore this suggestion, we will recommend you activities based on your filter.
                                If you decide to choose a non-intense activity, we will recommend you activities based on our predetermined filters.
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="recommendAny(day.dayId,day.dayActivities.length-1)" data-bs-toggle="modal" data-bs-target="#recommendModal">Ignore suggestion</button>
                            <button type="button" class="btn btn-primary" @click="recommendNonIntense(day.dayId,day.dayActivities.length-1)" data-bs-toggle="modal" data-bs-target="#recommendModal">Choose non-intense activity</button>
                        </div>
                    </div>
                </div>

             <!--   <div class="col-md-8">
                    <div class="card-body row">
                        <h5 class="card-title col-10">Activity {{activity.number}} - {{activity.name}}</h5>
                        <button @click="delActivity(day.dayId,activity.number)" type="button" class="btn btn-outline-danger col-2" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .25rem;--bs-btn-font-size: 0.6rem">Delete Activity</button>
                        <p class="card-text fs-6">{{activity.description}}</p>
                         <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> -->
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
                            </div> --> 

            </div>
        </div>
        <div v-else>
            <h4 class="p-4">
                You have no activities currently. <button type="button" class="btn btn-outline-primary" @click="loadingRecs=false, recs=[]" data-bs-toggle="modal" data-bs-target="#noActivitiesConsiderationModal">Recommend me activities!</button>
            </h4>
            <div class="modal fade" id="noActivitiesModal" tabindex="-1" aria-labelledby="noActivitiesLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="noActivitiesLabel">Recommended activities</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div id="testingDiv"></div>
                        <div class="modal-body">
                            <div v-if="day.accoms.length>0" > <!--this.recs.push({"name": p.name, "address" : p.vicinity, "rating" : [p.rating,p.user_ratings_total], "cost": p.price_level, "photo" : p.photos[0]})-->
                                <div v-if="loadingRecs && slicedRecs.length==0">
                                    <div class="spinner-border text-primary" role="status">
                                    </div>
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <div v-for="(rec,index) in slicedRecs" class="card mb-3 px-0" style="max-width: 665px;">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <img :src="rec.photo.getUrl({maxWidth:221})" class="img-fluid rounded-start" alt="...">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body row">
                                                <h5 class="card-title col-10"> {{rec.name}} - {{rec.address}} </h5>
                                                <p class="card-text fs-6">
                                                    <span class="fw-bold">Cost:</span> {{displayCost(rec.price_level)}} <br>
                                                    <span class="fw-bold">Ratings:</span> {{rec.rating[0]}} ({{rec.rating[1]}} reviews)<br>
                                                    <a :href="rec.url" class="text-dark fw-bold">Link</a>
                                                </p>
                                            </div>
                                            <button type="button" @click="chooseRec(index)" class="btn btn-primary mx-2 mb-2">Add to Day {{day.dayId + 1}}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <p>Unfortunately, you need to have an accommodation for us to accurately recommend places to you</p>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger me-3" :disabled="sliceCount==0" @click="sliceCount--">Previous Page</button>
                            <button type="button" class="btn btn-success me-3" :disabled="sliceCount==(numPages-1)" @click="sliceCount++">Next Page</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addActivityFromReccs(day.dayId)">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="noActivitiesConsiderationModal" tabindex="-1" aria-labelledby="noActivitiesConsiderationLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="noActivitiesConsiderationLabel">Suggestion</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Since you have no activities added for this day currently, we recommends choosing a breakfast location first. 
                        </div>
                        <div class="modal-footer">
                            <button type="button" @click="chooseBreakfastFunc(day.dayId)" data-bs-toggle="modal" data-bs-target="#noActivitiesModal" class="btn btn-success mx-2">OK</button>
                            <button type="button" @click="recommendAny(day.dayId,day.dayActivities.length-1)" data-bs-toggle="modal" data-bs-target="#noActivitiesModal" class="btn btn-danger mx-2">Skip breakfast for now</button>
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
                <input type="text" @input="placeAutocomplete" v-on:place_changed="selectedPlace" class="form-control" placeholder="Add a place" :aria-describedby="'Day' + day.dayId + 'location'">
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
            <div v-if="predictionList" class="list-group" :id="'Day' + day.dayId + 'predictionList'">
                <button v-for="prediction in predictionList" :key="prediction.name" type="button" class="list-group-item list-group-item-action" @click="addActivityFromPrediction(day.dayId,prediction.place_id)">{{prediction.description}}</button>
            </div>
        </div>
    </div>
    <hr/>
</div>
</template>
<script>
//  import statements
// import axios from 'axios';


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
        allChecked: true,
        recs: [],
        // respLength: 0,
        loadingRecs: false,
        selectedRecs: [],
        distance: 5,
        sliceCount: 0,
        source: '',
        prevMeal: true,
        types: {'Amusement parks':'amusement_park',
                'Aquariums':'aquarium', 
                'Art galleries': 'art_gallery',
                'Bakeries':'bakery',
                'Bars':'bar',
                'Bike stores': 'bicycle_store',
                'Book stores': 'book_store', 
                'Bowling alleys': 'bowling_alley',
                'Cafes':'cafe',
                'Casinos':'casino',
                'Clothing stores':'clothing_store',
                'Electronics stores':'electronics_store',
                'Florists':'florist',
                'Gyms':'gym', 
                'Jewelry stores': 'jewelry_store',
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
            country: "Australia",
            predictionList: [],
            autocomplete: '',
            selectedTypes: []
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
    this.country = this.getCountryCode(this.country)
},

methods: {
    getCountryCode(countryName){
        return this.countryList[countryName]
    },
    checkAll(){
        if (this.allChecked){
            console.log("setting allchecked to false")
            this.allChecked = false
        }else{
            console.log("setting allchecked to true")
            this.allChecked = true
        }
    },
    // methods defined by ourselves
    skipBreakfastFunc(){
        this.skipBreakfast = true;
        // recommend others
    },
    chooseBreakfastFunc(dayId){
        this.loadingRecs = true;
        var range = this.distance * 1000
        var keyword = 'breakfast'
        var startAccoms = this.days[dayId].accoms[0]
        this.recs = []
        this.findPlace(startAccoms,['geometry']).then(result=>
        {
            this.nearbySearch(keyword,result,range).then(resp =>{
                for (let p of resp){
                    this.getPlaceDetails(p.place_id,['url']).then(url =>{
                        this.recs.push({"name": p.name, "address" : p.vicinity, "rating" : [p.rating,p.user_ratings_total], "cost": p.price_level, "photo" : p.photos[0], "url": url})
                    })
                }
            })
        })  
    },
    recommendAny(dayId,index){
        // var prevAct = this.days[dayId].dayActivities[index]
        this.loadingRecs = true;
        var range = this.distance * 1000
        var types = this.selectedTypes
        var numReccsPerType = Math.floor(60/types.length)
        var reccsLeft = 60
        this.recs = []
        // this.findPlace(prevAct.name,['geometry']).then(result=>
        this.findPlace("Two Good Eggs Cafe",['geometry']).then(result=>
        {
            for (let i=0;i<types.length;i++){
                console.log(types[i])
                this.nearbySearch(types[i],result,range).then(resp =>{
                    var pushCount = 0
                    // update numReccsPerType if resp.length < numReccsPerType
                    for (let p of resp){
                        if (pushCount >= numReccsPerType){
                            break;
                        }
                        if (p.rating < 4 || p.user_ratings_total < 50){
                            continue;
                        }
                        this.getPlaceDetails(p.place_id,['url']).then(url =>{
                            this.recs.push({"name": p.name, "address" : p.vicinity, "rating" : [p.rating,p.user_ratings_total], "cost": p.price_level, "photo" : p.photos[0], "url": url})
                        })
                        pushCount++;
                    }
                    reccsLeft = reccsLeft - pushCount
                    if (pushCount < numReccsPerType){
                        numReccsPerType = Math.floor(reccsLeft / (types.length-1-i))
                    }
                })
                
            }
        })
    },  
    recommendNonIntense(dayId,index){
        // var prevAct = this.days[dayId].dayActivities[index]
        this.loadingRecs = true;
        var range = this.distance * 1000
        var types = ['aquarium','art_gallery', 'museum', 'park', 'shopping_mall', 'zoo', 'tourist_attraction']
        var numReccsPerType = Math.floor(60/types.length)
        var reccsLeft = 60
        this.recs = []
        // this.findPlace(prevAct.name,['geometry']).then(result=>
        this.findPlace("Two Good Eggs Cafe",['geometry']).then(result=>
        {
            for (let i=0;i<types.length;i++){
                console.log(types[i])
                this.nearbySearch(types[i],result,range).then(resp =>{
                    var pushCount = 0
                    // update numReccsPerType if resp.length < numReccsPerType
                    for (let p of resp){
                        if (pushCount >= numReccsPerType){
                            break;
                        }
                        if (p.rating < 4 || p.user_ratings_total < 50){
                            continue;
                        }
                        this.getPlaceDetails(p.place_id,['url']).then(url =>{
                            this.recs.push({"name": p.name, "address" : p.vicinity, "rating" : [p.rating,p.user_ratings_total], "cost": p.price_level, "photo" : p.photos[0], "url": url})
                        })
                        pushCount++;
                    }
                    reccsLeft = reccsLeft - pushCount
                    if (pushCount < numReccsPerType){
                        numReccsPerType = Math.floor(reccsLeft / (types.length-1-i))
                    }
                })
                
            }
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
        if (this.sliceCount == 0){
            this.selectedRecs.push(this.recs.slice(0,20)[index])
        }else if (this.sliceCount == 1){
            this.selectedRecs.push(this.recs.slice(20,40)[index])
        }else{
            this.selectedRecs.push(this.recs.slice(40,60)[index])
        }
    }, 
    addActivityFromReccs(dayId){
        if (this.selectedRecs.length > 0){
            var a = this.selectedRecs[0]
            var actName = a.name
            var actNum = this.days[dayId].dayActivities.length + 1
            var image = a.photo
            var actDesc = a.address 
            // eslint-disable-next-line vue/no-mutating-props
            this.days[dayId].dayActivities.push({'name':actName, 'number':actNum, 'description':actDesc, 'image':image})
        }
    },
    async nearbySearch(kw, loc, dist) {
        var testDiv = document.getElementById('testingDiv');
        const { PlacesService } = await google.maps.importLibrary('places');
        var request = {
                location: loc,
                radius: dist,
                keyword: kw,
        };

        var service = new PlacesService(testDiv);
        var finished = false;
        var pageCount = 0;
        var final = []
        return new Promise((resolve, reject) => {
            service.nearbySearch(request, (results, status, pagination) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                if (pagination.hasNextPage && pageCount < 2) {
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
            } else {
                if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
                    resolve([]);
                }else{
                    reject(new Error(`Places service request failed with status: ${status}`));
                }
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
        var testDiv = document.getElementById('testingDiv');
        const {PlacesService} = await google.maps.importLibrary("places");
        let request = {
            query: query,
            fields: fieldList
        }
        var service = new PlacesService(testDiv);
        return new Promise((resolve, reject) => {service.findPlaceFromQuery(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve(results[0].geometry.location); // Resolve the promise with the results
            }else{
                reject(new Error(`Places service request failed with status: ${status}`));
            }
        })
        })
        
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
                    resolve(results['url'])
                }else{
                    reject (new Error(`Places service request failed with status: ${gdStatus}`));
                }
            });
        });
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
    placeAutocomplete(event){
        var location = event.target
        var dayId = location.parentNode.parentNode.id[3]
        var startAccoms = this.days[dayId].accoms[0]
        this.findPlace(startAccoms,['geometry']).then(result=>{
            this.autocomplete = new google.maps.places.Autocomplete(
                event.target,  
                {
                    componentRestrictions: {'country' : this.country},
                    locationBias: result,
                    fields: ['vicinity','url','photos','name']
                }
            )
        })
    },
    selectedPlace(event){
        var location = event.target
        var dayId = location.parentNode.parentNode.id[3]
        var place = this.autocomplete.getPlace();
        var actName = place.name
        var actNum = this.days[dayId].dayActivities.length + 1
        var image = place.photos[0].getUrl({maxWidth:221})
        var actDesc = place.vicinity
        this.days[dayId].dayActivities.push({name:actName, number:actNum, description:actDesc, image:image})
        console.log(this.days[dayId].dayActivities)
        
    },
    // async placeAutocomplete(event){ // calls api to get you candidates for search and their place id
    //     const {AutocompleteService} = await google.maps.importLibrary("places");
    //     var location = event.target
    //     var dayId = location.parentNode.parentNode.id[3]
    //     var startAccoms = this.days[dayId].accoms[0]
    //     this.findPlace(startAccoms,['geometry']).then(result=>{
    //         var request = {
    //             input: location.value,
    //             componentRestrictions: {country:this.country}, // change later on to be dynamic
    //             locationBias: result, 
    //             origin: result,
    //         }
    //         console.log(request)
    //         var service = new AutocompleteService();
    //         return new Promise((resolve,reject) => {
    //             service.getPlacePredictions(request, (results, status) => {
    //             if (status === google.maps.places.PlacesServiceStatus.OK) {
    //                 this.predictionList = []
    //                 console.log(results)
    //             }else{
    //                 reject (new Error(`Places service requesvar desc = predictions[p].description
        //                 var listGroupItem = document.createElement('button') // creating the button for each prediction
        //                 listGroupItem.type = 'button'
        //                 listGroupItem.classList.add('list-group-item')
        //                 listGroupItem.classList.add('list-group-item-action')
        //                 listGroupItem.innerHTML = desc // displaying the place description for each item
        //                 listGroupItem.addEventListener('click',function(){ //making sure that upon click of the prediction, will add it to the activities
        //                     var indivDesc = predictions[p].description // requires definition inside so that the eventlistener is using the correct description (desc var will be updated to be the last prediction description)
        //                     var name = predictions[p].structured_formatting.main_text
        //                     var place_id = predictions[p].place_id
        //                     var actNum = dayActivities.length + 1
        //                     // eslint-disable-next-line vue/no-mutating-props
        //                     dayActivities.push({name:name, number:actNum, description:indivDesc, image:'DSC00788-3.jpg', placeId: place_id}) // at some point get image, push place id
        //                     predictionList.classList.add('d-none') // hiding the list upon selection of prediction
        //                 }.bind(this)) // for eventlistener to have latest data
        //                 predictionList.appendChild(listGroupItem) // adding the button to the lists
        //             }t failed with status: ${status}`));
    //             }
    //             });
    //         })
    //     })
    // },
        // axios.get(url,{params})
        //     .then(response => {
        //         var predictionList = document.getElementById(`Day${dayId}predictionList`)
        //         predictionList.innerHTML = '' // clear the list of past predictions on each input
        //         var predictions = response.data.predictions
        //         let dayActivities = this.days[dayId].dayActivities
        //         if (predictions.length > 0 ){ // if there are predictions
        //             predictionList.classList.remove('d-none') // display the list
        //             for (let p=0;p<predictions.length;p++){
        //                 
        //         }
        //     })
        //     .catch(error=>{
        //         console.log(error)
        //     })
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
