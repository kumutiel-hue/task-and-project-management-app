import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, trim: true, maxlength: 2000, default: "" },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Review", "Completed"],
      default: "To Do",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    assignee: { type: String, trim: true, maxlength: 100, default: "" },
    dueDate: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.model("Task", taskSchema);
