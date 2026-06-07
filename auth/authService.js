const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailerService = require("../mailerService");

const prisma = new PrismaClient();
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";
const ACCESS_EXPIRE = process.env.JWT_ACCESS_EXPIRE || "15m";
const REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE || "7d";

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRE });
  const refreshToken = jwt.sign({ id: userId }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRE });
  return { accessToken, refreshToken };
};

const registerUser = async (data) => {
  const { fullName, email, password } = data;
  
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
    },
    select: { id: true, fullName: true, email: true, role: true }
  });

  return user;
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const tokens = generateTokens(user.id);
  
  return { 
    user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role }, 
    ...tokens 
  };
};

const refreshToken = async (token) => {
  if (!token) throw new Error("Refresh token required");
  try {
    const decoded = jwt.verify(token, REFRESH_SECRET);
    return generateTokens(decoded.id);
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, fullName: true, email: true, role: true }
  });
  if (!user) throw new Error("User not found");
  return user;
};

const forgotPassword = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });
  
  // If user doesn't exist, we still return true to prevent email enumeration attacks
  if (!user) return true;

  // Generate a short-lived token (15 mins) specifically for resetting the password
  const resetToken = jwt.sign({ id: user.id, purpose: "reset" }, ACCESS_SECRET, { expiresIn: "15m" });
  
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`;

  await mailerService.sendPasswordResetEmail(user.email, resetLink);
  return true;
};

const resetPassword = async (token, newPassword) => {
  if (!token) throw new Error("Reset token is required");

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    if (decoded.purpose !== "reset") throw new Error("Invalid token purpose");

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashedPassword }
    });
  } catch (error) {
    throw new Error("Invalid or expired reset token");
  }
};

module.exports = { 
  registerUser, loginUser, refreshToken, getUserById, forgotPassword, resetPassword 
};
