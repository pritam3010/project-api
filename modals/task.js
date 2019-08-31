const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    text: {
        type: String,
        required: true
    },
    type: {
        type: String
        // enum: {
        //     values: ["actvity", "conversation"],
        //     message: "Activity is either activity or conversation"
        // }
    },
    creator: {
        type: String
        // required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

taskSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        desc: String,
        section: {
            type: String,
            required: true
        },
        attachment: Array,
        checklistName: {
            type: String,
            default: "Checklist"
        },
        checklist: [
            {
                item: String,
                completed: Boolean,
                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        activity: [activitySchema],
        assignedTo: Array,
        dueDate: Date,
        status: String,
        completedOn: Date,
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
