import { useState } from "react";
import { useEnable2FA } from "../../hooks/2fa/useEnable2FA";
import { useVerify2FASetup } from "../../hooks/2fa/useVerify2FASetup";
import { useNavigate } from "react-router-dom";

const Setup2FAPage = () => {
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState<"initial" | "qr" | "backup">("initial");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const enable2FA = useEnable2FA();
  const verify2FASetup = useVerify2FASetup();
  const navigate = useNavigate();

  // Step 1 - get QR code
  const handleEnable = () => {
    enable2FA.mutate(undefined, {
      onSuccess: () => {
        setStep("qr");
        setErrorMessage("");
      },
      onError: (error: any) => {
        setErrorMessage(
          error?.response?.data?.message || "Failed to enable 2FA",
        );
      },
    });
  };

  // Step 2 - verify code
  const handleVerify = () => {
    if (!token.trim()) {
      setErrorMessage("Please enter the 6 digit code");
      return;
    }

    verify2FASetup.mutate(token, {
      onSuccess: (data) => {
        setBackupCodes(data.backupCodes);
        setStep("backup");
        setErrorMessage("");

        // ✅ update localStorage so SecurityPage reflects the change
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const updatedUser = { ...user, twoFactorEnabled: true };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      },
      onError: (error: any) => {
        setErrorMessage(error?.response?.data?.message || "Invalid code");
      },
    });
  };

  // Step 1 - Initial
  if (step === "initial") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full space-y-6 text-center">
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Set up Two-Factor Authentication
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Add an extra layer of security to your account using an
              authenticator app like Google Authenticator.
            </p>
          </div>

          {errorMessage && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{errorMessage}</p>
            </div>
          )}

          <button
            onClick={handleEnable}
            disabled={enable2FA.isPending}
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            {enable2FA.isPending ? "Setting up..." : "Set up 2FA"}
          </button>

          <a
            href="/dashboard"
            className="block text-sm text-emerald-600 hover:text-emerald-500 font-medium"
          >
            Back to dashboard
          </a>
        </div>
      </div>
    );
  }

  // Step 2 - QR Code
  if (step === "qr") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full space-y-6 text-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Scan QR Code
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Scan this QR code with your authenticator app then enter the 6
              digit code below.
            </p>
          </div>

          {/* QR Code */}
          {enable2FA.data?.qrCode && (
            <div className="flex justify-center">
              <img
                src={enable2FA.data.qrCode}
                alt="2FA QR Code"
                className="w-48 h-48 border border-gray-200 rounded-lg"
              />
            </div>
          )}

          {/* Manual entry secret */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">
              Can't scan? Enter this code manually:
            </p>
            <p className="text-sm font-mono font-medium text-gray-700 break-all">
              {enable2FA.data?.secret}
            </p>
          </div>

          {errorMessage && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{errorMessage}</p>
            </div>
          )}

          {/* Token input */}
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter 6 digit code
            </label>
            <input
              type="text"
              maxLength={6}
              value={token}
              onChange={(e) => setToken(e.target.value.replace(/\D/g, ""))} // numbers only
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-center text-lg tracking-widest focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="000000"
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={verify2FASetup.isPending || token.length !== 6}
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            {verify2FASetup.isPending ? "Verifying..." : "Verify & Enable"}
          </button>
        </div>
      </div>
    );
  }

  // Step 3 - Backup codes
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-6 text-center">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            2FA Enabled! 🎉
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Save these backup codes somewhere safe. You can use them to access
            your account if you lose your authenticator.
          </p>
        </div>

        {/* Backup codes grid */}
        <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-2">
          {backupCodes.map((code, i) => (
            <p
              key={i}
              className="font-mono text-sm text-gray-700 bg-white rounded px-3 py-2 border border-gray-200"
            >
              {code}
            </p>
          ))}
        </div>

        <p className="text-xs text-red-600">
          ⚠️ These codes will not be shown again. Save them now!
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
        >
          Done — Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Setup2FAPage;
