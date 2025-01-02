import express from "express";

// Handlers
import signup from "../../services/auth/handlers/signup.mjs";
import login from "../../services/auth/handlers/login.mjs";
import logout from "../../services/auth/handlers/logout.mjs";
import verifyEmail from "../../services/auth/handlers/verifyEmail.mjs";
import forgotPassword from "../../services/auth/handlers/forgotPassword.mjs";
import resetPassword from "../../services/auth/handlers/resetPassword.mjs";
import verifyToken from "../../services/auth/middlewares/verifyToken.mjs";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router
  .route("/reset-password")
  .get(verifyToken, resetPassword.getResetPassword)
  .post(verifyToken, resetPassword.postResetPassword);

export default router;
