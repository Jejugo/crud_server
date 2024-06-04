import express from "express";
import { employeesData } from "./data.js";

const app = express();

// Getting data
app.get("/employees", (req, res) => {
  res.json(employeesData);
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
