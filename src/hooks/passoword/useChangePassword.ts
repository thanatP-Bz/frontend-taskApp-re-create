import { useMutation } from "@tanstack/react-query";
import { changePasswordApi } from "../../api/password/passwordApi";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePasswordApi,
    onError: (error) => {
      console.log("change password error", error);
    },
  });
};
