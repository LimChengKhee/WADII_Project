<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-8 px-0">
        <ul class="menu">
          <img class="ms-4" src="../img/EcoBound.png" style="height: 50px;cursor:pointer; max-width: 100%;"
            alt="EcoBound Logo" @click="sliderIndicator(1)">
          <div class="menu-indicator" :style="{ left: positionToMove, width: sliderWidth }"></div>
          <li class="menu-item" v-for="link in links" :key="link.id" @click="sliderIndicator(link.id)"
            :ref="'menu-item_' + link.id">
            <a href="#" class="menu-link" :class="link.id === selectedIndex ? 'active' : null">
              <i class="menu-icon" :class="link.icon"></i>
              <span>{{ link.text }}</span>
            </a>
            <!-- <router-link :to="link.route" class="menu-link" :class="link.id === selectedIndex ? 'active' : null">
              <i class="menu-icon" :class="link.icon"></i>
              <span>{{ link.text }}</span>
            </router-link> -->
          </li>
        </ul>
      </div>
      <div class="col-1 px-0" style="background-color: var(--menu-background-color);"></div>
      <div class="col-3 px-0 d-flex align-items-center" style="background-color: var(--menu-background-color);">
        <img src="../img/kfc.png" class="rounded-circle" style="height: 30px; width:auto" alt="profileImg">



        <template v-if="authStore.user">
          <div class="profile">{{ authStore.user }}</div>
          <button class="btn btn-primary" @click="authStore.logout()">Logout</button>
        </template>

        <template v-else>

          <router-link to="/login">
            <button type="button" class="button m-3 px-6" @click="login()" style="background-color:#de503a;">Log in</button>
          </router-link>

          <router-link to="/Sign-Up">
            <button type="button" class="button m-3 px-6">Sign up</button>
          </router-link>

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
      userflag: false,
      links: [
        {
          id: 1,
          icon: "fa fa-home",
          text: "Home",
          
        },
        {
          id: 2,
          icon: "fa fa-gear",
          text: "Dashboard",
          
        },
        {
          id: 3,
          icon: "fa fa-question",
          text: "About",
          
        },

        {
          id: 4,
          icon: "fa fa-question",
          text: "Hotel",
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
      var routes = { 1: '/', 2: '/flight', 3: '/', 4: '/hotel' }
      var page = routes[id]
      this.$router.push(page)
    },
    getUser() {
      console.log(this.userid)
      this.userid = localStorage.getItem('userid')
      if (this.userid != null) {
        this.userflag = true;
      } else {
        this.userflag = false;
      }
    },
    login() {
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
  mounted() {
    // this.getUser()
    // const authStore = useAuthStore();
    // this.userid = authStore.user
  }
};
</script>

<style>
.profile {
  color: white;
}

body {
  font-family: var(bs);
}

:root {
  --active-color: #ffee93;
  --link-text-color: #f1faee;
  --menu-background-color: rgba(255, 0, 0, 0);;
  --active-background-color: #EB4F47;
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
  display: inline-flex;
  align-items: center;
  color: var(--link-text-color);
  text-decoration: none;
  height: 100%;
  transition: background-color 0.3s ease;
  /* text-transform: uppercase; Add this line to capitalize the text */
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

.button {
  border: none;
  color: black;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
  font-size: 1rem;
}

.rounded-circle {
  background-color: white;
}



</style>
