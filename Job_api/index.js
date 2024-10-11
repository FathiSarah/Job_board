const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

const advertisementsRoutes = require("./routes/advertisements");
const peoplesRoutes = require("./routes/peoples");
const companiesRoutes = require("./routes/companies");
const applicationsRoutes = require("./routes/applications");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
        return;
    }
    console.log("Connected to the MySQL database");
});

app.get("/", (req, res) => {
    res.send("Welcome to the Job Board API");
});

app.use("/api/advertisements", advertisementsRoutes);
app.use("/api/peoples", peoplesRoutes);
app.use("/api/companies", companiesRoutes);
app.use("/api/applications", applicationsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});