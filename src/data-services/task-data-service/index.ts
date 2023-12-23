import mongoose, { Document, Schema } from "mongoose";
import Joi from "joi";
import { Task, TaskStatus } from "./types";

mongoose.connect((process as any).env.MONGO_DB_URL);

const TaskSchema = new Schema<Task>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: Object.values(TaskStatus), required: true },
    owner_id: { type: String, required: true },
    dueDate: { type: Date },
    created: { type: Date },
    updated: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

// TBD : move to singleton
let TaskModel: mongoose.Model<Task>;

if (mongoose.models?.Task) {
  TaskModel = mongoose.model<Task>("Task");
} else {
  TaskModel = mongoose.model<Task>("Task", TaskSchema);
}

const validateTask = (data: any) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    status: Joi.string()
      .valid(...Object.values(TaskStatus))
      .required(),
    owner_id: Joi.string().required(),
    dueDate: Joi.date().iso(),
  });

  return schema.validate(data);
};

export const getAllTasks = async (ownerId: string) => {
  return TaskModel.find({ owner_id: ownerId });
};

export const createTask = async (taskData: any) => {
  const { error } = validateTask(taskData);

  if (error) {
    throw new Error(error.details[0].message);
  }

  const newTask = new TaskModel({
    ...taskData,
    created: new Date(),
    updated: new Date(),
  });

  return newTask.save();
};

export const updateTask = async (
  taskId: string,
  ownerId: string,
  taskData: any
) => {
  const { error } = validateTask(taskData);

  if (error) {
    throw new Error(error.details[0].message);
  }

  const updatedTask = await TaskModel.findOneAndUpdate(
    { _id: taskId, owner_id: ownerId },
    { ...taskData, updated: new Date() },
    { new: true }
  );

  if (!updatedTask) {
    throw new Error(
      "Task not found or you do not have permission to update it"
    );
  }

  return updatedTask;
};

export const deleteTask = async (taskId: string, ownerId: string) => {
  const deletedTask = await TaskModel.findOneAndDelete({
    _id: taskId,
    owner_id: ownerId,
  });

  if (!deletedTask) {
    throw new Error(
      "Task not found or you do not have permission to delete it"
    );
  }

  return deletedTask;
};