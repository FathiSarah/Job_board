<template>
    <div class="job-list-container">
    <div class="job-list">
        <h2>Job Advertisements</h2>
        <JobAd
        v-for="ad in ads"
        :key="ad.id"
        :ad="ad"
        @learn-more="handleLearnMore"
        />
    </div>
    <div class="job-details">
        <JobAdDetails
        v-if="selectedAd"
        :ad="selectedAd"
        @close-details="closeDetails"
        />
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import JobAd from './JobAd.vue';  // Importing JobAd component
import JobAdDetails from './JobAdDetails.vue';  // Importing JobAdDetails component

export default {
    components: {
        JobAd,
        JobAdDetails,
    },
    data() {
        return {
            ads: [],
            selectedAd: null,  // Holds the currently selected job ad
        };
    },
    methods: {
        async fetchAdvertisements() {
        try {
            const response = await axios.get('http://localhost:3000/api/advertisements'); // Adjust URL as needed
            this.ads = response.data;  // Assign the fetched data to ads
        } catch (error) {
            console.error('Error fetching advertisements:', error);
        }
        },
        handleLearnMore(id) {
            this.selectedAd = this.ads.find(ad => ad.id === id);  // Set the selected ad
        },
        closeDetails() {
            this.selectedAd = null;  // Clear selected ad to hide details
        },
    },
};
</script>

<style scoped>
.job-list-container {
    display: flex;  /* Use flexbox layout */
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 20vh;
}

.job-list {
    flex: 1;  /* Take available space */
    padding: 20px;
    border-right: 1px solid #ccc;  /* Optional: add a separator */
}

.job-details {
    flex: 2;  /* Take twice the space of job-list */
    padding: 20px;
}

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
