<template>
  <div class="loginCard">
    <h1>Login Page</h1>
      <form @submit.prevent="submitForm" class="form-login">
      <div class="register">
        <input type="text" v-model="username" class="form-control" placeholder="Username" />
        <br />
        <input
          type="password"
          v-model="password"
          class="form-control"
          placeholder="Enter Password"
        />
        <br />
        <button type="submit" class="btn btn-primary btn-block">Log in</button>
      </div>
    </form>
    <p class="text-center mt-3">
      <router-link to="/sign-up">Sign Up</router-link>
    </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submitForm(e) {
    
      const formData = {
        username: this.username,
        password: this.password
      }
      console.log(formData)
      axios
        .post('/api/v1/token/login', formData)
        .then(response => {
          console.log('sdasdas')
          console.log(response)
          const token = response.data.auth_token
          console.log(token)
          this.$store.commit('setToken', token)
          //to push to next page afterwards
        //   this.$router.push('/login')

          axios.defaults.headers.common['Authorization'] = 'Token ' + token

          localStorage.setItem('token', token)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  components: {}
}
</script>
