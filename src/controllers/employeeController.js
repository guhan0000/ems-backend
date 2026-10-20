import * as employeeService from "../services/employeeService.js";

export async function getAllEmployees(req, res, next) {
  try {
    const employees = await employeeService.getAllEmployees();
    res.json({ success: true, count: employees.length, data: employees });
  } catch (error) {
    next(error);
  }
}
export async function getEmployeeById(req, res, next) {
  try {
    const id = req.params.id;
    if (!id.startsWith("EMP")) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid employee id" });
    }
    const employee = await employeeService.getEmployeeById(id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
}
export async function createEmployee(req, res, next) {
  try {
    const firstName = req.body.firstName.trim();
    const lastName = req.body.lastName.trim();
    const email = req.body.email.trim();
    const employeeId = req.body.employeeId.trim();
    if (!email || !employeeId || !firstName || !lastName) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const insertId = await employeeService.createEmployee({
      employeeId: employeeId.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
    });
    const employee = await employeeService.getEmployeeById(employeeId);
    res.json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
}
export async function updateEmployee(req, res) {
  try {
    const employeeId = req.params.id;
    const employee = req.body;
    if (!employee.firstName || !employee.lastName || !employee.email) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });
    }
    const updatedEmployee = await employeeService.updateEmployee(
      employeeId,
      employee,
    );
    if (!updatedEmployee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.json({ success: true, data: updatedEmployee });
  } catch (error) {
    next(error);
  }
}
export async function deleteEmployee(req, res) {
  try {
    const id = req.params.id;
    const employee = await employeeService.getEmployeeById(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
    const isDeleted = await employeeService.deleteEmployee(id);
    if (!isDeleted) {
      return res
        .status(400)
        .json({ success: false, message: "Error in deleting employee" });
    }
    res.json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    next(error);
  }
}
