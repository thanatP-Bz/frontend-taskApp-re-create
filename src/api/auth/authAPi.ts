import api from "../axios/config";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from "../../types/authResponse";

//register
export const registerApi = async (
  data: RegisterData,
): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", data);

  return res.data;
};

//login
export const loginApi = async (
  data: LoginCredentials,
): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", data);

  return res.data;
};

//logout
export const logoutApi = async (): Promise<void> => {
  await api.post("/auth/logout");
};
