const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendPasswordResetEmail = async (to, resetLink) => {
  const mailOptions = {
    from: `"MDDS Address API" <${process.env.SMTP_USER}>`,
    to,
    subject: "Password Reset Request",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; color: #333;">
        <h2>Password Reset</h2>
        <p>You requested to reset your password. Click the button below to set a new password:</p>
        <a href="${resetLink}" style="display: inline-block; padding: 10px 15px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 5px; margin: 15px 0;">Reset Password</a>
        <p>If you did not request this, please ignore this email. Your password will remain unchanged.</p>
        <p style="font-size: 12px; color: #888;">This link is valid for 15 minutes.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendPasswordResetEmail,
};