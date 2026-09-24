const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        completedAt: {
            type: Date
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { _id: true }
);

const attachmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        fileType: {
            type: String,
            default: ""
        },
        fileSize: {
            type: Number, // in bytes
            default: 0
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    },
    { _id: true }
);

const labelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        color: {
            type: String,
            default: "#4F46E5" // default hex color code
        }
    },
    { _id: false }
);

const taskSchema = new mongoose.Schema(
    {
        // 1. Core Task Information
        title: {
            type: String,
            required: [true, "Task title is required"],
            trim: true,
            maxlength: [200, "Title cannot exceed 200 characters"]
        },

        description: {
            type: String,
            default: "",
            trim: true
        },

        taskType: {
            type: String,
            enum: ["task", "bug", "feature", "story", "improvement"],
            default: "task"
        },

        // 2. Hierarchy & Relation
        workspace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: [true, "Workspace ID is required"]
        },

        board: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board",
            required: [true, "Board ID is required"]
        },

        list: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "List"
        },

        // 3. Status & Priority
        status: {
            type: String,
            enum: ["backlog", "todo", "in_progress", "in_review", "completed", "cancelled"],
            default: "todo"
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high", "urgent"],
            default: "medium"
        },

        order: {
            type: Number,
            default: 0 // Position for drag-and-drop ordering in Kanban board
        },

        // 4. People & Assignment
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Creator ID is required"]
        },

        assignedTo: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        watchers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        // 5. Timeline & Dates
        startDate: {
            type: Date
        },

        dueDate: {
            type: Date
        },

        completedAt: {
            type: Date
        },

        // 6. Estimation & Time Tracking
        estimatedHours: {
            type: Number,
            default: 0
        },

        loggedHours: {
            type: Number,
            default: 0
        },

        // 7. Labels & Tags
        labels: [labelSchema],

        tags: [
            {
                type: String,
                trim: true
            }
        ],

        // 8. Subtasks / Checklist
        subtasks: [subtaskSchema],

        // 9. Files & Attachments
        attachments: [attachmentSchema],

        // 10. Links / References
        links: [
            {
                title: { type: String, trim: true },
                url: { type: String, trim: true }
            }
        ],

        // 11. Archive & Soft Delete State
        isArchived: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

// Indexes for fast searching and filtering
taskSchema.index({ board: 1, status: 1 });
taskSchema.index({ workspace: 1 });
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ createdBy: 1 });
taskSchema.index({ dueDate: 1 });

module.exports = mongoose.model("Task", taskSchema);
