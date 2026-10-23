import jwt from "jsonwebtoken";
export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "Access token is required" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access token is required" });
  }
  if (!process.env.JWT_SECRET) {
    return res
      .status(500)
      .json({ success: false, message: "Authentication Error" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
    req.user = { id: decoded.sub, role: decoded.role };
    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        success: false,
        message:
          error.name === "TokenExpiredError"
            ? "Access token has expired"
            : "Invalid access token",
      });
  }
}
