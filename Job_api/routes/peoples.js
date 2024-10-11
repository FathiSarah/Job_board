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
    db.query("SELECT * FROM peoples", (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM peoples WHERE id = ?", [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send("User not found");
        }
        res.json(results[0]);
    });
});

router.post("/", (req, res) => {
    const { first_name, last_name, email, tel, city, zip_code, password } = req.body;
    db.query("INSERT INTO peoples (first_name, last_name, email, tel, city, zip_code, password) VALUES (?, ?, ?, ?, ?, ?)",
        [first_name, last_name, email, tel, city, zip_code, password],
        (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json({ id: results.insertId, first_name, last_name, email, tel, city, zip_code, password });
        }
    );
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, tel, city, zip_code, password } = req.body;
    db.query(
        "UPDATE peoples SET first_name = ?, last_name = ?, email = ?, tel = ?, city = ?, zip_code = ?, password = ? WHERE id = ?",
        [first_name, last_name, email, tel, city, zip_code, password, id],
        (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (results.affectedRows === 0) {
                return res.status(404).send("User not found");
            }
            res.json({ message: "User updated successfully" });
        }
    );
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM peoples WHERE id = ?", [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send("User not found");
        }
        res.json({ message: "User deleted successfully" });
    });
});

module.exports = router;