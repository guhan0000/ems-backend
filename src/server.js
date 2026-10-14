import express from "express";
import dotenv from "dotenv";
import pool from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.listen(PORT, () => {
  console.log("api is running", PORT);
});
app.get("/", (req, res) => {
  res.json({ success: true, message: "Server is running on 9000" });
});
app.use("/api/employees", employeeRoutes);
