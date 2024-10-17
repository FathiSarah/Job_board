<template>
  <div id="app">
    <h1>HireMe</h1>
    <!-- Navigation Links -->
    <router-link to="/login">Login</router-link> <br>

    <!-- JobList Component is directly rendered here -->
    <JobList />

    <!-- Keep router-view for other routes like login -->
    <router-view></router-view>
  </div>
</template>

<script>
import JobList from './components/JobList.vue';

export default {
  name: 'App',
  components: {
    JobList, // Import and use JobList component
  },
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
