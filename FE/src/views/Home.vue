<template>
  <div>
          <!-- use the router-link component for navigation. -->
          <!-- specify the link by passing the `to` prop. -->
          <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
          <!-- <router-link to="/">Go to Home</router-link>
          <br>
          <router-link to="/itinerary">Go to Itinerary</router-link> -->
          

      <!-- route outlet -->
      <!-- component matched by the route will render here -->
      <router-view></router-view>
  </div>
  <div class="row mt-5">
    <div class="col text-start ">Recently View</div>
    <div class="col">
      <button class="btn btn-primary" @click="createitinerary">Create new Trip</button>
    </div>
    <br>
    {{ test }}
    
  </div>
</template>
<script>
//  import statements
// import example from '@/utils/string_formatter'
import axios from 'axios';
export default {
  name: 'Home',
  components: {
    // importing components from other places

  },
  data () {
    // local repository of information
    return {
      itinerarys:[],
      userid:"",
      token:"",
      test:"",
    }
  },
  computed: {
    // computed

  },

  // start of lifecycle
 async mounted () {
    var userid = localStorage.getItem('userid');
    this.userid = userid
    this.token = localStorage.getItem('token');

    if (localStorage.getItem('reloaded')) {
        // The page was just reloaded. Clear the value from local storage
        // so that it will reload the next time this page is visited.
        localStorage.removeItem('reloaded');
    } else {
        // Set a flag so that we know not to reload the page twice.
        localStorage.setItem('reloaded', '1');
        location.reload();
    }
    console.log(userid)
    if (userid == null){
      console.log('Hello')
      this.redirect('login',false)
    }else{
      // window.location.re
    }
    await this.getItinerary();

    

  },
  created(){
    
  },

  methods: {
    // methods defined by ourselves

    redirect(url, isRedirect) {           
    if (isRedirect == true) {
      window.open(url);
    } else {
      this.$router.push(`${url}`);
    }
  },
  createitinerary(){
    this.$router.push('/form')
  },
  async getItinerary(){
    const info  = await axios
      .get(`http://127.0.0.1:8000/api/itinerary/?username=${this.userid}`,{headers:{ "Content-Type":"application/json",
        "Authorization":`Token ${this.token}`}})

    this.itinerarys = info.data
    let item = (info.data[6].itinerary_data)
    console.log(JSON.parse(item))
    this.test = item
    // item = item.replaceAll("/","")
    
    //  this.test = JSON.parse(item)
    //  console.log(this.test)
    // console.log( JSON.parse(item))
  },

  },
}

</script>

<style scoped>

</style>