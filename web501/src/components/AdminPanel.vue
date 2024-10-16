<template>
    <div class="admin-panel">
      <h2>Admin Panel</h2>
      
      <h3>Manage Users</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.first_name }}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button @click="editUser(user)">Edit</button>
              <button @click="deleteUser(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <h3>Create or Edit User</h3>
      <form @submit.prevent="handleSubmit">
        <input v-model="formData.first_name" placeholder="First Name" required />
        <input v-model="formData.last_name" placeholder="Last Name" required />
        <input v-model="formData.email" placeholder="Email" required />
        <input v-model="formData.role" placeholder="Role" required />
        <input type="password" v-model="formData.password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: [],
        formData: {
          id: null,
          first_name: '',
          last_name: '',
          email: '',
          role: '',
          password: ''
        },
      };
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('http://localhost:3000/api/users', {
            headers: { authToken: localStorage.getItem('authToken') }
          });
          this.users = response.data;
        } catch (error) {
          console.error('Error fetching users', error);
        }
      },
      async handleSubmit() {
        try {
          if (this.formData.id) {
            // Update existing user
            await axios.put(`http://localhost:3000/api/users/${this.formData.id}`, this.formData, {
              headers: { authToken: localStorage.getItem('authToken') }
            });
          } else {
            // Create new user
            await axios.post('http://localhost:3000/api/users', this.formData, {
              headers: { authToken: localStorage.getItem('authToken') }
            });
          }
          this.fetchUsers(); // Refresh user list
          this.resetForm();
        } catch (error) {
          console.error('Error submitting form', error);
        }
      },
      editUser(user) {
        this.formData = { ...user };
      },
      async deleteUser(id) {
        try {
          await axios.delete(`http://localhost:3000/api/users/${id}`, {
            headers: { authToken: localStorage.getItem('authToken') }
          });
          this.fetchUsers(); // Refresh user list
        } catch (error) {
          console.error('Error deleting user', error);
        }
      },
      resetForm() {
        this.formData = {
          id: null,
          first_name: '',
          last_name: '',
          email: '',
          role: '',
          password: ''
        };
      }
    }
  };
  </script>
  
  <style scoped>
  .admin-panel {
    max-width: 800px;
    margin: 0 auto;
  }
  
  table {
    width: 100%;
    margin-bottom: 20px;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
  }
  
  button {
    margin-right: 5px;
  }
  </style>  