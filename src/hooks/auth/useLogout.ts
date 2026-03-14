import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../api/auth/authAPi";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      queryClient.clear();
      localStorage.clear();
      navigate("/login");
    },
    onError: (error) => {
      console.log("logout error", error);
      queryClient.clear();
      localStorage.clear();
      navigate("/login");
    },
  });
};
