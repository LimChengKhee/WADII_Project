import { defineStore } from 'pinia';
import { useAuthStore } from './authStore';
import axios from 'axios';


export const useUsersStore = defineStore({
    id: 'user',
    state: () => ({
        userData: {}
    }),
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
    }
});