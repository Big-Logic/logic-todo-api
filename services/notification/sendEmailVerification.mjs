import jwt from "jsonwebtoken";
import sendEmails from "./sendEmails.mjs";

// Logger
import logger from "./../../logger/logger.config.mjs";

export default async (email) => {
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
      textContent: `Click the link to verify your email: ${verificationLink}`,
      htmlContent: `<p>Click the link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`,
    };

    try {
      // Send email
      await sendEmails(emailOptions);
      // generate log
      logger.log(
        "info",
        "new user with email (%s) verification email was sent successfully",
        email,
        { date: new Date(Date.now()) }
      );
    } catch (err) {
      const { body, statusCode } = err;
      logger.log(
        "error",
        "An error occured while sending verification email for newly created user with email (%s) !!",
        email,
        { error: { body, statusCode }, date: new Date(Date.now()) }
      );
    }
};
