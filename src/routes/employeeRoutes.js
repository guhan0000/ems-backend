import express from "express";
import pool from "../config/db.js";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
} from "../controllers/employeeController.js";
const router = express.Router();
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
export default router;
