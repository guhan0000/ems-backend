import pool from "../config/db.js";

export async function findUserByEmail(email) {
  const [rows] = await pool.execute(
    "SELECT id, name, email, password, role from users WHERE email=?",
    [email],
  );
  return rows[0] ?? null;
}
export async function createUser({ name, email, password, role }) {
  const [result] = await pool.execute(
    "INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)",
    [name, email, password, role],
  );
  return result.insertId;
}
