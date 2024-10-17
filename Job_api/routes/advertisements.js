const express = require("express"); 
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Get all advertisements with their associated company details (GET /advertisements)
router.get("/", (req, res) => {
    const query = `
        SELECT advertisements.*, companies.name AS company_name, companies.website AS company_website 
        FROM advertisements 
        JOIN companies ON advertisements.company_id = companies.user_id`;
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Get a specific advertisement by ID (GET /advertisements/:id)
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT advertisements.*, companies.name AS company_name, companies.website AS company_website 
        FROM advertisements 
        JOIN companies ON advertisements.company_id = companies.user_id 
        WHERE advertisements.id = ?`;
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send("Advertisement not found");
        }
        res.json(results[0]);
    });
});

// Create a new advertisement
router.post("/", (req, res) => {
    const { title, description, company_id, city, zip_code, salary_range } = req.body;

    if (!title || !description || !company_id || !city || !zip_code || !salary_range) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const query = `
        INSERT INTO advertisements (title, description, company_id, city, zip_code, salary_range) 
        VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(query, [title, description, company_id, city, zip_code, salary_range], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({
            id: results.insertId,
            title,
            description,
            company_id,
            city,
            zip_code,
            salary_range
        });
    });
});

// Update an existing advertisement
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, company_id, city, zip_code, salary_range } = req.body;

    const query = `
        UPDATE advertisements 
        SET title = ?, description = ?, company_id = ?, city = ?, zip_code = ?, salary_range = ? 
        WHERE id = ?`;

    db.query(query, [title, description, company_id, city, zip_code, salary_range, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send("Advertisement not found");
        }
        res.json({ message: "Advertisement updated successfully" });
    });
});

// Delete an advertisement
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM advertisements WHERE id = ?", [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send("Advertisement not found");
        }
        res.json({ message: "Advertisement deleted successfully" });
    });
});

module.exports = router;