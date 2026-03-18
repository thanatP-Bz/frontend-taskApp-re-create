// For LOGIN REQUEST (what you send)
export interface LoginCredentials {
  email: string;
  password: string;
}

// For REGISTER REQUEST (what you send)
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// For USER DATA (what you get back - NO PASSWORD!)
export interface User {
  _id: string;
  name: string;
  email: string;
  isVerified?: boolean;
  createdAt?: string;
}

// For AUTH RESPONSE (tokens + user)
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  user: User; // ✅ No password here!
  requires2FA?: boolean;
  userId?: string;
  message: string;
}

export interface MessageResponse {
  message: string;
  success: boolean;
}
