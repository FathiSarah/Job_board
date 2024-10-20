## Job Board Application

This is a full-stack Job Board Application built with Vue.js on the frontend and Node.js/Express with a MySQL database on the backend. The app allows users to sign up as either job seekers or companies, log in, view job listings and apply.

Technology Stack:
- Frontend: Vue.js 3 (Vue Router, Axios)
- Backend: Node.js, Express.js, MySQL, JWT, Bcrypt
- Database: MySQL

Prerequisites :
- Node.js
- MySQL

## Project Setup

1. git clone git@github.com:EpitechMscProPromo2027/T-WEB-501-STG_15.git
2. Install Node.js if it's not already done.

3. Navigate to the Job_api folder and run the following command to install dependencie :
    npm install
4. Set up your `.env` file based on this exemple :
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=password
    DB_NAME=job_board
    PORT=3000
5. Import the MySQL database (from the SQL dump provided) :
    mysql -u root -p job_board < database.sql
6. Start the backend server :
    npm start

7. Navigate to the web501 folder and run the following command to install dependencie :
    npm install
8. Start the frontend server :
    npm run preview

## Project Structure

/backend               # Express backend (API)
  /routes              # API routes (login.js, signup.js, etc.)
  /middleware          # Authentication middleware
  index.js             # Entry point for the Express server

/frontend              # Vue.js frontend
  /components          # Vue components (Login.vue, Profile.vue, etc.)
  App.vue              # Main app component
  main.js              # Vue app entry point
  router.js            # Vue Router configuration

job_board.sql          # MySQL database schema
README.md              # Project documentation