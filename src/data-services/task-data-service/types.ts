import { Document } from "mongoose";

export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export interface Task extends Document {
  title: string;
  description?: string;
  status: TaskStatus;
  owner_id?: string;
  dueDate: Date;
  created: Date;
  updated: Date;
}