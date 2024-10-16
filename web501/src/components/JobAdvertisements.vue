<template>
    <div class="job-advertisements">
        <h1>Job Advertisements</h1>
        <div v-if="loading">Loading job advertisements...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else>
            <!-- Display the list of job ads -->
            <div v-for="ad in advertisements" :key="ad.id" class="job-ad">
                <h2>{{ ad.title }}</h2>
                <p><strong>City:</strong> {{ ad.city }}</p>
                <p>{{ ad.description }}</p>
        
                <!-- Display detailed info for the selected ad -->
                <div v-if="selectedAd && selectedAd.id === ad.id" class="detailed-info">
                    <p><strong>Salary Range:</strong> {{ selectedAd.salary_range }}</p>
                    <p><strong>Company:</strong> {{ selectedAd.company_name }}</p>
                    <p><strong>Website:</strong>
                    <a :href="selectedAd.company_website" target="_blank">
                        {{ selectedAd.company_website }}
                    </a>
                    </p>
        
                    <!-- Apply button -->
                    <button class="apply-btn" @click="toggleApplicationForm(ad.id)">
                    Apply
                    </button>
        
                    <!-- Application form directly under job ad -->
                    <div v-if="showForm && selectedJobForApplication.id === ad.id" class="application-form">
                        <h3>Apply for: {{ selectedJobForApplication.title }}</h3>
                        <form @submit.prevent="submitApplication">
                            <label for="complet_name">Full Name:</label>
                            <input type="text" v-model="applicationForm.complet_name" required />
            
                            <label for="email">Email:</label>
                            <input type="email" v-model="applicationForm.email" required />
            
                            <label for="message">Message:</label>
                            <textarea v-model="applicationForm.message" required></textarea>
            
                            <button class="submit-btn" type="submit" :disabled="loadingSubmission">
                            Submit Application
                            </button>
                        </form>
                    </div>
                </div>
            
                <!-- Show or hide "Learn More" depending on selection -->
                <button class="learn-more-btn" v-if="!selectedAd || selectedAd.id !== ad.id" @click="learnMore(ad.id)">
                    Learn More
                </button>
        
                <!-- Hide the "Learn More" button and show a "Show Less" option -->
                <button class="show-less-btn" v-if="selectedAd && selectedAd.id === ad.id" @click="showLess">
                    Show Less
                </button>
                
            </div>
        </div>
    </div>
