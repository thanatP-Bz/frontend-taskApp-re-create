import { useMutation } from "@tanstack/react-query";
import { enable2FAApi } from "../../api/auth/2faApi";

export const useEnable2FA = () => {
  return useMutation({
    mutationFn: enable2FAApi,
    onError: (error) => {
      console.log("enable 2FA error", error);
    },
  });
};
