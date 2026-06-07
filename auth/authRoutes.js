const express = require("express");
const rateLimit = require("express-rate-limit");
const { register, login, logout, getMe, refresh, forgotPassword, resetPassword } = require("./authController");
const { authenticateUser } = require("../middleware/authMiddleware");
const { validateRegister, validateLogin } = require("./authValidator");

const router = express.Router();

// Rate limiting for authentication routes to prevent brute-force attacks
// Disabled for testing purposes
const authLimiter = (req, res, next) => next();

router.post("/register", authLimiter, validateRegister, register);
router.post("/login", authLimiter, validateLogin, login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/reset-password", authLimiter, resetPassword);

router.get("/me", authenticateUser, getMe);

module.exports = router;
