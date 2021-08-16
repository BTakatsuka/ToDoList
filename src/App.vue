<template>
  <div id="app">
    <NavigationBar/>
    <router-view/>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'

export default {
  components: {
    NavigationBar,
  }
}
</script>

<style>
@import './assets/css/hover.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
