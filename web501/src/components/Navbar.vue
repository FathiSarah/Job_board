<template>
    <nav class="navbar">
      <div class="navbar-container">
            <div class="navbar-brand">
                <a href="/">Across the street</a>
            </div>
    
            <!-- Navigation Links -->
            <ul class="navbar-links">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/jobs">Jobs</router-link></li>
                <li><router-link to="/profile">Profile</router-link></li>
            </ul>

            <!-- Login Button -->
            <div class="navbar-actions">
                <button class="login-button" @click="goToLogin">Login</button>
                <button class="signup-button" @click="goToSignUp">Sign up</button>
            </div>
        </div>
    </nav>
</template>
  
<script>
    export default {
        methods: {
            goToLogin() {
                this.$router.push('/login'); // Navigate to the login page
            },
            goToSignUp() {
                this.$router.push('/signup'); // Navigate to the signup page
            },
        },
    };
</script>
  
<style scoped>
    /* Navbar Container */
    .navbar {
        background: radial-gradient(circle, #0057b7, #fff, #ef4135);
        color: white;
        padding: 10px 20px;
        font-family: 'Playfair Display', serif;
    }
    
    .navbar-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1400px;
        margin: 0 auto;
    }
    
    .navbar-brand a {
        color: rgb(0, 0, 0);
        text-decoration: none;
        font-size: 24px;
        font-weight: bold;
    }
    
    /* Navbar Links */
    .navbar-links {
        list-style: none;
        display: flex;
        margin: 0;
        padding: 0;
    }
    
    .navbar-links li {
        margin-left: 20px;
    }
    
    .navbar-links a {
        color: white;
        text-decoration: none;
        font-size: 24px;
        padding: 8px 12px;
        transition: background-color 0.3s;
    }
    
    .navbar-links a:hover {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 5px;
    }

    .login-button, .signup-button {
        background: white;
        color: rgb(0, 0, 0);
        border: none;
        margin: 10px;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    
    .login-button:hover , .signup-button:hover {
        background: radial-gradient(circle, #002c5b61, #85858564, #84241d63);
    }
</style>
  