export interface Enable2FAResponse {
  secret: string;
  qrCode: string;
  message: string;
}

export interface Verify2FASetupResponse {
  backupCodes: string[];
  message: string;
}

export interface MessageResponse {
  message: string;
}
