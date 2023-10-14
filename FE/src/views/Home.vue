<template>
  <div>
      <p>
          <!-- use the router-link component for navigation. -->
          <!-- specify the link by passing the `to` prop. -->
          <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
          <!-- <router-link to="/">Go to Home</router-link>
          <br>
          <router-link to="/itinerary">Go to Itinerary</router-link> -->
          
      </p>
      <!-- route outlet -->
      <!-- component matched by the route will render here -->
      <router-view></router-view>
  </div>
</template>
<script>
//  import statements
// import example from '@/utils/string_formatter'

export default {
  name: 'Home',
  components: {
    // importing components from other places

  },
  data () {
    // local repository of information
    return {
      example: "hello world"
    }
  },
  computed: {
    // computed

  },

  // start of lifecycle
 mounted () {




    var test = localStorage.getItem('userid');

    if (localStorage.getItem('reloaded')) {
        // The page was just reloaded. Clear the value from local storage
        // so that it will reload the next time this page is visited.
        localStorage.removeItem('reloaded');
    } else {
        // Set a flag so that we know not to reload the page twice.
        localStorage.setItem('reloaded', '1');
        location.reload();
    }
    console.log(test)
    if (test == null){
      console.log('Hello')
      this.redirect('login',false)
    }else{
      // window.location.re
    }
    // this.$router.go(0)
    // window.location.reload()
    // localStorage.clear()
    // location.reload();
  },

  methods: {
    // methods defined by ourselves
    redirect(url, isRedirect) {           
    if (isRedirect == true) {
      window.open(url);
    } else {
      this.$router.push(`${url}`);
    }
  }
  },
}

</script>

<style scoped>

</style>