<template>
  <div id="app">
    <h1>HireMe</h1>
    <!-- Navigation Links -->
    <router-link to="/login">Login</router-link> <br>
    <!-- Job List Link -->
    <router-link to="/jobs">Job List</router-link>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
