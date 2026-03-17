import { useEffect, useState } from "react";
import { useRegister } from "../../hooks/auth/useRegister";
import { useResendEmail } from "../../hooks/email/useResendEmail";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(timer); // cleanup
  }, [cooldown]);

  const register = useRegister();
  const resendEmail = useResendEmail();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    register.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          setShowVerificationMessage(true);
          // ✅ show the message
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
    //check user
    const userEmail = register.data?.user.email;
    if (!userEmail) return;

    resendEmail.mutate(userEmail, {
      onSuccess: () => {
        setCooldown(60); // ✅ start 60 second cooldown
      },
      onError: (error: any) => {
        setErrorMessage(
          error?.response?.data?.message || "Resend email failed",
        );
      },
    });
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

          {/* ✅ Error message from resend */}
          {errorMessage && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{errorMessage}</p>
            </div>
          )}

          {/* ✅ Resend success message */}
          {resendEmail.isSuccess && (
            <div className="rounded-md bg-green-50 p-4">
              <p className="text-sm text-green-800">
                Email resent! Please check your inbox.
              </p>
            </div>
          )}

          {/* Resend Button */}
          <button
            onClick={handleResendEmail}
            disabled={resendEmail.isPending || cooldown > 0}
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
          >
            {resendEmail.isPending
              ? "Sending..."
              : cooldown > 0
                ? `Resend in ${cooldown}s` // ✅ shows countdown
                : "Didn't get email? Resend"}
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
      <div className="max-w-md w-full space-y-4">
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

        {/* option Link */}
        <div className="text-sm text-gray-600 text-center">
          <span>
            Already have and account{" "}
            <a
              href="/login"
              className="font-medium text-emerald-600 hover:text-emerald-500"
            >
              Login
            </a>{" "}
            / forget password ?{" "}
            <a
              href="/forget-password"
              className="text-sm text-emerald-600 hover:text-emerald-500 font-medium"
            >
              Click
            </a>
          </span>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          onClick={() =>
            (window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`)
          }
          className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
