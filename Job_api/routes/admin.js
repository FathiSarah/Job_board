const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// GET all records from all tables

router.get("/users", (req, res) => {
    db.query("SELECT * FROM peoples", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.get("/companies", (req, res) => {
    db.query("SELECT * FROM companies", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.get("/advertisements", (req, res) => {
    const query = `
        SELECT advertisements.*, companies.name AS company_name 
        FROM advertisements 
        JOIN companies ON advertisements.company_id = companies.id`;
        
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.get("/applications", (req, res) => {
    const query = `
        SELECT applications.*, peoples.first_name, peoples.last_name 
        FROM applications 
        JOIN peoples ON applications.user_id = peoples.id`;
        
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// USERS CUD

router.post("/users", (req, res) => {
    const { first_name, last_name, email, tel, city, zip_code, password } = req.body;
    db.query("INSERT INTO peoples (first_name, last_name, email, tel, city, zip_code, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [first_name, last_name, email, tel, city, zip_code, password],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json({ id: results.insertId, first_name, last_name, email, tel, city, zip_code });
        }
    );
});

router.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, tel, city, zip_code, password } = req.body;
    db.query("UPDATE peoples SET first_name = ?, last_name = ?, email = ?, tel = ?, city = ?, zip_code = ?, password = ? WHERE id = ?",
        [first_name, last_name, email, tel, city, zip_code, password, id],
        (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.affectedRows === 0) return res.status(404).send("User not found");
            res.json({ message: "User updated successfully" });
        }
    );
});

router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM peoples WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).send("User not found");
        res.json({ message: "User deleted successfully" });
    });
});

//COMPANIES CUD

router.post("/companies", (req, res) => {
    const { name, description, website, city, zip_code } = req.body;
    db.query("INSERT INTO companies (name, description, website, city, zip_code) VALUES (?, ?, ?, ?, ?)",
        [name, description, website, city, zip_code],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json({ id: results.insertId, name, description, website, city, zip_code });
        }
    );
});

router.put("/companies/:id", (req, res) => {
    const { id } = req.params;
    const { name, description, website, city, zip_code } = req.body;
    db.query("UPDATE companies SET name = ?, description = ?, website = ?, city = ?, zip_code = ? WHERE id = ?",
        [name, description, website, city, zip_code, id],
        (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.affectedRows === 0) return res.status(404).send("Company not found");
            res.json({ message: "Company updated successfully" });
        }
    );
});

router.delete("/companies/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM companies WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).send("Company not found");
        res.json({ message: "Company deleted successfully" });
    });
});

//ADVERTISEMENTS CUD

router.post("/advertisements", (req, res) => {
    const { title, description, company_id, city, zip_code, salary_range } = req.body;
    db.query("INSERT INTO advertisements (title, description, company_id, city, zip_code, salary_range) VALUES (?, ?, ?, ?, ?, ?)",
        [title, description, company_id, city, zip_code, salary_range],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json({ id: results.insertId, title, description, company_id, city, zip_code, salary_range });
        }
    );
});

router.put("/advertisements/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, company_id, city, zip_code, salary_range } = req.body;
    db.query("UPDATE advertisements SET title = ?, description = ?, company_id = ?, city = ?, zip_code = ?, salary_range = ? WHERE id = ?",
        [title, description, company_id, city, zip_code, salary_range, id],
        (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.affectedRows === 0) return res.status(404).send("Advertisement not found");
            res.json({ message: "Advertisement updated successfully" });
        }
    );
});

router.delete("/advertisements/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM advertisements WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).send("Advertisement not found");
        res.json({ message: "Advertisement deleted successfully" });
    });
});

//APPLICATION CUD

router.post("/applications", (req, res) => {
    const { user_id, advertisement_id, message, email, complet_name } = req.body;
    db.query("INSERT INTO applications (user_id, advertisement_id, message, email, complet_name) VALUES (?, ?, ?, ?, ?)",
        [user_id, advertisement_id, message, email, complet_name],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json({ id: results.insertId, user_id, advertisement_id, message, email, complet_name });
        }
    );
});

router.put("/applications/:id", (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    db.query("UPDATE applications SET message = ? WHERE id = ?",
        [message, id],
        (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.affectedRows === 0) return res.status(404).send("Application not found");
            res.json({ message: "Application updated successfully" });
        }
    );
});

router.delete("/applications/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM applications WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).send("Application not found");
        res.json({ message: "Application deleted successfully" });
    });
});

module.exports = router;