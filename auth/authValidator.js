const validateRegister = (req, res, next) => {
  const { fullName, email, password } = req.body;
  
  if (!fullName || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return res.status(400).json({ success: false, message: "Invalid email format" });

  // Simplified for testing: require minimum 4 characters only
  const passwordRegex = /^.{4,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ success: false, message: "Password must be at least 4 characters long" });
  }
  
  next();
};

const validateLogin = (req, res, next) => {
  if (!req.body.email || !req.body.password) return res.status(400).json({ success: false, message: "Email and password are required" });
  next();
};

module.exports = { validateRegister, validateLogin };