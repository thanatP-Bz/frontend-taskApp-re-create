import { useState } from "react";
import { useRegister } from "../../hooks/auth/useRegister";
import { useResendEmail } from "../../hooks/email/useResendEmail";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  const register = useRegister();
  const resendEmail = useResendEmail();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    register.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          setShowVerificationMessage(true); // ✅ show the message
        },
        onError: (error: any) => {
          setErrorMessage(
            error?.response?.data?.message || "Registration failed",
          );
        },
      },
    );

    setName("");
    setEmail("");
    setPassword("");
  };

  //resend email
  const handleResendEmail = async () => {
    const userEmail = register.data?.user.email;
    if (!userEmail) return;
    resendEmail.mutate(userEmail);
  };

  //verfication message
  if (showVerificationMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full space-y-6 text-center">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100">
            <svg
              className="h-8 w-8 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Text */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Check your email
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We sent a verification link to{" "}
              <span className="font-medium text-emerald-600">
                {register.data?.user.email}
              </span>
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Please check your inbox and click the link to verify your account.
            </p>
          </div>

          {/* Resend Button */}
          <button
            onClick={handleResendEmail}
            disabled={resendEmail.isPending}
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
          >
            {resendEmail.isPending ? "Sending..." : "Didn't get email? Resend"}
          </button>

          {/* Back to login */}
          <a
            href="/login"
            className="block text-sm text-emerald-600 hover:text-emerald-500 font-medium"
          >
            Back to login
          </a>
        </div>
      </div>
    );
  }

  //register form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign Up to TaskApp
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/*  error message */}
          {errorMessage && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{errorMessage}</p>
            </div>
          )}

          {/* Email input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="you@example.com"
            />
          </div>
          {/* Name input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="name"
            />
          </div>
          {/* Password input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="••••••••"
            />
          </div>
          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={register.isPending}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
            >
              {register.isPending ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        {/* Register Link */}
        <div className="text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <a
            href="/login"
            className="font-medium text-emerald-600 hover:text-emerald-500"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
