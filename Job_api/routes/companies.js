const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

router.get("/", (req, res) => {
    db.query("SELECT * FROM companies", (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM companies WHERE id = ?", [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send("Compagnie not found");
        }
        res.json(results[0]);
    });
});

router.post("/", (req, res) => {
    const { name, description, website, city, zip_code } = req.body;
    db.query("INSERT INTO companies (name, description, website, city, zip_code) VALUES (?, ?, ?, ?, ?)",
        [name, description, website, city, zip_code],
        (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json({ id: results.insertId, name, description, website, city, zip_code });
        }
    );
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, description, website, city, zip_code } = req.body;
    db.query(
        "UPDATE companies SET name = ?, description = ?, website = ?, city = ?, zip_code = ? WHERE id = ?",
        [name, description, website, city, zip_code, id],
        (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (results.affectedRows === 0) {
                return res.status(404).send("Compagnie not found");
            }
            res.json({ message: "Compagnie updated successfully" });
        }
    );
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM companies WHERE id = ?", [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send("Compagnie not found");
        }
        res.json({ message: "Compagnie deleted successfully" });
    });
});

module.exports = router;