<template>

        <h1 class="text-center">Sign Up</h1>
        
        <form @submit.prevent="signUp" class="form-signup">
          <div class="register">
            <input type="text" v-model="username" class="form-control" placeholder="Enter Name" />
            <br />
            <input type="text" v-model="email" class="form-control" placeholder="Enter Email" />
            <br />
            <input type="password" v-model="password" class="form-control" placeholder="Enter Password" />
            <br />
            <button type="submit" class="btn btn-primary btn-block">Sign Up</button>
          </div>
        </form>
        <p class="text-center mt-3">
          <router-link to="/login">Login</router-link>
        </p>

</template>

<script>
import axios from 'axios';

export default {
  name: 'SignUp',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    signUp(e) {
      // Your sign-up logic here
      const formData = {
        username: this.username,
        password: this.password,
        email: this.email
      }
      axios 
        .post('/api/v1/users/', formData)
        .then(response => {
          this.$router.push('/login')
          console.log(response)
        })
        .catch(error =>{
          console.log(error)
        })
    },
  },
};
</script>
