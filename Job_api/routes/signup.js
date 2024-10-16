const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

router.post("/", (req, res) => {
    const { role, email, password, name, description, website, tel, city, zip_code, first_name, last_name } = req.body;

    // Validate common fields
    if (!role || !email || !password || !city || !zip_code) {
        return res.status(400).json({ message: "Role, email, password, city, and zip_code are required" });
    }

    // Validate role-specific fields
    if (role === "company") {
        if (!name || !description || !website) {
            return res.status(400).json({ message: "Company name, description, and website are required" });
        }
    } else if (role === "job_seeker") {
        if (!first_name || !last_name || !tel) {
            return res.status(400).json({ message: "First name, last name, and telephone are required" });
        }
    } else {
        return res.status(400).json({ message: "Invalid role specified" });
    }

    // Insert into users table
    db.query("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [email, password, role], (err, userResult) => {
        if (err) {
            return res.status(500).send(err);
        }

        const userId = userResult.insertId; // Get the user ID

        // If the role is "company", insert into the companies table
        if (role === "company") {
            db.query(
                "INSERT INTO companies (user_id, name, description, website, city, zip_code) VALUES (?, ?, ?, ?, ?, ?)",
                [userId, name, description, website, city, zip_code],
                (err, companyResult) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.status(201).json({
                        message: "Company account created successfully",
                        user_id: userId,
                        email,
                        name,
                        description,
                        website,
                        city,
                        zip_code,
                    });
                }
            );
        }

        // If the role is "job_seeker", insert into the peoples table
        else if (role === "job_seeker") {
            db.query(
                "INSERT INTO peoples (user_id, first_name, last_name, tel, city, zip_code) VALUES (?, ?, ?, ?, ?, ?)",
                [userId, first_name, last_name, tel, city, zip_code],
                (err, peopleResult) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.status(201).json({
                        message: "Job seeker account created successfully",
                        user_id: userId,
                        email,
                        first_name,
                        last_name,
                        tel,
                        city,
                        zip_code,
                    });
                }
            );
        }
    });
});

module.exports = router;
