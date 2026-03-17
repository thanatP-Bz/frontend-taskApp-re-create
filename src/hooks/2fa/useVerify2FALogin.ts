import { useMutation } from "@tanstack/react-query";
import { verify2FALoginApi } from "../../api/auth/2faApi";

export const useVerify2FALogin = () => {
  return useMutation({
    mutationFn: verify2FALoginApi,
    onError: (error) => {
      console.log("verify 2FA login error", error);
    },
  });
};
