const express = require("express");

const router = express.Router();
const projectController = require("../controllers/project");
const isAuth = require("../middelware/isAuth");

router.post("/project", isAuth, projectController.createProject);
router.patch("/project/:projectId", projectController.updateProject);
router.get("/project/:projectId", isAuth, projectController.getProject);
router.get("/project", isAuth, projectController.getProjects);


module.exports = router;
