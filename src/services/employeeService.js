import pool from "../config/db.js";

export async function getAllEmployees() {
  const [rows] = await pool.execute("SELECT * FROM employees");
  return rows;
}
export async function getEmployeeById(id) {
  const [rows] = await pool.execute(
    "SELECT * FROM employees WHERE employee_id=?",
    [id],
  );
  // console.log(rows);
  return rows[0] ?? null;
}
export async function createEmployee(employee) {
  const { employeeId, firstName, lastName, email } = employee;
  const [results] = await pool.execute(
    "INSERT INTO employees (employee_id,first_name,last_name,email) VALUES (?,?,?,?)",
    [employeeId, firstName, lastName, email],
  );
  return results.insertId;
}
export async function updateEmployee(employeeId, employee) {
  const { firstName, lastName, email } = employee;
  const [results] = await pool.execute(
    "UPDATE employees SET first_name=?,last_name=?,email=? WHERE employee_id=?",
    [firstName, lastName, email, employeeId],
  );
  if (results.affectedRows === 0) {
    return null;
  }
  return getEmployeeById(employeeId);
}
export async function deleteEmployee(id) {
  const [results] = await pool.execute(
    "DELETE FROM employees WHERE employee_id=?",
    [id],
  );
  return results.affectedRows > 0;
}
