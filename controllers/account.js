const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../modals/user");

exports.register = async (req, res, next) => {
    const formValues = req.body;
    console.log(formValues);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const emailUpdates = req.body.emailUpdates;
    try {
        let user = await User.findOne({ email: email });
        if (user) {
            const error = new Error("A user with this email already exist");
            error.statusCode = 401;
            throw error;
        }
        const hashedPwd = await bcrypt.hash(password, 12);
        user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPwd,
            emailUpdates: emailUpdates
        });
        const result = await user.save();
        res.status(201).json({
            message: "Account Created.",
            userId: result._id
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error(
                "A user with this email could not be found"
            );
            error.statusCode = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        console.log(isEqual);
        if (!isEqual) {
            const error = new Error("Wrong Password");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            { email: user.email, userId: user._id.toString() },
            "IAMINVINCIBLE",
            { expiresIn: "6h" }
        );
        userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            initial: user.getInitials()
        };
        res.status(200).json({
            token: token,
            userId: user._id.toString(),
            user: userData
        });
    } catch (err) {
        if (err.statuscode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
