import { defineStore } from 'pinia';
import { useAuthStore } from './authStore';
import axios from 'axios';


export const useUsersStore = defineStore({
    id: 'user',
    state: () => ({
        userData: {},
        iti_data : [],
    }),
    persist: true,
    actions: {
        async register(formData) {

        try {
            this.userData = await axios.post('/api/v1/users/',formData)
            return  this.userData
          } catch (error) {
            // let the form component display the error
            return null
          }
        },
        async getItinerary(userid,token){
          function isJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }
          this.iti_data = []
          let config = {
            headers:{ "Content-Type":"application/json",
              "Authorization":`Token ${token}`},
            params: {"username":userid}
          }
          console.log(userid,token)
          const info  = await axios
            .get(`http://127.0.0.1:8000/api/itinerary/`,config)
          
          for (let i of info.data){
            var temp = i
            if (isJsonString(temp["itinerary_data"])){
              var json_data = JSON.parse(temp["itinerary_data"])
            }else{
              var json_data = {}
            }
            temp["itinerary_data"] = json_data
            this.iti_data.push(temp)
          }
          return this.iti_data
        },
    }
});