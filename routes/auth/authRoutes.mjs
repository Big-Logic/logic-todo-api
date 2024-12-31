import express from "express";

// Handlers
import signup from "../../services/auth/signup.mjs";
import login from "../../services/auth/login.mjs";
import verifyEmail from "../../services/auth/verifyEmail.mjs";
import forgotPassword from "../../services/auth/forgotPassword.mjs";
import resetPassword from "../../services/auth/resetPassword.mjs";
import verifyToken from "../../services/auth/middlewares/verifyToken.mjs";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router
  .route("/reset-password")
  .get(verifyToken, resetPassword.getResetPassword)
  .post(verifyToken, resetPassword.postResetPassword);

export default router;
