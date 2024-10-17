<template>
     <div>
       <h1>Job Listings</h1>
       <div v-for="job in jobs" :key="job.id" class="job-listing">
         <h2>{{ job.title }}</h2>
         <p>{{ job.description }}</p>
         <button @click="viewJob(job.id)">Learn More</button>
       </div>
     </div>
   </template>
   
   <script>
   export default {
     data() {
       return {
         jobs: [
           { id: 1, title: "Frontend Developer", description: "Develop and maintain web applications." },
           { id: 2, title: "Backend Developer", description: "Work on server-side logic and databases." },
         ],
       };
     },
     methods: {
       viewJob(id) {
         this.$router.push({ name: 'JobDetail', params: { id } });
       },
     },
   };
   </script>
   
   <style scoped>
   .job-listing {
     margin-bottom: 20px;
   }
   </style>
   