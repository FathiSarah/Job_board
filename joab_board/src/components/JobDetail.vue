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
      const jobId = Number(this.$route.params.id); // Convert jobId to a number
      const jobs = [
        { id: 1, title: "Frontend Developer", description: "Detailed frontend job description." },
        { id: 2, title: "Backend Developer", description: "Detailed backend job description." },
      ];
      // Find job by ID
      this.job = jobs.find(job => job.id === jobId) || {}; // Default to empty object if not found
    },
    apply() {
      this.$router.push('/loginPage'); // Ensure this route exists in your router
    },
  },
};
</script>
