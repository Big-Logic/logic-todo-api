import jwt from "jsonwebtoken";
import sendEmails from "./sendEmails.mjs";

export default async (email) => {
  // Generate a JWT token with the email as payload
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Verification link
  const passwordResetLink = `${process.env.BASE_URL}/auth/reset-password?token=${token}`;

  const emailOptions = {
    recipient: {
      email,
    },
    subject: "Password Reset",
    textContent: `Click the link to reset your password: ${passwordResetLink}`,
    htmlContent: `<p>Click the link to reset your password: <a href="${passwordResetLink}">${passwordResetLink}</a></p>`,
  };
  // send reset link
  await sendEmails(emailOptions);
};
