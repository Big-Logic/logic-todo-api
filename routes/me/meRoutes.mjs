import express from "express";

const router = express.Router();

// handlers
import getMe from "../../services/me/getMe.mjs";
import updateMe from "../../services/me/updateMe.mjs";

// middlewares
import verifyLogin from "../../services/auth/middlewares/verifyLogin.mjs";
import attachUserId from "../../middlewares/attachUserId.mjs";

// Verify login
router.use(verifyLogin);

// attach user id to request body or query
router.use(attachUserId);

router.route("/").get(getMe).patch(updateMe);

export default router;
