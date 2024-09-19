<template>
  <div class="home-page">
    <Header class="header"></Header>
    <Navbar class="navbar"></Navbar>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar/Navbar.vue";
import { RouterView } from "vue-router";
import Header from "./components/Header/Header.vue";
</script>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.home-page {
  display: grid;
  grid-template-areas:
    "header header"
    "navbar content"
    "navbar content";
  grid-template-columns: 280px 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
}

.navbar {
  grid-area: navbar;
}
.header {
  grid-area: header;
}

.content {
  grid-area: content;
  margin: 10px 20px;
}
</style>
