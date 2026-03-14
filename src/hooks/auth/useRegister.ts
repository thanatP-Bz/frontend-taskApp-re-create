import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../../api/auth/authAPi";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerApi,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      console.log("Registration successful:", data);
      navigate("/login");
    },
    onError: (error) => {
      console.log("regiser error", error);
    },
  });
};
