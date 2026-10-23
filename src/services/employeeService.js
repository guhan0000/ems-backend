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
export async function searchEmployee(keyword) {
  const search = `%${keyword}%`;
  const [rows] = await pool.execute(
    `SELECT * FROM employees WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?`,
    [search, search, search],
  );
  return rows;
}
export async function filterEmployeeByDept(dept) {
  const [rows] = await pool.execute(
    "SELECT employee_id, first_name, last_name, email, dept FROM employees WHERE dept=?",
    [dept],
  );
  return rows;
}
export async function filterEmployees({ dept, city }) {
  const conditions = [];
  const values = [];
  let sql = "SELECT * FROM employees";
  if (dept) {
    conditions.push("dept = ?");
    values.push(dept);
  }
  if (city) {
    conditions.push("city = ?");
    values.push(city);
  }
  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }
  sql += " ORDER BY employee_id";
  const [rows] = await pool.execute(sql, values);
  console.log(sql);

  return rows;
}
