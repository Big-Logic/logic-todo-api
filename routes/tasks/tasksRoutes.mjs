import express from "express";

import createTasks from "../../services/tasks/handlers/createTasks.mjs";
import getTasks from "../../services/tasks/handlers/getTasks.mjs";
import updateTasks from "../../services/tasks/handlers/updateTasks.mjs";
import deleteTasks from "../../services/tasks/handlers/deleteTasks.mjs";

// MIDDLEWARES
import validateUUID from "../../middlewares/validateUUID.mjs";
import attachUserId from "../../middlewares/attachUserId.mjs";
import verifyLogin from "../../services/auth/middlewares/verifyLogin.mjs";

const router = express.Router();

// root endpoint: /api/v1/tasks

// Verify login
router.use(verifyLogin)

// attach user id to request body or query
router.use(attachUserId);

// validate task id
router.param('id', validateUUID);

router.route('/:id').patch(updateTasks.updateOne).delete(deleteTasks.deleteOne);

router.route('/').post(createTasks.createOne).get(getTasks.getBulk);


export default router;