const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "User"
    },
    taskTitle: { 
        type: String, 
        required: true 
    },
    priority: { 
        type: String, 
        enum: ["high", "medium", "low"], 
        default: "medium" 
    },
    status: { 
        type: String, 
        enum: ["Pending", "In Progress", "Complete"], 
        default: "Pending" 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model("Todo", todoSchema);
