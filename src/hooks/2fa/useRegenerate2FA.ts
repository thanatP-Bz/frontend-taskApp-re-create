import { useMutation } from "@tanstack/react-query";
import { regenerateBackupCodesApi } from "../../api/auth/2faApi";

export const useRegenerateBackupCodes = () => {
  return useMutation({
    mutationFn: regenerateBackupCodesApi,
    onError: (error) => {
      console.log("regenerate backup codes error", error);
    },
  });
};
