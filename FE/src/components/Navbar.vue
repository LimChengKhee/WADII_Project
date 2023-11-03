<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 ms-4">
        <nav class="navbar navbar-expand-lg bg-white px-0">
          <div class="container-fluid position-relative d-flex align-items-center">
            <img
              class=""
              src="../img/EcoBound.png"
              style="height: 50px; cursor: pointer; max-width: 100%;"
              alt="EcoBound Logo"
              @click="sliderIndicator(1)"
            />

            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li
                  v-for="link in links"
                  :key="link.id"
                  class="nav-item menu-item"
                  @click="link.action ? this[link.action]() : sliderIndicator(link.id)"
                  :ref="'menu-item_' + link.id"
                >
                  <a href="#" class="nav-link menu-link" :class="link.id === selectedIndex ? 'active' : ''" style="color: black">
                    <i v-if="link.icon" :class="link.icon"></i>
                    <span>{{ link.text }}</span>
                  </a>
                </li>

                <!-- Align login and sign-out to the right -->
                <li
                  v-if="!authStore.user || authStore.user"
                  :key="authStore.user ? 6 : 5"
                  class="nav-item menu-item d-flex align-items-center justify-content-start"
                  
                >
                  <a
                    v-if="!authStore.user"
                    href="#"
                    class="nav-link menu-link"
                    @click="login"
                    style="color: black"
                  >
                    <span>Log in</span>
                  </a>
                  <a
                    v-if="authStore.user"
                    href="#"
                    class="nav-link menu-link"
                    @click="logout"
                    style="color: black"
                  >
                    <span>Sign out</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
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
        icon: "fa fa-hotel",
        text: "Hotel",
      },
      {
        id: 3,
        icon: "fa fa-plane",
        text: "Flights",
      },
      {
        id: 4,
        icon: "fa fa-chart-line",
        text: "Dashboard",
      },
      // {
      //   id: 5,
      //   text: "Log in",
      //   action: "login",
      // },
      // {
      //   id: 6,
      //   text: "Sign out",
      //   action: "logout",
      // },
    ],
  };
},
  methods: {
    sliderIndicator(id) {
      let el = this.$refs[`menu-item_${id}`][0];
      this.sliderPosition = el.offsetLeft;
      this.selectedElementWidth = el.offsetWidth;
      this.selectedIndex = id;
      var routes = { 1: '/', 2: '/hotel', 3: '/flight', 4: '/dashboard' }
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
    logout() {
      this.authStore.logout();
      this.$router.push('/login')
    },
    login() {
      this.$router.push('/login')
    },

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
<style scoped>
.profile {
  color: white;
}

body {
  font-family: var(bs);
}


.button-80 {
  background: #fff;
  backface-visibility: hidden;
  border-radius: .375rem;
  border-style: solid;
  border-width: .125rem;
  box-sizing: border-box;
  color: #212121;
  cursor: pointer;
  display: inline-block;
  font-family: Circular, Helvetica, sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -.01em;
  line-height: 1.3;
  padding: .875rem 1.125rem;
  position: relative;
  text-align: left;
  text-decoration: none;
  transform: translateZ(0) scale(1);
  transition: transform .2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-80:not(:disabled):hover {
  transform: scale(1.05);
}

.button-80:not(:disabled):hover:active {
  transform: scale(1.05) translateY(.125rem);
}

.button-80:focus {
  outline: 0 solid transparent;
}

.button-80:focus:before {
  content: "";
  left: calc(-1*.375rem);
  pointer-events: none;
  position: absolute;
  top: calc(-1*.375rem);
  transition: border-radius;
  user-select: none;
}

.button-80:focus:not(:focus-visible) {
  outline: 0 solid transparent;
}

.button-80:focus:not(:focus-visible):before {
  border-width: 0;
}

.button-80:not(:disabled):active {
  transform: translateY(.125rem);
}

:root {
  --active-color: #5a47eb;
  --link-text-color: black;
  --menu-background-color: rgba(255, 0, 0, 0);

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
  margin-left: 20px;
  
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

* {
  /* color: white; */
  font-weight: var(--menu-background-color);
  color: black;
  
}

/* Styling the navbar dropdown */
.navbar-toggler {
  border: none;
  background: transparent;
  outline: none;
}

.navbar-toggler-icon {
  width: 1.5rem;
  height: 1.5rem;
  background-image: url(../img/menu.png);
  
  /* Replace "path_to_your_hamburger_icon" with the actual path to your hamburger icon */
  background-size: cover;
}

/* Styling the dropdown menu */
.navbar-collapse {
  text-align: center;
}

.navbar-nav {
  margin-top: 10px;
}

.nav-link {
  color: black;
  font-size: 1.2rem;
  padding: 10px;

}

/* Styling the active link in the dropdown */
.nav-link.active {
  color: #EB4F47;
  font-weight: bold;
}

.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


</style>
