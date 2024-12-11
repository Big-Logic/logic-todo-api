import express from "express";

import createTasks from "../../services/tasks/createTasks.mjs";
import getTasks from "../../services/tasks/getTasks.mjs";
import updateTasks from "../../services/tasks/updateTasks.mjs";
import deleteTasks from "../../services/tasks/deleteTasks.mjs";

// MIDDLEWARES
import validateUUID from "../../middlewares/validateUUID.mjs";

const router = express.Router();

// root endpoint: /api/v1/tasks

// validate task id
router.param('id', validateUUID);

router.route('/:id').patch(updateTasks.updateOne).delete(deleteTasks.deleteOne);

router.route('/').post(createTasks.createOne).get(getTasks.getBulk);


export default router;