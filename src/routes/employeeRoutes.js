import express from "express";
import pool from "../config/db.js";
import {
  createEmployee,
  deleteEmployee,
  filterByCity,
  filterEmployee,
  filterEmployeeByDept,
  getAllEmployees,
  getEmployeeById,
  searchEmployee,
  updateEmployee,
} from "../controllers/employeeController.js";
import { validateEmployee } from "../middleware/validateEmployee.js";
const router = express.Router();
router.get("/", (req, res) => {
  if (req.query.search !== undefined) {
    return searchEmployee(req, res);
  }
  return getAllEmployees(req, res);
});
router.get("/", getAllEmployees);
router.get("/filter", filterEmployee);
router.get("/:id", getEmployeeById);
router.post("/", validateEmployee, createEmployee);
router.put("/:id", validateEmployee, updateEmployee);
router.delete("/:id", deleteEmployee);
export default router;
