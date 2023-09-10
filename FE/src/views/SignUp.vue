<template>
    <div>
        <h1>Sign Up</h1>
        <img class = "logo" src="../img/logo.jpeg">
        <form>
            <div class="register">
                <input type="text" v-model="name" placeholder="Enter Name" />
                <br />
                <input type="text" v-model="email" placeholder="Enter Email" />
                <br />
                <input type="password" v-model="password" placeholder="Enter Password" />
                <br />
                <button type="submit" v-on:click="signUp">Sign Up</button>
            </div>
        </form>
        <p>
            <router-link to="/login">Login</router-link>
        </p>
    </div>
</template>
  

<script>
import axios from 'axios'
export default {
    name: "SignUp",
    data() {
        return {
            name: '',
            email: '',
            password: ''
        }
    }
}
</script>
<style>

</style>
