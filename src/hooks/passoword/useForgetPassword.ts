import { useMutation } from "@tanstack/react-query";
import { forgetPasswordApi } from "../../api/password/passwordApi";

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: forgetPasswordApi,
    onError: (error) => {
      console.log("forget password error", error);
    },
  });
};
