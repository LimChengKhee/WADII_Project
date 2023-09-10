<template>
    <div>
        <h1>Login Page</h1>
        <form>
            <div class="register">
                <input type="text" v-model="email" placeholder="Enter Email" />
                <br />
                <input type="password" v-model="password" placeholder="Enter Password" />
                <br />
                <button>Login</button>
            </div>
        </form>
        <p>
            <router-link to="/sign-up">Sign Up</router-link>
        </p>
    </div>
</template>
  
<script>
    export default{
        name: 'Login',
    };
</script>