import express from "express";
import dotenv from "dotenv";
import pool from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/requestLogger.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(requestLogger);
app.listen(PORT, () => {
  console.log("api is running", PORT);
});
app.get("/", (req, res) => {
  res.json({ success: true, message: "Server is running on 9000" });
});
// emp routes
app.use("/api/employees", employeeRoutes);
// auth routes
app.use("/api/auth", authRoutes);
// unknown end points
app.use((req, res) => {
  res.status(404).json({ success: false, message: "End Point Not Found" });
});
// error handler
app.use(errorHandler);
