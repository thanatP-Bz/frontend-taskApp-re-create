import {
  Enable2FAResponse,
  MessageResponse,
  Verify2FASetupResponse,
} from "../../types/2fa";
import { AuthResponse } from "../../types/authResponse";
import api from "../axios/config";

// Enable 2FA - get QR code
export const enable2FAApi = async (): Promise<Enable2FAResponse> => {
  const res = await api.post("/2fa/enable");
  return res.data;
};

// Verify 2FA setup - confirm code and enable
export const verify2FASetupApi = async (
  token: string,
): Promise<Verify2FASetupResponse> => {
  const res = await api.post("/2fa/verify-setup", { token });
  return res.data;
};

// Verify 2FA login
export const verify2FALoginApi = async (data: {
  userId: string;
  token: string;
}): Promise<AuthResponse> => {
  const res = await api.post("/2fa/verify-2fa-login", data);
  return res.data;
};

// Disable 2FA
export const disable2FAApi = async (
  password: string,
): Promise<MessageResponse> => {
  const res = await api.post("/2fa/disable", { password });
  return res.data;
};

// Regenerate backup codes
export const regenerateBackupCodesApi = async (): Promise<{
  backupCodes: string[];
  message: string;
}> => {
  const res = await api.post("/2fa/regenerate-backup-codes");
  return res.data;
};
