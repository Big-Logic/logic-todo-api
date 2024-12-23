import express from "express";

// Handlers
import signup from "../../services/auth/signup.mjs";
import login from "../../services/auth/login.mjs";
import verifyEmail from "../../services/notification/verifyEmail.mjs";

const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.get('/verify-email', verifyEmail);

export default router;
