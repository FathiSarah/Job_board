<template>
  <div class="signup-container">
      <h2>Sign Up</h2>

      <div class="button-group">
        <button @click="selectRole('job_seeker')" :class="{ active: selectedRole === 'job_seeker' }">Sign Up as Job Seeker</button>
        <button @click="selectRole('company')" :class="{ active: selectedRole === 'company' }">Sign Up as Company</button>
      </div>

      <form v-if="selectedRole === 'job_seeker'" @submit.prevent="handleJobSeekerSignUp">
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
              <label for="city">City:</label>
              <input type="text" v-model="jobSeeker.city" required />
          </div>
          <div class="form-group">
              <label for="zipcode">Zip Code:</label>
              <input type="text" v-model="jobSeeker.zipcode" required />
          </div>
          <div class="form-group">
              <label for="tel">Telephone:</label>
              <input type="text" v-model="jobSeeker.tel" />
          </div>
          <button type="submit">Sign Up as Job Seeker</button>
      </form>

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
          <div class="form-group">
              <label for="city">City:</label>
              <input type="text" v-model="company.city" required />
          </div>
          <div class="form-group">
              <label for="zipcode">Zip Code:</label>
              <input type="text" v-model="company.zipcode" required />
          </div>
          <div class="form-group">
              <label for="description">Description:</label>
              <input type="text" v-model="company.description" required />
          </div>
          <button type="submit">Sign Up as Company</button>
      </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
      return {
          selectedRole: null,
          jobSeeker: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            city: "",
            zipcode: "",
            tel: ""
          },
          company: {
            companyName: "",
            email: "",
            website: "",
            password: "",
            city: "",
            zipcode: "",
            description: ""
          }
      };
  },
  methods: {
      selectRole(role) {
          this.selectedRole = role; // Sets the selected role (either "job_seeker" or "company")
      },
      async handleJobSeekerSignUp() {
          try {
              const response = await axios.post("http://localhost:3000/api/signup", {
                  role: "job_seeker",
                  email: this.jobSeeker.email,
                  password: this.jobSeeker.password,
                  first_name: this.jobSeeker.firstName,
                  last_name: this.jobSeeker.lastName,
                  tel: this.jobSeeker.tel,
                  city: this.jobSeeker.city,
                  zip_code: this.jobSeeker.zipcode
              });
              alert("Job Seeker account created successfully!");
          } catch (error) {
              console.error("Error signing up as job seeker:", error);
          }
      },
      async handleCompanySignUp() {
          try {
              const response = await axios.post("http://localhost:3000/api/signup", {
                  role: "company",
                  email: this.company.email,
                  password: this.company.password,
                  name: this.company.companyName,
                  website: this.company.website,
                  city: this.company.city,
                  zip_code: this.company.zipcode,
                  description: this.company.description
              });
              alert("Company account created successfully!");
          } catch (error) {
              console.error("Error signing up as company:", error);
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

  .button-group {
    margin-bottom: 20px;
  }

  .button-group button.active {
    background-color: #007bff;
    color: white;
  }
</style>