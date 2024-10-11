<template>
     <div>
       <h2>Home</h2>
       <router-link to="/login">Login</router-link> <br>
       <router-link to="/job/:id">Job List</router-link>

       <!-- Your job listings can go here -->
     </div>
   </template>
   
   <script>
   export default {
     name: 'HomePage', // This should match the filename
   };
   </script>
   
   <style scoped>
   /* Add your styles here */
   </style>
   