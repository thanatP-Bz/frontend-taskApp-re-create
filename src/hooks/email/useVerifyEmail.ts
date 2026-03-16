import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verificationEmailApi } from "../../api/email/emailAPi";

export const useVerifyEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verificationEmailApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.log("Verify email Error", error);
    },
  });
};