</template>
  
  
<script>
    export default {
        data() {
            return {
                advertisements: [], // Store all ads
                loading: true, // Loading state
                error: null, // Error state
                selectedAd: null, // Store the selected ad"s details
                showForm: false, // Show/Hide form
                selectedJobForApplication: null, // Store selected job for application
                applicationForm: { // Form data
                complet_name: "", // Update to match DB column
                email: "",
                message: ""
                },
                loadingSubmission: false, // Loading state for submission
                submissionError: null, // Error state for submission
                submissionSuccess: false // Success state for submission
            };
        },

        created() {
            // Fetch all advertisements when the component is mounted
            this.fetchAdvertisements();
        },

        methods: {
            // Fetch all advertisements
            async fetchAdvertisements() {
                try {
                const response = await fetch("http://localhost:3000/api/advertisements");
                if (!response.ok) {
                    throw new Error("Failed to fetch advertisements");
                }
                this.advertisements = await response.json();
        
                // Fetch additional details for each advertisement
                for (const ad of this.advertisements) {
                    const companyResponse = await fetch(`http://localhost:3000/api/companies/${ad.company_id}`);
                    if (companyResponse.ok) {
                    const companyData = await companyResponse.json();
                    ad.company_name = companyData.name;
                    ad.company_website = companyData.website;
                    }
                }
                } catch (err) {
                this.error = err.message;
                } finally {
                this.loading = false;
                }
            },
        
            // Fetch details for the selected advertisement when "Learn More" is clicked
            async learnMore(adId) {
                try {
                    const response = await fetch(`http://localhost:3000/api/advertisements/${adId}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch advertisement details");
                    }
                    this.selectedAd = await response.json(); // Store the detailed ad information
                } catch (err) {
                    this.error = err.message;
                }
            },
        
            // Show less
            showLess() {
                this.selectedAd = null;
            },
        
            // Toggle the application form visibility for the selected job
            toggleApplicationForm(jobId) {
                if (this.selectedJobForApplication && this.selectedJobForApplication.id === jobId) {
                    this.showForm = !this.showForm;
                } else {
                    this.selectedJobForApplication = this.advertisements.find(ad => ad.id === jobId);
                    this.showForm = true;
                }
            },
        
            // Submit the application form
            async submitApplication() {
                const applicationData = {
                    user_id: 4,
                    advertisement_id: this.selectedJobForApplication.id,
                    complet_name: this.applicationForm.complet_name,
                    email: this.applicationForm.email,
                    message: this.applicationForm.message
                };
        
                this.loadingSubmission = true;
        
                try {
                    const response = await fetch("http://localhost:3000/api/applications", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(applicationData)
                    });
        
                    if (!response.ok) {
                        const errorData = await response.json();
                        this.submissionError = errorData.message || "Failed to submit application";
                        throw new Error(this.submissionError);
                    }
        
                    this.submissionSuccess = true;
                    alert("Application submitted successfully!");
            
                    this.showForm = false;
                    this.applicationForm = { complet_name: "", email: "", message: "" };
                } 
                catch (err) {
                    this.error = err.message;
                } 
                finally {
                    this.loadingSubmission = false;
                }
            }
        }
    };
</script>
<style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap");
    
    .job-advertisements {
        max-width: 700px;
        margin: 30px auto;
        padding: 30px;
        font-family: "Playfair Display", serif;
        background: radial-gradient(circle, #0057b7, #fff, #ef4135);
        border-radius: 20px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        color: #2c3e50;
        text-align: center;
    }

    .learn-more-btn,
    .apply-btn {
        display: inline-block;
        padding: 12px 18px;
        font-size: 16px;
        color: white;
        background-color: #0057b7;
        border: none;
        border-radius: 30px;
        cursor: pointer;    
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
    
    .show-less-btn{
        display: inline-block;
        padding: 12px 18px;
        font-size: 16px;
        color: white;
        background-color: #b62121;
        border: none;
        border-radius: 30px;
        cursor: pointer;    
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    .learn-more-btn:hover,
    .apply-btn:hover {
        background-color: #0056b3;
    }

    .show-less-btn:hover{
        background-color: #761313;
    }

    p{
        font-size: 24px;
    }

    h1 {
        font-size: 60px;
        color: rgb(0, 0, 0);
        margin-bottom: 40px;
    }
    
    .job-ad {
        padding: 20px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 10px;
        margin-bottom: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
        font-size: 40px;
        color: #34495e;
    }
    
    p {
        margin: 10px 0;
        color: #2c3e50;
    }
    
    .detailed-info {
        padding: 15px;
        border-radius: 8px;
        background-color: rgba(250, 250, 250, 0.9);
        margin-top: 10px;
        border: 1px solid #e0e0e0;
    }
    
    .application-form {
        margin-top: 20px;
        padding: 15px;
        border-radius: 10px;
        background-color: rgba(240, 240, 240, 0.9);
        border: 1px solid #ddd;
    }
    
    .application-form input,
    .application-form textarea {
        width: 95%;
        padding: 12px;
        margin: 10px 0;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-family: "Playfair Display", serif;
    }
    
    .application-form button {
        display: inline-block;
        padding: 12px 18px;
        font-size: 16px;
        color: rgb(0, 0, 0);
        background: radial-gradient(circle, #0058b761, #ffffff64, #ef413563);
        border: none;
        border-radius: 30px;
        cursor: pointer;    
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
    
    .application-form button:hover {
        background: radial-gradient(circle, #002c5b61, #85858564, #84241d63);
    }
    
    a {
        color: #2980b9;
        text-decoration: none;
        font-family: "Playfair Display", serif;
    }
    
    a:hover {
        text-decoration: underline;
    }
</style>