<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '', // Error message state
    };
  },
  methods: {
    async handleLogin() {
      try {
        // Send a POST request to the login API
        const response = await axios.post('http://localhost:3000/api/login', {
          email: this.email,
          password: this.password,
        });

        if (response.status === 200) {
          // Successful login
          alert(response.data.message);

          // Store auth token in localStorage
          localStorage.setItem('authToken', response.data.user.id); // Assuming user.id is used as token

          // Check if the user is an admin or regular user
          if (response.data.user.role === 'admin') {
            // If admin, redirect to the admin panel
            this.$router.push('/admin');
          } else {
            // If not admin, redirect to the job listings
            this.$router.push('/jobs');
          }
        }
      } catch (error) {
        // Error handling
        if (error.response && error.response.status === 404) {
          this.errorMessage = 'Invalid email or password.';
        } else if (error.response && error.response.status === 401) {
          this.errorMessage = 'Invalid email or password.';
        } else {
          this.errorMessage = 'An error occurred while trying to log in.';
          console.error(error);
        }
      }
    }
  }
};
</script>

<style scoped>
.login-container {
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
