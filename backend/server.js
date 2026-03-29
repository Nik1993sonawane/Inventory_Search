// ================= BACKEND (Node.js + Express + MySQL) =================
// File: server.js

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "zeerostock"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// ------------------- SEARCH API -------------------
app.get("/search", (req, res) => {
  const { q, category, minPrice, maxPrice } = req.query;

  let sql = "SELECT * FROM inventory WHERE 1=1";
  let params = [];

  if (q) {
    sql += " AND LOWER(product_name) LIKE ?";
    params.push(`%${q.toLowerCase()}%`);
  }

  if (category) {
    sql += " AND category = ?";
    params.push(category);
  }

  if (minPrice) {
    sql += " AND price >= ?";
    params.push(minPrice);
  }

  if (maxPrice) {
    sql += " AND price <= ?";
    params.push(maxPrice);
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// ------------------- SUPPLIER API -------------------
app.post("/supplier", (req, res) => {
  const { name, city } = req.body;
  db.query("INSERT INTO suppliers (name, city) VALUES (?, ?)",
    [name, city],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId });
    }
  );
});

// ------------------- INVENTORY API -------------------
app.post("/inventory", (req, res) => {
  const { supplier_id, product_name, category, quantity, price } = req.body;

  if (quantity < 0 || price <= 0)
    return res.status(400).json({ error: "Invalid quantity or price" });

  db.query("SELECT * FROM suppliers WHERE id=?", [supplier_id], (err, sup) => {
    if (sup.length === 0) return res.status(400).json({ error: "Invalid supplier" });

    db.query(
      "INSERT INTO inventory (supplier_id, product_name, category, quantity, price) VALUES (?, ?, ?, ?, ?)",
      [supplier_id, product_name, category, quantity, price],
      (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId });
      }
    );
  });
});

// ------------------- GROUPED QUERY -------------------
app.get("/inventory", (req, res) => {
  const sql = `
    SELECT s.name AS supplier, 
           SUM(i.quantity * i.price) AS total_value
    FROM suppliers s
    JOIN inventory i ON s.id = i.supplier_id
    GROUP BY s.id
    ORDER BY total_value DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));