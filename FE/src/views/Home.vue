<template>
  <div id="app">
      <p>
          <!-- use the router-link component for navigation. -->
          <!-- specify the link by passing the `to` prop. -->
          <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
          <router-link to="/">Go to Home</router-link>
          <br>
          <router-link to="/itinerary">Go to Itinerary</router-link>
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
  name: 'Home_Page',
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
  async mounted () {
  },

  methods: {
    // methods defined by ourselves
    example () {

    },
  },
}

</script>

<style scoped>

</style>