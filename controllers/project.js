const User = require("../modals/user");
const Project = require("../modals/project");

exports.createProject = async (req, res, next) => {
    console.log("somone accessed post route");
    const projectName = req.body.name;
    const projectDesc = req.body.desc;
    const sections = req.body.sections;
    //Create project in DB
    const newProject = new Project({
        name: projectName,
        desc: projectDesc,
        sections: sections,
        creator: req.userId
    });
    try {
        const project = await newProject.save();
        console.log(project);
        res.status(201).json({
            message: "Project Created Successfully,",
            project: newProject
        });
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next();
    }
};

exports.getProjects = async (req, res, next) => {
    // const projectId = req.params.projectId;
    const userId = req.userId;
    try {
        const projects = await Project.find({ creator: userId });
        res.status(200).json({
            message: "Fetched project successfully",
            projects: projects
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next();
    }
};

exports.getProject = async (req, res, next) => {
    const projectId = req.params.projectId;
    try {
        const project = await Project.findById(projectId);
        res.status(200).json({
            message: "Project fetched successfully",
            project: project
        });
    } catch (err) {
        if (err.statusCode) {
            err.statusCode = 500;
        }
        console.log(err);
        next();
    }
};

exports.updateProject = async (req, res, next) => {
    console.log("someoneAccess update project route");
    res.json({
        message: `You successfully update the project with Projec Id ${
            req.params.projectId
        }`
    });
};

exports.deleteProject = async (req, res, next) => {
    const projectId = req.params.projectId;
};
