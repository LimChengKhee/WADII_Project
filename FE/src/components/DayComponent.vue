<!-- eslint-disable no-redeclare -->
<!-- eslint-disable vue/require-v-for-key -->
<template>
    <div id="testingDiv"></div>

    <div v-for="day of days" :key='day.dayId' class="row my-3 ms-3">
        <div>
            <button class="btn px-0 pt-0 pb-auto" type="button" data-bs-toggle="collapse" :data-bs-target="'#Day' + day.dayId + 'Collapse'" aria-expanded="false" @click="changeCollapseArrow(day.dayId)">
                    <svg :id="'arrow' + day.dayId + 'right'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                    </svg>
                    <svg :id="'arrow' + day.dayId + 'down'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="d-none bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
            </button>
            <p class="d-inline mx-1">
                Day {{ day.dayId + 1 }}  ({{getPrintableDate(day.dayId)}})
            </p>
            <button type="button" @click="deleteDay(day.dayId)" class="btn btn-outline-danger" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: 0.6rem;">Delete Day</button>
        </div>
           
           
            <!-- <button style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .5rem; margin-left: 35rem" class="btn btn-secondary d-inline" type="button" data-bs-toggle="collapse" :data-bs-target="'#Day' + day.dayId + 'Collapse'" aria-expanded="false" aria-controls="collapseExample">
                Expand Day 
            </button> -->
        <div class="collapse" :id="'Day' + day.dayId + 'Collapse'">
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
                                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" :data-bs-target="'#filter'+ day.dayId + 'Collapse'" aria-expanded="false"> <!--aria-controls="collapseExample"-->
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
                                            <p class="d-inline text-success ms-2 fs-6" v-if="recommendedTypes.includes(searchType)">Recommended</p>
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
                            <!-- <div v-if="source=='start'">
                                <h5>

                                </h5>
                            </div>
                            <div v-else-if="source=='mid'">
                                <h5> 
                                    
                                </h5>
                            </div>
                            <div v-else>
                                <h5> 
                                    
                                </h5>
                            </div>   -->
                            <div v-for="(rec,index) in slicedRecs">
                                <div class="card mb-3 px-0" style="max-width: 665px;">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <img :src="getImage(rec.photo)" class="img-fluid rounded-start" alt="...">
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
                <span class="input-group-text">
                    <svg width="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
                <input type="text" @input="processAutocomplete" :id="'end'+'autocomplete'+ day.dayId" class="form-control" placeholder="Add a place">
                <div class="dropend">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="true" style="height:38px;">Custom events</button>
                    <form class="dropdown-menu dropdown-menu-start p-4" style="width:50%;" data-bs-theme="dark">
                        <div class="mb-3">
                            <label :for="'Day' + day.dayId + 'EndEventName'" class="form-label">Event Name</label>
                            <input type="text" class="form-control" :id="'end' + 'customName' + day.dayId">
                        </div>
                        <div class="mb-3">
                            <label :for="'Day' + day.dayId + 'EndNotes'" class="form-label">Notes</label>
                            <input type="text" class="form-control" :id="'end' + 'customNotes' + day.dayId">
                        </div>
                        <button type="button" @click="addCustomEvent" :id="'end' + 'customEvent' + day.dayId" class="btn btn-primary">Add event</button>
                    </form>
                </div>
            </div>
            <div v-if="displayPredictions.day == day.dayId && displayPredictions.psn == 'end'" class="list-group">
                <button v-for="prediction in predictionList" :key="prediction.name" type="button" class="list-group-item list-group-item-action" @click="addActivityFromPrediction(day.dayId,prediction,'end')">{{prediction.description}}</button>
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
    'originName'
],
name: 'Day_Component',
components: {
    // importing components from other places
},
data () {
// local repository of information
    return {
        recs: [],
        // respLength: 0,
        selectedRec: [],
        anyRecs: [],
        distance: 5,
        sliceCount: 0,
        source: '',
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
        selectedTypes: [],
        topAttractions: [],
        position: 0,
        addSearch: '',
        displayPredictions: {},
        recommendedTypes: ['tourist_attraction','park','museum','cafe', 'aquarium', 'zoo'],
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
},

methods: {
    changeCollapseArrow(dayId){
        let arrowdown = document.getElementById('arrow' + dayId + 'down')
        let arrowright = document.getElementById('arrow' + dayId + 'right')
        if (arrowdown.classList.contains('d-none')){
            arrowdown.classList.remove('d-none')
            arrowright.classList.add('d-none')
        }else{
            arrowdown.classList.add('d-none')
            arrowright.classList.remove('d-none')
        }        
    },
    checkPreviousMeal(dayId){
        if (this.days[dayId].dayActivities.length == 0 || this.position == 0){
            return false
        }else{
            return this.mealTypes.includes(this.days[dayId].dayActivities[this.position-1].type)
        }
        
    },
    initialiseRec(actIndex){
        this.recs = []
        this.selectedRec = []
        if (actIndex == 0){
            this.source = 'start'
            this.position = 0
        }else if (actIndex == "end"){
            this.source = 'end'
            this.position = 0
        }else{
            this.source = "mid"
            this.position = actIndex
        }
        
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
        if (this.days[dayId].dayActivities.length == 0 || this.position == 0){
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
            this.findPlace(origin,['geometry']).then(result=>
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
        if (this.days[dayId].dayActivities.length == 0 || this.position == 0){
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
            this.findPlace(origin,['geometry']).then(result=>
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
            // eslint-disable-next-line vue/no-mutating-props
            if (this.source == "start"){
                this.days[dayId].dayActivities.unshift({'name':actName, 'description':actDesc, 'image':image, 'type':type})

            }else if (this.source == "end"){
                this.days[dayId].dayActivities.push({'name':actName, 'description':actDesc, 'image':image, 'type':type})
            }else{
                this.days[dayId].dayActivities.splice(this.position,0,{'name':actName, 'description':actDesc, 'image':image, 'type':type})
            }
        }
    },
    addActivityFromPrediction(dayId,prediction,position){
        let autoInput = document.getElementById(position + "autocomplete" + dayId)
        autoInput.value = ""
        this.displayPredictions = {}
        this.addSearch = ""
        this.getPlaceDetails(prediction.place_id,['name','vicinity','photos']).then(result=>{
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
            if (position == "end"){
                this.days[dayId].dayActivities.push({'name':result.name, 'description':address, 'image':image, 'type':'prediction'})
            }
            else if (position == 0){
                this.days[dayId].dayActivities.unshift({'name':result.name, 'description':address, 'image':image, 'type':'prediction'})
            }
            else{
                this.days[dayId].dayActivities.splice(position,0,{'name':result.name, 'description':address, 'image':image, 'type':'prediction'})
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
    processAutocomplete(event){
        let startindex = event.target.id.indexOf('autocomplete')
        let actIdx = event.target.id.slice(0,startindex)
        let dayId = event.target.id.slice(startindex+12)
        this.displayPredictions = {day: dayId, psn: actIdx}
        console.log(this.displayPredictions)
        var location = event.target.value
        this.predictionList = []
        this.placeAutocomplete(location,this.originLoc,this.country).then(suggestions =>{
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
    addCustomEvent(event){ // Make dynamic for all positions
        console.log(event.target.id)
        let startindex = event.target.id.indexOf('customEvent')
        let actIdx = event.target.id.slice(0,startindex)
        let dayId = event.target.id.slice(startindex+11)
        let dayActivities = this.days[dayId].dayActivities
        let nameElem = document.getElementById(actIdx + 'customName' + dayId)
        let notesElem = document.getElementById(actIdx + 'customNotes' + dayId)
        let name = nameElem.value
        let notes = notesElem.value
        nameElem.value = ""
        notesElem.value = ""
        if (actIdx == dayActivities.length){
            dayActivities.push({
                'name': name, 'description':notes, 'image': 'custom', 'placeId': '', 'type':'custom'
            })
        }else if (actIdx == 0){
            dayActivities.unshift({
                'name': name, 'description':notes, 'image': 'custom', 'placeId': '', 'type':'custom'
            })
        }else{
            console.log(actIdx)
            dayActivities.splice(actIdx,0,{
                'name': name, 'description':notes, 'image': 'custom', 'placeId': '', 'type':'custom'
            })
        }
        this.addSearch = ""
    }
},
}

</script>

<style scoped>

</style>
