import { useMutation } from "@tanstack/react-query";
import { resetPasswordApi } from "../../api/password/passwordApi";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPasswordApi,
    onError: (error) => {
      console.log("reset password error", error);
    },
  });
};
