<template>
  <div class="login-card">
    <div class="card">
      <div class="card-body">
        <div class="login-content">
          <!-- Add the rectangular image on the left -->
          <img src="../img/kfc.png" alt="Image" class="login-image" />

          <div class="login-form">
            <h1 class="card-title">Login Page</h1>
            <button @click="findPlace">HI</button>
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
                <button type="submit" class="btn btn-primary btn-block">Log in</button>
              </div>
            </form>

            <p class="text-center mt-3">
              <router-link to="/sign-up">Sign Up</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
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
    findPlace(){
            var url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/';
            var params = {
                input: 'Museum',
                inputtype: 'textquery', 
                fields: 'geometry',
                key: 'AIzaSyC27_uXwB2Wdx05nP3pezmdAH5svn1oqr4',
            }
            // var headers = {'Access-Control-Allow-Origin': 'http://127.0.0.1:5173/','Access-Control-Allow-Credentials': 'true','Content-Type':  'application/json'}
            axios.get("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum&inputtype=textquery&fields=geometry&key=AIzaSyC27_uXwB2Wdx05nP3pezmdAH5svn1oqr4")
            .then(response => {
                console.log(response.data)
            })
            .catch(error=>{
                console.log(error)
            })
        },
  
     submitForm(e) {

      const formData = {
        username: this.username,
        password: this.password
      }
       axios
        .post('/api/v1/token/login', formData)
        .then(response => {
          console.log(response)
          const token = response.data.auth_token
          console.log(token)
          // store.commit('setUserId',formData.username)
          // to push to next page afterwards
          localStorage.setItem('token', token)
          localStorage.setItem('userid', formData.username)
          // location.reload();
          this.$router.push('/')


          axios.defaults.headers.common['Authorization'] = 'Token ' + token

          
          // localStorage.removeItem('YourItem')
          // localStorage.setItem('YourItem', response.data)
          // localStorage.storedData = this.input;
          // let value = localStorage.storedData;
          
          
        })
        .catch(error => {
          console.log(error)
        })
    }
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

/* Add a vertical divider */
.login-form::before {
  content: '';
  position: absolute;
  left: -2px;
  /* Adjust the position as needed */
  top: 0;
  bottom: 0;
  width: 2px;
  /* Adjust the divider width as needed */
  background-color: #ccc;
  /* Divider color */
}</style>
  