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
    db.query("SELECT * FROM advertisements", (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM advertisements WHERE id = ?", [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send("Advertisement not found");
        }
        res.json(results[0]);
    });
});

router.post("/", (req, res) => {
    const { title, description, company_id, city, zip_code, salary_range } = req.body;
    db.query("INSERT INTO advertisements (title, description, company_id, city, zip_code, salary_range) VALUES (?, ?, ?, ?, ?, ?)",
        [title, description, company_id, city, zip_code, salary_range],
        (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json({ id: results.insertId, title, description, company_id, city, zip_code, salary_range });
        }
    );
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, company_id, city, zip_code, salary_range } = req.body;
    db.query(
        "UPDATE advertisements SET title = ?, description = ?, company_id = ?, city = ?, zip_code = ?, salary_range = ? WHERE id = ?",
        [title, description, company_id, city, zip_code, salary_range, id],
        (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (results.affectedRows === 0) {
                return res.status(404).send("Advertisement not found");
            }
            res.json({ message: "Advertisement updated successfully" });
        }
    );
});

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