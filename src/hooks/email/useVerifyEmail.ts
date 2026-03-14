import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { verificationEmailApi } from "../../api/email/emailAPi";

export const useVerifyEmail = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: verificationEmailApi,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/login", {
        state: {
          message:
            data.message || `Email verified successfully, now you can log in`,
        },
      });
    },
    onError: (error) => {
      console.log("Verify email Error", error);
    },
  });
};
