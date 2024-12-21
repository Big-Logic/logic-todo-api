import jwt from "jsonwebtoken";
import sendEmails from "./sendEmails.mjs";

export default async (email) => {
  try {
    // Generate a JWT token with the email as payload
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Verification link
    const verificationLink = `${process.env.BASE_URL}/auth/verify-email?token=${token}`;

    const emailOptions = {
      recipient: {
        email,
      },
      subject: "Email verification",
      htmlContent: `<p>Click the link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`,
    };

    // Send email
    sendEmails(emailOptions);
  } catch (error) {
    console.log(error);
  }
};
