import { defineStore } from 'pinia';
import { useAuthStore } from './authStore';
import axios from 'axios';

export const useItineraryStore = defineStore('itinerary', {
    state: () => {
        return {
            name: '',
            email: '',
            phoneNumber: '',
            trip_date:'',
            departure_country:'Singapore',
            departure_date:'',
            flight_cost:'',
            checkin_date:'',
            hotel_cost:'',
            arrival_date:'',
            arrival_country:'',
            flight_no:'',
            room:0,
            adult:0,
            child:0,
            errors: {
                country: '',
                trip_date: '',
                phoneNumber: '',
                departure_date:'',
                departure_country:'',
                flight_cost:'',
                checkin_date:'',
                hotel_cost:'',
                room:'',
                arrival_country:'',
            adult:'',
            child:'',
            flag:{
            hotel:false,
            flight:false,
            },
            },
        }
    },
    actions: {
        validateDestination(arrival_country) {
            if (arrival_country.length < 3) {
                this.errors.arrival_country = 'Choose a destination to start planning';
            } else {
                this.errors.arrival_country = '';
            }
        },
        // validateEmail(email) {
        //     if (email.length == 0) {
        //         this.errors.email = 'This field is required';
        //     } else if (!email.includes('@')) {
        //         this.errors.email = 'Email must contain @';
        //     } else {
        //         this.errors.email = '';
        //     }
        // },
        // validatePhoneNumber(phoneNumber) {
        //     if (phoneNumber.length == 0) {
        //         this.errors.phoneNumber = 'This field is required';
        //     }
        //     else {
        //         this.errors.phoneNumber = '';
        //     }
        // },
        validateAll() {
            this.validateDestination(this.arrival_country);
        
        },
         handleDate(date_range){
            if (date_range == ""){
                return 
            }   
                let startdate = this.format_date(date_range[0])[0]
                let enddate =this.format_date(date_range[1])[0]
                return startdate + ',' + enddate;
              },
         format_date(date){
                let mth = date.getMonth();
                let day = date.getDate();
                let year = date.getFullYear();
                let time = String(date.toLocaleTimeString()).replaceAll(' ','-')
                return [`${year}-${mth+1}-${day}`,time];
              },
        async createitinerary(){
            const authStore = useAuthStore();
            var token = authStore.token;
            var userid = authStore.user;
            var [today_d,today_t] = this.format_date(new Date());
            var today = today_d + "_" + today_t
            var itinerary_name = this.arrival_country.toLowerCase() + '_' + today;
            var json_obj = this.createJsonObj(userid,itinerary_name,today_d)
    
            var json_str = JSON.stringify(json_obj);
            var bodydata= {
            "username":userid,
            "itinerary_data":json_str,
            "itinerary_name":itinerary_name
            }
            console.log(bodydata,token)
    const info  = await axios
      .post(`http://127.0.0.1:8000/api/itinerary/`,bodydata,{headers:{ "Content-Type":"application/json",
        "Authorization":`Token ${token}`}})
    
    return itinerary_name
        },
        createJsonObj(userid,itinerary_name,today_d){
           
            
            

            var destination = this.getDestination(today_d)
            var flight = this.getFlight() 
            var hotel = this.getHotel()
            console.log(Object.keys(hotel).length,flight.length)

            var json_obj = {
                "itinerary_name":itinerary_name,
                "username":userid,
                "itinerary_data":{
                    "destination":destination,
                    "flights":Object.keys(flight).length == 0 ? []: [flight],
                    "hotels":Object.keys(hotel).length == 0 ? []: [hotel],
                    "itinerary_days":[]
                }
            }
            return json_obj
        },
        getDestination(today_d){
            var res = {}
            if (this.trip_date == null || this.trip_date == ""){
                var itinerary_date = today_d +","+ today_d
            }else{
                var itinerary_date = this.handleDate(this.trip_date)
            }
            res["trip_country"] = this.arrival_country
            res["itinerary_date"] = itinerary_date
            res["start_date"] = itinerary_date.split(',')[0]
            res["end_date"] = itinerary_date.split(',')[1]
            return res

        },
        getFlight(){
            var res = {}
            if (this.flight_no==null || this.departure_date== null || this.arrival_date== null || this.flight_no=="" || this.departure_date== "" || this.arrival_date== "" ){
                return res
            }else{
                var flight_obj = {
                    "duration":this.minutesDiff(this.departure_date,this.arrival_date),
                    "flight_no" :this.flight_no,
                    "departure_datetime": this.departure_date,
                    "arrival_datetime": this.arrival_date,
                    "departure_country": this.departure_country,
                    "arrival_country": this.arrival_country,
                    "distance":5246,
                    "cost":this.flight_cost ? Number(this.flight_cost) : 0,
                    "currency":"sgd",
                    "carbon_fp":0,
                    "notes":""
                }
                var flightjson = this.createflight(flight_obj)
                return flightjson
            }
            
        },
         minutesDiff(dateTimeValue2, dateTimeValue1) {
            var differenceValue =(dateTimeValue2.getTime() - dateTimeValue1.getTime()) / 1000;
            differenceValue /= 60;
            return Math.abs(Math.round(differenceValue));
         },

        createflight(flight_obj){
            var result = {}
            for (let item in flight_obj){
                if (item == 'duration'){
                    result[item] = this.minutesDiff(flight_obj["departure_datetime"],flight_obj["arrival_datetime"])
                }else if (item.includes('date')){
                    let date = this.format_date(flight_obj[item])
                    result[item] = date[0] + ',' + date[1]
                }
                else if (item == 'distance'){
                    result[item] = 0
                } else if (item == 'carbon_fp'){
                    result[item] = 0
                }else{
                    result[item] = flight_obj[item]
                }   
                
                
            }
            return result
        },
        getHotel(){
            var res = {}
            if (this.hotel == null || this.checkin_date == null || this.hotel == "" || this.checkin_date == "" ){
                return res
            }else{

            var hotel_obj = {
                "hotelname":this.hotel,
                "start_date":"",
                "end_date":"",
                "check_indates":this.checkin_date,
                "lengthofstay":10,
                "cost":this.hotel_cost ? Number(this.hotel_cost) : 0,
                "currency":"sgd",
                "rooms":this.room ? Number(this.room) : 0,
                "adult":this.adult ? Number(this.adult) : 0,
                "child":this.child ? Number(this.child) : 0,
                "people":0,
                "carbon_fp":0,
                "img":"https://url.com",
                "notes":""
      
              }
                var hoteljson = this.createHotel(hotel_obj)
                return hoteljson
                
            }
            
        },
        getTimeDiffDates(date1,date2){
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return Number(diffDays)
        },
        createHotel(hotel_obj){

            var result = {}
            for (let item in hotel_obj){
                var date = hotel_obj["check_indates"]
                if (item.includes('_date')){
                    let date_c = this.handleDate(date)
                    let s_e_date = date_c.split(',')
                    if (item.includes('start')){
                        result[item] = s_e_date[0]
                    }else{
                        result[item] = s_e_date[1]
                    }
                }else if (item == 'check_indates'){
                    result[item] = this.handleDate(date)
                }
                else if (item == 'lengthofstay'){
                    let date = hotel_obj["check_indates"]
                    result[item] = this.getTimeDiffDates(date[0],date[1])
                } else if (item == 'people'){
                    result[item] = hotel_obj['adult'] + hotel_obj['child']
                }else{
                    result[item] = hotel_obj[item]
                }   
                
                
            }
            return result

        }
    }
});