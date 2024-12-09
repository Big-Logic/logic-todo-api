import express from "express";

import createTasks from "../../services/tasks/createTasks.mjs";

const router = express.Router();

// root endpoint: /api/v1/tasks

router.route('/').post(createTasks.createOne);


export default router;