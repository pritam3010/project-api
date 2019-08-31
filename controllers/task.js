const User = require("../modals/user");
const Project = require("../modals/project");
const Task = require("../modals/task");

exports.createTask = async (req, res, next) => {
    const taskName = req.body.name;
    const section = req.body.section;
    const projectId = req.params.projectId;
    const newTask = new Task({
        name: taskName,
        section: section,
        desc: "",
        dueDate: "",
        status: "open",
        completedOn: "",
        project: projectId
    });
    try {
        const task = await newTask.save();
        res.status(201).json({
            message: "Task created successfully",
            task: task
        });
    } catch (err) {
        if (!err.statusCode) {
            console.log(err);
            err.statusCode = 500;
        }
        next();
    }
};

exports.getTasks = async (req, res, next) => {
    const projectId = req.params.projectId;
    const userId = req.userId;
    try {
        const tasks = await Task.find({ project: projectId })
            .select({ name: 1, section: 1, assignedTo: 1, project: 1 })
            .populate({ path: "project", select: "name sections" });

        if (!tasks) {
            const error = new Error("Could not find task.");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: "Task searched successfully",
            tasks
        });
    } catch (err) {
        if (!err.statusCode) {
            console.log(err);
            err.statusCode = 500;
        }
        next();
    }
};
exports.getTask = async (req, res, next) => {
    // const projectId = req.params.projectId;
    const taskId = req.params.taskId;
    const userId = req.userId;

    try {
        const task = await Task.findById(taskId).populate({
            path: "project",
            select: "-sections -desc"
        });
        if (!task) {
            const error = new Error("Could not find task.");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: "Fetched task successfully",
            task: task
        });
    } catch (err) {
        if (!err.statusCode) {
            console.log(err);
            err.statusCode = 500;
        }
        next();
    }
};
exports.updateTask = async (req, res, next) => {
    // const projectId = req.params.projectId;
    const taskId = req.params.taskId;
    const userId = req.userId;
    console.log(req.body);
    let body = { ...req.body };
    const excludedFields = ["activity", "checklist"];
    excludedFields.forEach(el => delete body[el]);
    let result;
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            const error = new Error("Could not find task");
            error.status = 404;
            throw error;
        }
        if (req.body.activity) {
            const { activity } = req.body;
            task.activity.unshift(activity);
        }
        if (req.body.checklist) {
            const { checklist } = req.body;
            task.checklist.push(checklist);
        }
        if (body) {
            // result = await Task.findByIdAndUpdate(taskId, body, { new: true });
            // result = await Task.findById(taskId);
            Object.assign(task, body);
        }
        result = await task.save();

        res.status(200).json({
            message: "Updated Successfully",
            task: result
        });
    } catch (err) {
        if (err.statusCode) {
            console.log(err);
            err.statusCode = 500;
        }
        next();
    }
};
exports.deleteTask = async (req, res, next) => {
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;
    const userId = req.userId;
};
