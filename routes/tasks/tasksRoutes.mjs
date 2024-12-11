import express from "express";

import createTasks from "../../services/tasks/createTasks.mjs";
import getTasks from "../../services/tasks/getTasks.mjs";
import updateTasks from "../../services/tasks/updateTasks.mjs";
import deleteTasks from "../../services/tasks/deleteTasks.mjs";

const router = express.Router();

// root endpoint: /api/v1/tasks

router.route('/:id').patch(updateTasks.updateOne).delete(deleteTasks.deleteOne);

router.route('/').post(createTasks.createOne).get(getTasks.getBulk);


export default router;