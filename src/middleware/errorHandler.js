export function errorHandler(err, req, res, next) {
  console.log(err);
  // duplicate entry handler
  if (res.headersSent) {
    return next(err);
  }
  if (err.code === "ER_DUP_ENTRY") {
    res
      .status(409)
      .json({ success: false, message: "Email or Employee Id already exists" });
  }
  res.status(500).json({
    success: false,
    message: "Internal Server Error Occured",
  });
}
