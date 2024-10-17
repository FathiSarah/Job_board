const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const secretKey = 'your-secret-key';

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Login Route
router.post("/", (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided 
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        // Check if user with provided email exists
        if (results.length === 0) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        const user = results[0];

        // Verify the password (plain text for now)
        if (user.password === password) {
            // Generate JWT
            const token = jwt.sign(
                { userId: user.id, role: user.role }, // Payload
                secretKey,                             // Secret key
                { expiresIn: '15min' }                   // Options
            );

            // Respond with the token and user details
            return res.status(200).json({
                message: `Welcome ${user.email}`,
                token, // Include the JWT token
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                }
            });
        }
        
        else{
            return res.status(401).json({ message: "Invalid email or password" });
        }
    });
});

module.exports = router;