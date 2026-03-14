import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTaskApi } from "../../api/tasks/tasksApi";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => {
      // Invalidate and refetch tasks
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Create task error:", error);
    },
  });
};
