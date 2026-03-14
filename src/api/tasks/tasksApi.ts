import api from "../axios/config";
import { CreateTaskData, Task, UpdateTaskData } from "../../types/task";

//create task
export const createTaskApi = async ({
  title,
  description,
}: CreateTaskData): Promise<Task> => {
  const response = await api.post("/task", { title, description });
  return response.data.task;
};

//get task
export const getTasksApi = async (): Promise<Task[]> => {
  const response = await api.get("/task");
  return response.data.tasks;
};

//delete task
export const deleteTaskApi = async (taskId: string): Promise<void> => {
  const response = await api.delete(`/task/${taskId}`);
  return response.data.tasks;
};

//update task
export const updateTaskApi = async (
  taskId: string,
  data: UpdateTaskData,
): Promise<Task> => {
  const response = await api.patch(`/task/${taskId}`, data);
  return response.data.updatedTask;
};
