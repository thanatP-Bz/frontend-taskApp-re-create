import { MessageResponse } from "../../types/authResponse";
import api from "../axios/config";

export const verificationEmailApi = async (
  token: string,
): Promise<MessageResponse> => {
  const res = await api.get(`/auth/verify-email?token=${token}`);

  return res.data;
};
