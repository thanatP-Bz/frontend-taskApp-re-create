import { MessageResponse } from "../../types/authResponse";
import api from "../axios/config";

//forget password
export const forgetPasswordApi = async (
  email: string,
): Promise<MessageResponse> => {
  const res = await api.post("/auth/forget-password", { email });
  return res.data;
};

//reset password
export const resetPasswordApi = async ({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}): Promise<MessageResponse> => {
  const res = await api.post(`/auth/reset-password/?token=${token}`, {
    newPassword,
  });
  return res.data;
};

//change password
export const changePasswordApi = async (data: {
  oldPassword: string;
  newPassword: string;
}): Promise<MessageResponse> => {
  console.log("sending:", data);
  const res = await api.patch("/auth/change-password", data);
  return res.data;
};
