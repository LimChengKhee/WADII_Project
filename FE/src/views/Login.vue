<template>
    <div class ="loginCard">
        <h1>Login Page</h1>
        <form>
            <form @submit.prevent="login" class="form-login"></form>
            <div class="register">
                <input type="text" v-model="email" class= "form-control" placeholder="Enter Email" />
                <br />
                <input type="password" v-model="password" class= "form-control" placeholder="Enter Password" />
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
import axios from 'axios';

    export default{
        name: 'Login',
        components:{},
    };
</script>