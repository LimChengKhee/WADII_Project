<template>
    <div class="total-trips-pill">
      <p>Total Trips Travelled:</p>
      <p><span style="font-size:40px  ;">{{ totalCountriesVisited }}</span></p>
    </div>
  </template>
    
  <script>
  import { useAuthStore } from '../store/piniaStore/authStore';
  import { useUsersStore } from '../store/piniaStore/userStore';
  import { mapStores } from 'pinia';
  
  
  export default {
    name: "TotalCountriesVisited",
    props: {
      dataTT: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        totalCountriesVisited: 0,
  
      };
    },
    async mounted() {
      // const authStore = useAuthStore();
      // const userStore = useUsersStore();
      // this.userid = authStore.user
      // this.token = authStore.token
      // // await 
      // this.data = await userStore.getItinerary(this.userid, this.token);
      // this.totalTrips = this.data.length;
      // console.log(this.data)
  
    },
    computed: {
      ...mapStores(useAuthStore),
      ...mapStores(useUsersStore)
    },
    watch: {
      dataTCV: {
        immediate: true,
        handler(newVal, oldVal) {
          this.totalCountriesVisited = newVal.length;
        }
      }
    },
  
  
    methods: {
  
    },
  };
  
  
  </script>
    
  <style scoped>
  .total-trips-pill {
    display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin:0;
  
  }
  </style>
    