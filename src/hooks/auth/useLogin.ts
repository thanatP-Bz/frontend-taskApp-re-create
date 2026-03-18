import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../api/auth/authAPi";
import { toast } from "sonner";

export const useLogin = (options?: { onError?: (error: any) => void }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if (data.requires2FA) {
        navigate("/verify-2fa", {
          state: { userId: data.userId },
        });

        return;
      }

      queryClient.invalidateQueries({ queryKey: ["user"] });
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("sessionId", data.sessionId);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
      toast.success("Login successfully!");
    },
    onError: (error) => {
      options?.onError?.(error);
    },
    retry: false,
  });
};
