import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerApi } from "../../api/auth/authAPi";

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerApi,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      console.log("Registration successful:", data);
    },
    onError: (error) => {
      console.log("regiser error", error);
    },
  });
};
