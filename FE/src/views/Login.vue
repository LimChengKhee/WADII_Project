<template>
  <div class="login-card">
    <div class="card">
      <div class="card-body">
        <div class="login-content">
          <div class="login-form">
            <h1 class="card-title">Login Page</h1>
            <form @submit.prevent="submitForm" class="form-login">
              <div class="form-group with-icon">
                <i class="fa fa-envelope input-icon"></i>
                <input type="text" v-model="username" class="form-control" placeholder="Enter username" />
              </div>

              <div class="form-group with-icon">
                <i class="fa fa-lock input-icon"></i>
                <input type="password" v-model="password" class="form-control" placeholder="Enter Password" />
              </div>

              <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block w-100">Log in</button>
              </div>
            

            <p class="text-center mt-1 w-100">
              <router-link to="/sign-up">Sign Up</router-link>
            </p>
          </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import { mapStores } from 'pinia';
import { useAuthStore } from '../store/piniaStore/authStore';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapStores(useAuthStore)
  },
  methods: {

    async submitForm() {
      const authStore = useAuthStore();
      var resp = await authStore.login(this.username, this.password);
      console.log(resp, "te")
      if (resp) {
        console.log('hi')
        this.$router.push({ path: '/' })
      } else {
        alert("Wrong Info")
      }

    },

  },
  components: {},
}
</script>
  
<style scoped>
.login-card {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.card {
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-title {
  text-align: center;
  margin-bottom: 20px;
}

.form-login {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

/* Style the rectangular image and login form */
.login-content {
  display: flex;
  align-items: center;
}

.login-image {
  width: 200px;
  /* Adjust the width as needed */
  height: auto;
  margin-right: 20px;
  /* Add spacing between the image and the form */
}

.login-form {
  flex: 1;
  /* Take up the remaining space */
  position: relative;
  /* Add position relative for the divider */
}

/* Style for input fields with icons */
.with-icon {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #ccc;
}

.form-control {
  padding-left: 40px;
}
</style>