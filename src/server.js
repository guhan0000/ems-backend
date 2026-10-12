import express from "express";

import { employees } from "./employeeData.js";
// import { add, sub } from "./math.js"; ------ es  modules
// const { add, sub } = require("./math"); ----- common js modules

console.log("Hello Guhan from Node");
// console.log(add(2, 1));
// console.log(sub(1, 5));
const app = express();
const PORT = 9000;
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("ems api running");
});
app.get("/api/employees", (req, res) => {
  res.json({ message: "success", data: employees });
});
app.get("/api/employees/:id", (req, res) => {
  const id = Number(req.params.id);
  const employee = employees.find((employee) => employee.id === id);
  if (!employee) {
    return res.status(404).json({
      message: "Employee Not Found",
    });
  }
  res.json({
    message: "success",
    data: employee,
  });
});
app.post("/api/employees", (req, res) => {
  const { empId, firstName, lastName, email } = req.body;
  if (!empId || !email || !firstName || !lastName) {
    return res.status(404).json({ message: "all fields are required" });
  }
  const employee = {
    id: employees.length + 1,
    ...req.body,
  };
  employees.push(employee);
  res.status(201).json({ message: "employee added", employee });
});
app.delete("/api/employees/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = employees.find((emp) => emp.id === id);
  if (index.id === -1) {
    return res.status(400).json({
      message: "employee not found",
    });
  }
  employees.splice(index.id - 1, 1);
  res.json({ message: "emp deleted successfully", op: index.id });
});
app.put("/api/employees/:id", (req, res) => {
  const id = Number(req.params.id);
  const employee = employees.find((employee) => employee.id === id);
  if (!employee) {
    res.status(404).json({ message: "Emp Not Found" });
  }
  employee.firstName = req.body.firstName;
  employee.lastName = req.body.lastName;
  employee.email = req.body.email;
  res.json(employee);
});
