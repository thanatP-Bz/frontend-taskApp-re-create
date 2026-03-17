import { useMutation } from "@tanstack/react-query";
import { verify2FASetupApi } from "../../api/auth/2faApi";

export const useVerify2FASetup = () => {
  return useMutation({
    mutationFn: verify2FASetupApi,
    onError: (error) => {
      console.log("verify 2FA setup error", error);
    },
  });
};
