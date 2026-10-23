import * as employeeService from "../services/employeeService.js";
import { AppError } from "../utils/AppError.js";

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
      // return res
      //   .status(400)
      //   .json({ success: false, message: "Invalid employee id" });
      throw new AppError("Invalid Emp id", 400);
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
    // if (!email || !employeeId || !firstName || !lastName) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "All fields are required" });
    // }
    const insertId = await employeeService.createEmployee({
      employeeId: employeeId.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
    });
    const employee = await employeeService.getEmployeeById(employeeId);
    res.status(201).json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
}
export async function updateEmployee(req, res, next) {
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
export async function deleteEmployee(req, res, next) {
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
export async function searchEmployee(req, res, next) {
  try {
    const search = req.query.search;
    if (typeof search !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Search keyword must be string" });
    }
    const keyword = search.trim();
    if (!keyword) {
      return res
        .status(400)
        .json({ success: false, message: "Search cannot be empty" });
    }
    const searchResult = await employeeService.searchEmployee(search);
    res
      .status(200)
      .json({ success: true, count: searchResult.length, data: searchResult });
    console.log(search);
  } catch (error) {
    next(error);
  }
}
export async function filterEmployeeByDept(req, res, next) {
  try {
    const dept = req.query.dept;
    if (typeof dept !== "string" || !dept.trim()) {
      res.status(400).json({
        success: false,
        message: "dept must be a non empty string",
      });
    }
    const employees = await employeeService.filterEmployeeByDept(dept.trim());
    if (employees.length === 0) {
      console.log(employees);

      return res.status(400).json({
        success: false,
        message: "Invalid dept",
      });
    }
    console.log(employees);

    res.json({ success: true, count: employees.length, data: employees });
  } catch (error) {
    next(error);
  }
}
export async function filterByCity(req, res, next) {
  try {
    const city = req.query.city;
    if (typeof city !== "string" || !city.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "City must be a non empty string" });
    }
    const employees = await employeeService.getAllEmployees();

    const filteredEmployees = employees.filter(
      (emp) => emp.city === city.trim(),
    );
    if (filteredEmployees.length === 0) {
      return res.status(400).json({ success: false, message: "No data found" });
    }
    res.json({
      success: true,
      count: filteredEmployees.length,
      data: filteredEmployees,
    });
  } catch (err) {
    next(err);
  }
}
export async function filterEmployee(req, res, next) {
  try {
    const { dept, city } = req.query;
    if (dept === "" || city === "") {
      return res
        .status(400)
        .json({ success: false, message: "Dept or City cannot be empty" });
    }
    if (
      (dept !== undefined && typeof dept !== "string") ||
      (city !== undefined && typeof city !== "string")
    ) {
      return res.status(400).json({
        success: false,
        message: "dept and city must be  strings",
      });
    }
    if (dept === undefined && city === undefined) {
      return res.status(400).json({
        success: false,
        message: "provide atleast one filter city or dept",
      });
    }
    const employees = await employeeService.filterEmployees({ dept, city });
    return res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    next(error);
  }
}
