<template>
     <div>
       <h2>{{ job.title }}</h2>
       <p>{{ job.description }}</p>
       <button @click="apply">Apply Now</button>
     </div>
   </template>
   
   <script>
   export default {
     data() {
       return {
         job: {},
       };
     },
     mounted() {
       this.getJobDetails();
     },
     methods: {
       getJobDetails() {
         const jobId = this.$route.params.id;
         const jobs = [
           { id: 1, title: "Frontend Developer", description: "Detailed frontend job description." },
           { id: 2, title: "Backend Developer", description: "Detailed backend job description." },
         ];
         this.job = jobs.find(job => job.id == jobId);
       },
       apply() {
         this.$router.push('/loginPage');
       },
     },
   };
   </script>
   