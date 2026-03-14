import { MessageResponse } from "../../types/authResponse";
import api from "../axios/config";

//verification email
export const verificationEmailApi = async (
  token: string,
): Promise<MessageResponse> => {
  const res = await api.get(`/auth/verify-email?token=${token}`);

  return res.data;
};

//resend verrification Email
export const resendEmailApi = async (
  email: string,
): Promise<MessageResponse> => {
  const res = await api.post("/auth/resend-email", { email });

  return res.data;
};
