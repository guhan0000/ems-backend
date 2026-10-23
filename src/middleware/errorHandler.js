export function errorHandler(err, req, res, next) {
  console.log(err);
  // duplicate entry handler
  if (res.headersSent) {
    return next(err);
  }
  if (err.type === "entity.parse.failed" && err.status === 400) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid JSON request body" });
  }
  if (err.code === "ER_DUP_ENTRY") {
    res
      .status(409)
      .json({ success: false, message: "Email or Employee Id already exists" });
  }
  return res.status(err.status || 500).json({
    success: false,
    message:
      err.status && err.status < 500 ? err.message : "Internal Server Error",
  });
}
