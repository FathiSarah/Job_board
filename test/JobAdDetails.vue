<template>
    <div class="job-ad-details" v-if="ad">
      <h2>{{ ad.title }}</h2>
      <p>{{ ad.description }}</p>
      <h3>Additional Information:</h3>
      <ul>
        <li><strong>Company:</strong> {{ ad.company }}</li>
        <li><strong>Location:</strong> {{ ad.location }}</li>
        <li><strong>Salary:</strong> {{ ad.salary }}</li>
        <li><strong>Requirements:</strong> {{ ad.requirements }}</li>
      </ul>
      <button @click="closeDetails">Close</button>
    </div>
  </template>

  <script>
  export default {
    props: {
      ad: Object,  // The job ad data is passed as a prop
    },
    methods: {
      closeDetails() {
        this.$emit("close-details");  // Emit event to close details
      },
    },
  };
  </script>
  
  <style scoped>
  .job-ad-details {
    border: 1px solid #ccc;
    padding: 16px;
    margin: 16px 0;
    background-color: #f9f9f9;
  }
  button {
    background-color: #dc3545;  /* Bootstrap danger color */
    color: white;
    padding: 8px 16px;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #c82333;
  }
  </style>
  