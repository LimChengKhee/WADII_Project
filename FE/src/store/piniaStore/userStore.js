import { defineStore } from 'pinia';
import { useAuthStore } from './authStore';
import axios from 'axios';


export const useUsersStore = defineStore({
    id: 'user',
    state: () => ({
        userData: {},
        iti_data : [],
        user_iti : {},
    }),
    persist: true,
    actions: {
        async register(formData) {
        

        try {
            this.userData = await axios.post('http://127.0.0.1:8000/api_d/v1/users/',formData)
            return  this.userData
          } catch (error) {
            // let the form component display the error
            console.log(error)
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
          
          const info  = await axios
            .get(`http://127.0.0.1:8000/api_d/itinerary/`,config)

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

        async getUserItinerary(username,itinerary_name){
          const authStore = useAuthStore()
          const info  = await axios
            .get(`http://127.0.0.1:8000/api_d/itinerary/${username}/${itinerary_name}/`,{headers:{ "Content-Type":"application/json",
              "Authorization":`Token ${authStore.token}`}})

          this.itinerarys = info.data
          let item = (info.data.itinerary_data)
          this.user_iti = JSON.parse(item)
          return this.user_iti

        },
        async updateItinerary(iti_data,user,iti_name){
          var json_str = JSON.stringify(iti_data);
          const authStore = useAuthStore()
            var bodydata= {
            "username":user,
            "itinerary_data":json_str,
            "itinerary_name":iti_name
            }
          const info  = await axios
            .put(`http://127.0.0.1:8000/api_d/itinerary/${user}/${iti_name}/`,bodydata,{headers:{ "Content-Type":"application/json",
              "Authorization":`Token ${authStore.token}`}})

              console.log(info)

        },
        async deleteUserItinerary(user,iti_name){
          const authStore = useAuthStore()
          const info  = await axios
            .delete(`http://127.0.0.1:8000/api_d/itinerary/${user}/${iti_name}/`,{headers:{ "Content-Type":"application/json",
              "Authorization":`Token ${authStore.token}`}})

              console.log(info)

        }

    }
});