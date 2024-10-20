const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

// Import routes

const advertisementsRoutes = require("./routes/advertisements");
const peoplesRoutes = require("./routes/peoples");
const companiesRoutes = require("./routes/companies");
const applicationsRoutes = require("./routes/applications");
const usersRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");

// Middleware 
const middlewareRouter = require("./middleware/middleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
        return;
    }
    console.log("Connected to the MySQL database");
});

// Welcome endpoint
app.get("/", (req, res) => {
    res.send("Welcome to the Job Board API");
});

// API routes
app.use("/api/advertisements", advertisementsRoutes);
app.use("/api/peoples", peoplesRoutes);
app.use("/api/companies", companiesRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/login", loginRouter);
app.use("/api/signup", signupRouter);

app.use("/api/middleware", middlewareRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});