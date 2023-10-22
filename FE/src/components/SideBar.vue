<template>
    <div id="app">
      <div class="sidebar">
        <div class="logo">Your Logo</div>
        <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/contact">Contact</router-link>
        </nav>
      </div>
      <div class="content">
        <!-- Your main content goes here -->
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Side_Bar',
  };
  </script>
  
  <style>
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
  }
  
  #app {
    display: flex;
  }
  
  .sidebar {
    width: 250px;
    height: 100vh;
    background-color: #000; /* Black background color */
    color: #ff0000; /* Red text color */
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow-y: auto; /* Make sidebar scrollable if it overflows */
  }
  
  .logo {
    font-size: 28px; /* Larger font size for the logo */
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  nav {
    display: flex;
    flex-direction: column;
  }
  
  nav a {
    color: #ff0000; /* Red text color */
    text-decoration: none;
    padding: 10px 0;
    transition: background-color 0.3s;
  }
  
  nav a:hover {
    background-color: #333; /* Darker shade on hover */
  }
  
  .content {
    flex: 1;
    padding: 20px;
    margin-left: 250px; /* Adjust margin to accommodate the sidebar width */
    overflow-y: auto; /* Make content scrollable */
  }
  </style>
  