import express from "express";
import pool from "../config/db.js";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
} from "../controllers/employeeController.js";
import { validateEmployee } from "../middleware/validateEmployee.js";
const router = express.Router();
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.post("/", validateEmployee, createEmployee);
router.put("/:id", validateEmployee, updateEmployee);
router.delete("/:id", deleteEmployee);
export default router;
