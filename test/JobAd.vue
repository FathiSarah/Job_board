<template>
    <div class="job-ad">
      <h3>{{ ad.title }}</h3>
      <p>{{ ad.description }}</p>
      <button @click="showMore(ad.id)">Learn More</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      ad: Object,
    },
    methods: {
      showMore(id) {
        this.$emit("learn-more", id);
      },
    },
  };
  </script>
  
  <style scoped>
  .job-ad {
    border: 1px solid #ccc;
    padding: 16px;
    margin-bottom: 16px;
  }
  button {
    background-color: #007bff;
    color: white;
    padding: 8px 16px;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  