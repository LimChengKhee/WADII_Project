<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-8 px-0">
        <ul class="menu">
          <img class="ms-4" src="../img/EcoBound.png" style="height: 50px; max-width: 100%;" alt="EcoBound Logo">
          <div class="menu-indicator" :style="{ left: positionToMove, width: sliderWidth }"></div>
          <li class="menu-item" v-for="link in links" :key="link.id" @click="sliderIndicator(link.id)"
            :ref="'menu-item_' + link.id">
            <a href="#" class="menu-link" :class="link.id === selectedIndex ? 'active' : null">
              <i class="menu-icon" :class="link.icon"></i>
              <span>{{ link.text }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="col-2 px-0" style="background-color: var(--menu-background-color);"></div>
      <div class="col-2 px-0" style="background-color: var(--menu-background-color);">
        
        <!-- <template v-if="userflag">
          <div class="profile">{{ userid }}</div>
          <button class="btn btn-primary" @click="logout()">Logout</button>
        </template>
        <template v-else>
          <button  type="button" class="btn btn-primary" @click="login()">Login</button>
          <div ></div>
        </template> -->
        
         <template v-if="authStore.user">
          <div class="profile">{{ userid }}</div>
          <button class="btn btn-primary" @click="authStore.logout()">Logout</button>
        </template>
        <template v-else>
          <button  type="button" class="btn btn-primary" @click="login()">Login</button>
          <div ></div>
        </template>

        
        
      </div>
    </div>
  </div>
</template>


<script>
import { useAuthStore } from '../store/piniaStore/authStore';
import { mapStores } from 'pinia';

export default {
  data() {
    return {
      sliderPosition: 0,
      selectedElementWidth: 0,
      selectedIndex: 0,
      userid: "",
      userflag:false,
      links: [
        {
          id: 1,
          icon: "fa fa-home",
          text: "Home",
        },
        {
          id: 2,
          icon: "fa fa-plane",
          text: "Flights",
        },
        {
          id: 3,
          icon: "fa fa-user",
          text: "Profile",
        },
        {
          id: 4,
          icon: "fa fa-question",
          text: "About",
        },
      ],
    };
  },
  methods: {
    sliderIndicator(id) {
      let el = this.$refs[`menu-item_${id}`][0];
      this.sliderPosition = el.offsetLeft;
      this.selectedElementWidth = el.offsetWidth;
      this.selectedIndex = id;
      if (id== 1){
        this.$router.push('/')
      }
    },
    getUser(){
      console.log(this.userid)
      this.userid = localStorage.getItem('userid')
      if (this.userid != null){
        this.userflag = true;
      }else{
        this.userflag = false;
      }
    },
    // logout(){
    //   localStorage.clear();
    //   this.$router.go('/login')
    // },
    login(){
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapStores(useAuthStore),
    positionToMove() {
      return this.sliderPosition + "px";
    },
    sliderWidth() {
      return this.selectedElementWidth + "px";
    },
    
  },
  mounted(){
    this.getUser()
  }
};
</script>

<style>
.profile{
  color:white;
}
:root {
  --active-color: #ffee93;
  --link-text-color: #f1faee;
  --menu-background-color: #1d3557;
  --active-background-color: #132238;
}

.menu {
  padding: 0;
  margin: 0;
  height: 80px;
  /* Increase the height to your desired value */
  position: relative;
  background-color: var(--menu-background-color);
  width: 100%;
  /* Span the entire screen width */
  list-style-type: none;
  overflow: hidden;
}

.menu-item {
  display: inline-flex;
  height: 100%;
  /* Ensure each menu item stretches to the full height of the navbar */
  align-items: center;
  /* Vertically center the menu items */
}

.menu-link {
  padding: 0 20px;
  /* Adjust padding to your preference */
  display: inline-flex;
  align-items: center;
  color: var(--link-text-color);
  text-decoration: none;
  height: 100%;
  /* Ensure menu links stretch to the full height of the menu item */
  transition: background-color 0.3s ease;
  /* Add a smooth background color transition on hover */
}

.menu-link:hover,
.menu-link.active {
  color: var(--active-color);
  background-color: var(--active-background-color);
}

/* icon */
.menu-icon {
  height: 1.5rem;
  width: 1.5rem;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  margin-right: 0.2rem;
}

/* slider */
.menu-indicator {
  position: absolute;
  height: 0.25rem;
  background-color: var(--active-color);
  bottom: 0;
  left: 0;
  margin: auto;
  width: 3rem;
  transition: all ease 0.5s;
}
</style>
