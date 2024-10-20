const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Get all companies
router.get("/", (req, res) => {
    db.query(`
        SELECT companies.*, users.email 
        FROM companies 
        JOIN users ON companies.user_id = users.id`, 
        (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
});

// Get a specific company by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query(`
        SELECT companies.*, users.email 
        FROM companies 
        JOIN users ON companies.user_id = users.id 
        WHERE companies.user_id = ?`,
        [id], 
        (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (results.length === 0) {
                return res.status(404).send("Company not found");
            }
            res.json(results[0]);
        }
    );
});

// Create a new company with corresponding user entry
router.post("/", (req, res) => {
    const { name, description, website, city, zip_code, email, password } = req.body;

    if (!name || !description || !website || !city || !zip_code || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Create a user and then insert the company linked to the created user
    db.query("INSERT INTO users (email, password, role) VALUES (?, ?, 'company')", 
        [email, password], 
        (err, userResult) => {
            if (err) {
                return res.status(500).send(err);
            }

            const userId = userResult.insertId;

            db.query("INSERT INTO companies (user_id, name, description, website, city, zip_code) VALUES (?, ?, ?, ?, ?, ?)",
                [userId, name, description, website, city, zip_code],
                (err, companyResult) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.status(200).json({
                        id: userId, 
                        name, 
                        description, 
                        website, 
                        city, 
                        zip_code, 
                        email 
                    });
                }
            );
        }
    );
});

// Update a company and its user
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, description, website, city, zip_code, email, password } = req.body;

    // Update in the users table
    db.query(
        "UPDATE users SET email = ?, password = ? WHERE id = (SELECT user_id FROM companies WHERE user_id = ?)", 
        [email, password, id], 
        (err, userResult) => {
            if (err) {
                return res.status(500).send(err);
            }

            // next, update details in the companies table
            db.query(
                "UPDATE companies SET name = ?, description = ?, website = ?, city = ?, zip_code = ? WHERE user_id = ?",
                [name, description, website, city, zip_code, id],
                (err, companyResult) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    if (companyResult.affectedRows === 0) {
                        return res.status(404).send("Company not found");
                    }
                    res.json({ message: "Company updated successfully" });
                }
            );
        }
    );
});

// Delete a company and its corresponding user
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    // First, retrieve the user_id linked to the company
    db.query("SELECT user_id FROM companies WHERE user_id = ?", [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send("Company not found");
        }

        const userId = results[0].user_id;

        // Delete from the companies table
        db.query("DELETE FROM companies WHERE user_id = ?", [id], (err, companyResult) => {
            if (err) {
                return res.status(500).send(err);
            }

            // Next delete from the users table
            db.query("DELETE FROM users WHERE id = ?", [userId], (err, userResult) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.json({ message: "Company and corresponding user account deleted successfully" });
            });
        });
    });
});

module.exports = router;
