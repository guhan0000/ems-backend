import express from "express";
import pool from "../config/db.js";
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.status(200).json({ success: true, data: rows, length: rows.length });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch employees" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [row] = await pool.query(
      "SELECT * FROM employees WHERE employee_id=?",
      [id],
    );
    if (row.length === 0) {
      res
        .status(500)
        .json({ success: false, message: "failed to fetch employee" });
      return;
    }
    res.json({ success: true, data: row[0] });
  } catch (err) {
    console.log(err);
  }
});
router.post("/", async (req, res) => {
  try {
    const { employeeId, firstName, lastName, email } = req.body;
    if (!employeeId || !firstName || !lastName || !email) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });
    }
    const [rows] = await pool.execute(
      "INSERT INTO employees (employee_id, first_name, last_name, email) VALUES (?,?,?,?)",
      [employeeId, firstName, lastName, email],
    );
    console.log(rows.affectedRows);
    console.log(rows);
    res.status(201).json({
      success: true,
      message: "employee added",
      data: rows.insertId,
    });
  } catch (err) {
    console.log(err);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const employee = req.body;
    if (!employee.firstName || !employee.lastName || !employee.email) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
      return;
    }
    const [result] = await pool.execute(
      "UPDATE employees SET first_name=?,last_Name=?,email=? WHERE employee_id=?",
      [employee.firstName, employee.lastName, employee.email, id],
    );
    if (result.affectedRows !== 1) {
      res
        .status(500)
        .json({ success: false, message: "Cannot Update Employee" });
      return;
    }
    res.json({ success: true, message: "updated successfully" });
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const [result] = await pool.execute(
    "DELETE FROM employees WHERE employee_id=?",
    [id],
  );
  res.json({ success: true, message: "Employee deleted" });
});
router.get("/email/search", async (req, res) => {
  try {
    const empId = req.query.employeeId;
    const [results] = await pool.query(
      "SELECT email FROM employees WHERE employee_id=?",
      [empId],
    );
    if (results.length === 0) {
      res.status(400).json({ success: false, message: "Employee not found" });
    }
    res.json({ success: true, data: results });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error in deleting employee" });
  }
});
export default router;
