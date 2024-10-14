<template>
  <div id="app">
    <h1>HireMe</h1>
    <!-- Navigation Links -->
    <router-link to="/login">Login</router-link> <br>
    <JobList v-if="showJobList" />
    <!-- Router view for other routes -->
    <router-view v-else></router-view>
  </div>
</template>

<script>
import JobList from './components/JobList.vue';

export default {
  name: 'App',
  components: {
    JobList,
  },
  data() {
    return {
      showJobList: true, // Controls whether to show the JobList or router view
    };
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
