import { createApp } from 'vue'; // Import createApp
import App from './App.vue';
import router from './router';

const app = createApp(App); // Create the Vue app
app.use(router); // Use the router
app.mount('#app'); // Mount the app
