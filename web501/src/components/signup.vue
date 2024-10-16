<template>
    <div class="signup-container">
        <h2>Sign Up</h2>
  
      <!-- Button Selection for Job Seeker or Company -->
        <div class="button-group">
            <button @click="selectRole('jobSeeker')" :class="{ active: selectedRole === 'jobSeeker' }">Sign Up as Job Seeker</button>
            <button @click="selectRole('company')" :class="{ active: selectedRole === 'company' }">Sign Up as Company</button>
        </div>
  
        <!-- Display Job Seeker Form -->
        <form v-if="selectedRole === 'jobSeeker'" @submit.prevent="handleJobSeekerSignUp">
            <h3>Job Seeker Sign Up</h3>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" v-model="jobSeeker.email" required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" v-model="jobSeeker.password" required />
            </div>
            <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" v-model="jobSeeker.firstName" required />
            </div>
            <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input type="text" v-model="jobSeeker.lastName" required />
            </div>
            <div class="form-group">
                <label for="city">city:</label>
                <input type="text" v-model="jobSeeker.city" required />
            </div>
            <div class="form-group">
            <label for="zipcode">zip code:</label>
            <input type="text" v-model="jobSeeker.zipcode" required />
            </div>
            <div class="form-group">
            <label for="tel">tel :</label>
            <input type="text" v-model="jobSeeker.tel" />
            </div>
            <button type="submit">Sign Up as Job Seeker</button>
        </form>

        <!-- Display Company Form -->
        <form v-if="selectedRole === 'company'" @submit.prevent="handleCompanySignUp">
            <h3>Company Sign Up</h3>
            <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" v-model="company.email" required />
            </div>
            <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" v-model="company.password" required />
            </div>
            <div class="form-group">
            <label for="companyName">Company Name:</label>
            <input type="text" v-model="company.companyName" required />
            </div>
            <div class="form-group">
            <label for="website">Website:</label>
            <input type="text" v-model="company.website" />
            </div>
            <button type="submit">Sign Up as Company</button>
        </form>
    </div>
</template>
  
<script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        selectedRole: null, // Track whether the user is signing up as job seeker or company
        jobSeeker: {
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        },
        company: {
          companyName: '',
          email: '',
          website: '',
          password: ''
        }
      };
    },
    methods: {
      selectRole(role) {
        this.selectedRole = role; // Sets the selected role (either 'jobSeeker' or 'company')
      },
      async handleJobSeekerSignUp() {
        try {
          const response = await axios.post('http://localhost:3000/api/jobSeekerSignUp', {
            firstName: this.jobSeeker.firstName,
            lastName: this.jobSeeker.lastName,
            email: this.jobSeeker.email,
            password: this.jobSeeker.password
          });
          alert('Job Seeker account created successfully!');
          // Handle redirection or other actions after successful signup
        } catch (error) {
          console.error('Error signing up as job seeker:', error);
        }
      },
      async handleCompanySignUp() {
        try {
          const response = await axios.post('http://localhost:3000/api/companySignUp', {
            companyName: this.company.companyName,
            email: this.company.email,
            website: this.company.website,
            password: this.company.password
          });
          alert('Company account created successfully!');
          // Handle redirection or other actions after successful signup
        } catch (error) {
          console.error('Error signing up as company:', error);
        }
      }
    }
  };
</script>

<style scoped>
  .signup-container {
        max-width: 400px;
        margin: 50px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
  
    .form-group {
        margin-bottom: 15px;
    }
  
    button {
        padding: 10px 15px;
    }
</style>