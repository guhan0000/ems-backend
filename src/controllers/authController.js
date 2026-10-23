import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as authService from "../services/authService.js";
export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      !email.trim() ||
      !name.trim() ||
      password.length < 8
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Password of atleast 8 characters required",
      });
    }
    const normalizedEmail = email.toLowerCase();
    const existingUser = await authService.findUserByEmail(normalizedEmail);
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await authService.createUser({
      name: name.trim(),
      email: normalizedEmail.trim(),
      role: "employee",
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ success: true, data: { id: user, name: name, email: email } });
  } catch (error) {
    next(error);
  }
}
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (typeof email !== "string" || !email.trim() || !password.trim()) {
      return res
        .status(400)
        .json({ success: false, messgage: "Email and password are required" });
    }
    const user = await authService.findUserByEmail(email.toLocaleLowerCase().trim());
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign({ role: user.role }, process.env.JWT_SECRET, {
      subject: String(user.id),
      expiresIn: process.env.JWT_EXPIRESIN || "1h",
    });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token:token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}
