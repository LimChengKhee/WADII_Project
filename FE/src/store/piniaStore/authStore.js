import { defineStore } from 'pinia';

import axios from 'axios';
// import { router } from '../../router';
export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('userid')),
        returnUrl: null,
        userData : null
    }),
    actions: {
        async login(username, password) {
            
            try {
                this.userData = await axios.post('/api/v1/token/login',{"username":username,"password":password})
                const token = this.userData.data.auth_token
                this.user = username
                localStorage.setItem('token', token)
                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('userid', JSON.stringify(username));
                return  this.userData
            } catch (error) {
                // let the form component display the error
                return null
            }

        },
        logout() {
            this.user = null;
            localStorage.removeItem('userid');
            localStorage.removeItem('token');
            this.$router.push('/login');
        }
    }
});