import express from "express";

const router = express.Router();

// handlers
import getMe from "../../services/me/getMe.mjs";
import updateMe from "../../services/me/updateMe.mjs";

// middlewares
import attachUserId from "../../middlewares/attachUserId.mjs";

// attach user id to request body or query
router.use(attachUserId);

router.route("/").get(getMe).patch(updateMe);

export default router;
