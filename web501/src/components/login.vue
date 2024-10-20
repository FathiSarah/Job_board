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
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        async handleLogin() {
            try {
                const response = await axios.post("http://localhost:3000/api/login", {
                    email: this.email,
                    password: this.password,
                });

                if (response.status === 200) {
                    alert(response.data.message);

                    localStorage.setItem("token", response.data.token);

                    if (response.data.user.role === "admin") {
                        // If admin, redirect to the admin panel
                        this.$router.push("/admin");
                    } else {
                        // If not admin, redirect to the job listings
                        this.$router.push("/jobs");
                    }
                }
            } catch (error) {
                if (error.response && (error.response.status === 404 || error.response.status === 401)) {
                    this.errorMessage = "Invalid email or password.";
                } else {
                    this.errorMessage = "An error occurred while trying to log in.";
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

.error {
    color: red;
    font-size: 0.9em;
}
</style>