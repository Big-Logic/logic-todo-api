import express from "express";

import createTasks from "../../services/tasks/createTasks.mjs";
import getTasks from "../../services/tasks/getTasks.mjs";
import updateTasks from "../../services/tasks/updateTasks.mjs";

const router = express.Router();

// root endpoint: /api/v1/tasks

router.route('/:id').patch(updateTasks.updateOne);

router.route('/').post(createTasks.createOne).get(getTasks.getBulk);


export default router;