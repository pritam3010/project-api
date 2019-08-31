const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const accountRoutes = require("./routes/account");
const projectRoutes = require("./routes/project");
const taskRoutes = require("./routes/task");
const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    //   res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use("/account", accountRoutes);
app.use("/app", projectRoutes);
app.use("/app", taskRoutes);

app.use((error, req, res, next) => {
    console.log("Error from app.js", error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose
    .connect(
        "mongodb+srv://mongoDBUser:qwertyuiop@task-q2b4e.mongodb.net/tasker?retryWrites=true&w=majority"
    )
    .then(result =>
        app.listen(4000, () => console.log("Server is listening on port 4000."))
    )
    .catch(err => {
        console.log(err);
        const error = new Error(err);
        error.statusCode = 500;
        throw error;
    });
