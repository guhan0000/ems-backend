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
import { authenticateToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
const router = express.Router();
router.use(authenticateToken);
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
router.delete("/:id", authorizeRoles("admin"), deleteEmployee);
export default router;
