import express from "express";

// Handlers
import signup from "../../services/auth/signup.mjs";
import login from "../../services/auth/login.mjs";

const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
export default router;
