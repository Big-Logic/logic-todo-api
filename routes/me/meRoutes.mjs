import express from "express";

const router = express.Router();

// handlers
import getMe from "../../services/me/handlers/getMe.mjs";
import updateMe from "../../services/me/handlers/updateMe.mjs";

// middlewares
import verifyLogin from "../../services/auth/middlewares/verifyLogin.mjs";
import attachUserId from "../../middlewares/attachUserId.mjs";
import uploadProfilePicture from "../../services/me/handlers/uploadProfilePicture.mjs";

// Verify login
router.use(verifyLogin);

// attach user id to request body or query
router.use(attachUserId);

router.post('/upload', uploadProfilePicture);

router.route("/").get(getMe).patch(updateMe);

export default router;
