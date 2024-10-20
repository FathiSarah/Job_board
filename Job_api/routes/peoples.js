const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const authenticateJWT = require("../middleware/middleware.js");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Get all peoples
router.get("/", authenticateJWT, (req, res) => {
    db.query(`
        SELECT peoples.*, users.email 
        FROM peoples 
        JOIN users ON peoples.user_id = users.id`, 
        (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json(results);
        });
});

// Get a specific people by ID
router.get("/:id", authenticateJWT, (req, res) => {
    const { id } = req.params;
    db.query(`
        SELECT peoples.*, users.email 
        FROM peoples 
        JOIN users ON peoples.user_id = users.id 
        WHERE peoples.id = ?`, 
        [id], 
        (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (results.length === 0) {
                return res.status(404).send("User not found");
            }
            res.status(200).json(results[0]);
        }
    );
});

// Create a new job seeker people with corresponding user entry
router.post("/", authenticateJWT, (req, res) => {
    const { first_name, last_name, email, tel, city, zip_code, password } = req.body;

    if (!first_name || !last_name || !email || !tel || !city || !zip_code || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Create a user and then insert the job seeker linked to the created user
    db.query("INSERT INTO users (email, password, role) VALUES (?, ?, 'job_seeker')", 
        [email, password], 
        (err, userResult) => {
            if (err) {
                return res.status(500).send(err);
            }

            const userId = userResult.insertId; // Get the ID of the created user

            db.query("INSERT INTO peoples (user_id, first_name, last_name, tel, city, zip_code) VALUES (?, ?, ?, ?, ?, ?)",
                [userId, first_name, last_name, tel, city, zip_code],
                (err, peopleResult) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.status(200).json({ 
                        id: peopleResult.insertId, 
                        user_id: userId, 
                        first_name, 
                        last_name, 
                        email, 
                        tel, 
                        city, 
                        zip_code 
                    });
                }
            );
        }
    );
});

// Update a specific job seeker and their corresponding user info
router.put("/:id", authenticateJWT, (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, tel, city, zip_code, password } = req.body;

    // Update the email and password in the `users` table
    db.query(
        "UPDATE users SET email = ?, password = ? WHERE id = (SELECT user_id FROM peoples WHERE id = ?)", 
        [email, password, id], 
        (err, userResult) => {
            if (err) {
                return res.status(500).send(err);
            }

            // next, update the job seeker details in the `peoples` table
            db.query(
                "UPDATE peoples SET first_name = ?, last_name = ?, tel = ?, city = ?, zip_code = ? WHERE id = ?",
                [first_name, last_name, tel, city, zip_code, id],
                (err, peopleResult) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    if (peopleResult.affectedRows === 0) {
                        return res.status(404).send("User not found");
                    }
                    res.status(200).json({ message: "User updated successfully" });
                }
            );
        }
    );
});

// Delete a specific job seeker and their corresponding user
router.delete("/:id", authenticateJWT, (req, res) => {
    const { id } = req.params;

    // Retrieve the user_id linked to the people
    db.query("SELECT user_id FROM peoples WHERE id = ?", [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send("User not found");
        }

        const userId = results[0].user_id;

        // Delete from the peoples table
        db.query("DELETE FROM peoples WHERE id = ?", [id], (err, peopleResult) => {
            if (err) {
                return res.status(500).send(err);
            }

            // Next, delete from the users table
            db.query("DELETE FROM users WHERE id = ?", [userId], (err, userResult) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.json({ message: "User and corresponding account deleted successfully" });
            });
        });
    });
});

module.exports = router;
