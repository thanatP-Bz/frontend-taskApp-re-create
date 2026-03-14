import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTaskApi } from "../../api/tasks/tasksApi";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTaskApi,
    onSuccess: () => {
      // Invalidate and refetch tasks
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Create task error:", error);
    },
  });
};
