import { useMutation } from "@tanstack/react-query";
import { disable2FAApi } from "../../api/auth/2faApi";

export const useDisable2FA = () => {
  return useMutation({
    mutationFn: disable2FAApi,
    onError: (error) => {
      console.log("disable 2FA error", error);
    },
  });
};
