const express = require("express");

const router = express.Router();

const taskController = require("../controllers/task");
const isAuth = require("../middelware/isAuth");

router.post("/project/:projectId/task", isAuth, taskController.createTask);
router.get("/project/:projectId/task", isAuth, taskController.getTasks);
router.get("/task/:taskId", isAuth, taskController.getTask);
router.patch("/task/:taskId", isAuth, taskController.updateTask);
router.delete("/task/:taskId", isAuth, taskController.deleteTask);

module.exports = router;
