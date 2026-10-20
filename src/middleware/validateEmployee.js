export function validateEmployee(req, res, next) {
  console.log("validate middleware reached");
  console.log(req.body);

  const { employeeId, firstName, lastName, email } = req.body ?? {};
  const errors = [];

  if (typeof employeeId !== "string" || !employeeId.trim()) {
    errors.push("Employee Id is required");
  }
  if (typeof firstName !== "string" || !firstName.trim()) {
    errors.push("FirstName is required");
  }
  if (typeof lastName !== "string" || !lastName.trim()) {
    errors.push("LastName is required");
  }
  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    errors.push("A valid email is required");
  }
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  next();
}
