import express from "express";
import { employeesData } from "./data.js";
import mysql from "mysql2";
import bodyParser from "body-parser";

const app = express();

const jsonParser = bodyParser.json();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "crud_database",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL connected");
  }
});

// Getting data
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(200).json(result);
    }
  })
});

//Get a Single Employee
app.get("/employees/:id", (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM employees WHERE id = ${id}`, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(200).json(result);
    }
  })
});

//Inserting data
app.post("/employees", jsonParser, (req, res) => {
  const { firstName, lastName, email, salary, date } = req.body;
  db.query(
    "INSERT INTO employees (firstName, lastName, email, salary, date) VALUES (?,?,?,?,?)",
    [firstName, lastName, email, salary, date],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.status(201).json({ message: "Employee added successfully" });
      }
    }
  );
});

//Updating data
app.put("/employees/:id", jsonParser, (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, email, salary, date } = req.body;
  db.query(
    "UPDATE employees SET firstName = ?, lastName = ?, email = ?, salary = ?, date = ? WHERE id = ?",
    [firstName, lastName, email, salary, date, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.status(200).json({ message: "Employee updated successfully" });
      }
    }
  );
});

//Deleting data
app.delete("/employees/:id", jsonParser, (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(200).json({ message: "Employee deleted successfully" });
    }
  })
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
