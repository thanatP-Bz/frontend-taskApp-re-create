import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskApi } from "../../api/tasks/tasksApi";
import { UpdateTaskData } from "../../types/task";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: UpdateTaskData }) =>
      updateTaskApi(taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Update task error:", error);
    },
  });
};
