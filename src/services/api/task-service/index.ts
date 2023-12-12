/**
 * @file FE Service for Task API
 *
 * @author Chetan Agrawal <chetan1507@gmail.com>
 *
 */

/**
 * Fetch all the tasks
 * @returns list of tasks
 */
export const fetchAll = async () => {
  try {
    const response = await fetch("/api/v1/task/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to update task:", response.statusText);
      throw new Error("Failed to fetch the tasks");
    }
  } catch (err: any) {
    console.error("Error updating task:", err.message);
    throw new Error("Failed to fetch the tasks", err);
  }
};

/**
 * Create a new task
 * @returns the newly created task
 */
export const create = async (taskData: any) => {
  try {
    const response = await fetch("/api/v1/task/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to create task:", response.statusText);
      throw new Error("Failed to create the task");
    }
  } catch (err: any) {
    console.error("Error creating task:", err.message);
    throw new Error("Failed to create the task", err);
  }
};

/**
 * Update an existing task
 * @returns the updated task
 */
export const update = async (taskId: string, taskData: any) => {
  try {
    const response = await fetch(`/api/v1/task/${taskId}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to update task:", response.statusText);
      throw new Error("Failed to update the task");
    }
  } catch (err: any) {
    console.error("Error updating task:", err.message);
    throw new Error("Failed to update the task", err);
  }
};

/**
 * Delete an existing task
 * @returns the deleted task
 */
export const remove = async (taskId: string) => {
  try {
    const response = await fetch(`/api/v1/task/${taskId}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to delete task:", response.statusText);
      throw new Error("Failed to delete the task");
    }
  } catch (err: any) {
    console.error("Error deleting task:", err.message);
    throw new Error("Failed to delete the task", err);
  }
};
