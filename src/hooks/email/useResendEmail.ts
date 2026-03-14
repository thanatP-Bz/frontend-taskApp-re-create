import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resendEmailApi } from "../../api/email/emailAPi";

export const useResendEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resendEmailApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      console.log("Verify email Error", error);
      console.log("resend error:", error?.response?.data?.message);
      console.log("resend status:", error?.response?.status);
    },
  });
};
