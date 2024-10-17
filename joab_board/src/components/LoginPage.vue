<template>
  <div>
    <h2>Login Page</h2>
    <button @click="setRole('applicant')">I Want to Apply for a Job</button>
    <button @click="setRole('employer')">I Want to Post a Job</button>

    <!-- Login form, only email and password -->
    <form v-if="role === 'applicant' || role === 'employer'">
      <h3>{{ role === 'applicant' ? 'Login Candidate' : 'Login Company' }}</h3>
      <input v-model="loginEmail" placeholder="Login email" @input="validateLoginEmail" />
      <p v-if="loginEmailError" style="color: red;">{{ loginEmailError }}</p>
      <input v-model="loginPassword" type="password" placeholder="Login password" />
      <button :disabled="loginEmailError || !loginEmail || !loginPassword" @click="login">Login</button>
    </form>

    <!-- Signup section with additional fields -->
    <form v-if="role === 'applicant' || role === 'employer'">
      <h3>{{ role === 'applicant' ? 'Sign Up Candidate' : 'Sign Up Company' }}</h3>
      <input v-model="signupFirstName" placeholder="First Name" />
      <input v-model="signupLastName" placeholder="Last Name" />
      <input v-model="signupUsername" placeholder="Username" />
      <input v-model="signupEmail" placeholder="Email" @input="validateSignupEmail" />
      <p v-if="signupEmailError" style="color: red;">{{ signupEmailError }}</p>
      <input v-model="signupPassword" type="password" placeholder="Password" />
      <input v-model="signupPhone" placeholder="Phone Number" />
      <input v-model="signupZipcode" placeholder="Zip Code" @input="validateZipcode" />
      <p v-if="zipcodeError" style="color: red;">{{ zipcodeError }}</p>
      <button :disabled="signupEmailError || zipcodeError || !signupFirstName || !signupLastName || !signupUsername || !signupEmail || !signupPassword || !signupZipcode" @click="signup">Sign Up</button>
    </form>

    <br><br><router-link to="/">Back to Home</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: '',
      // Separate data for login and signup forms
      loginEmail: '',
      loginPassword: '',
      signupFirstName: '',
      signupLastName: '',
      signupUsername: '',
      signupEmail: '',
      signupPassword: '',
      signupPhone: '',
      signupZipcode: '',
      zipcodeError: '', // Error message for invalid zipcode
      signupEmailError: '', // Error message for invalid signup email
      loginEmailError: ''   // Error message for invalid login email
    };
  },
  methods: {
    setRole(role) {
      this.role = role;
      this.resetForm(); // Reset the form fields when switching roles
    },
    resetForm() {
      // Clear all form fields and errors
      this.loginEmail = '';
      this.loginPassword = '';
      this.signupFirstName = '';
      this.signupLastName = '';
      this.signupUsername = '';
      this.signupEmail = '';
      this.signupPassword = '';
      this.signupPhone = '';
      this.signupZipcode = '';
      this.zipcodeError = ''; 
      this.signupEmailError = '';
      this.loginEmailError = '';
    },
    login(event) {
      event.preventDefault(); // Prevent form submission default
      if (this.validateEmail(this.loginEmail)) {
        const loginData = {
          email: this.loginEmail,
          password: this.loginPassword,
          role: this.role
        };
        console.log(loginData);
        alert('Login Submitted');
        this.$router.push('/');
      } else {
        alert("Please enter a valid email");
      }
    },
    signup(event) {
      event.preventDefault(); // Prevent form submission default
      if (this.validateEmail(this.signupEmail)) {
        const signupData = {
          firstName: this.signupFirstName,
          lastName: this.signupLastName,
          username: this.signupUsername,
          email: this.signupEmail,
          password: this.signupPassword,
          phone: this.signupPhone,
          zipcode: this.signupZipcode,
          role: this.role
        };
        console.log(signupData);
        alert('Signup Submitted');
        this.$router.push('/');
      } else {
        alert("Please enter a valid email");
      }
    },
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    validateSignupEmail() {
      if (!this.validateEmail(this.signupEmail)) {
        this.signupEmailError = "Please enter a valid email address.";
      } else {
        this.signupEmailError = "";
      }
    },
    validateLoginEmail() {
      if (!this.validateEmail(this.loginEmail)) {
        this.loginEmailError = "Please enter a valid email address.";
      } else {
        this.loginEmailError = "";
      }
    },
    validateZipcode() {
      if (!/^\d+$/.test(this.signupZipcode)) {
        this.zipcodeError = "Zip code must contain numbers only.";
      } else {
        this.zipcodeError = "";
      }
    }
  }
};
</script>
