const mongoose = require("mongoose");

const Schema = mongoose.Schema;

userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name required"]
        },
        lastName: {
            type: String,
            required: [true, "last name required"]
        },
        email: {
            type: String,
            required: [true, "Email required"],
            unique: [true, "Email already exist"],
            lowercase: true
            // validate: value => {
            //     return validator.isEmail(value);
            // }
        },
        password: {
            type: String,
            required: [true, "Password can not be empty."]
        },
        emailUpdates: {
            type: Boolean,
            require: true
        }
    },
    { timestamps: true }
);

userSchema.methods.getInitials = function() {
    return this.firstName[0] + this.lastName[0];
};
module.exports = mongoose.model("User", userSchema);
