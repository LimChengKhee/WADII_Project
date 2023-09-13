<template>
  <div class="signup-card">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title text-center">Sign Up</h1>

        <form @submit.prevent="signUp" class="form-signup">
          <div class="form-group">
            <input type="text" v-model="username" class="form-control" placeholder="Enter Name" />
          </div>
          <div class="form-group">
            <input type="text" v-model="email" class="form-control" placeholder="Enter Email" />
          </div>
          <div class="form-group">
            <input type="password" v-model="password" class="form-control" placeholder="Enter Password" />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Sign Up</button>
          </div>
        </form>

        <p class="text-center mt-3">
          <router-link to="/login">Login</router-link>
        </p>
      </div>
    </div>
  </div>
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

<style scoped>
/* Custom styles for the Signup card */
.signup-card {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.card {
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-title {
  text-align: center;
  margin-bottom: 20px;
}

.form-signup {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}
</style>
