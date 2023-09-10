<template>
    <h1> Placeholder for LOGO </h1>
    <div class="register">
        <input type="text" v-model="name" placeholder="Enter Name"/>
        <br>
        <input type="text" v-model="email" placeholder="Enter Email"/>
        <br>
        <input type="password" v-model="password" placeholder="Enter Password"/>
        <br>
        <button v-on:click="signUp">Sign Up</button>
        <p>
            <router-link to="/login">Login</router-link>
        </p>
    </div>
</template>

<script>
import axios from 'axios'
export default{
    name:"SignUp",
    data(){
        return {
            name: '',
            email: '',
            password: ''
        }
    }
}
</script>
