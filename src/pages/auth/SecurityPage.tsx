import { useState } from "react";
import { useDisable2FA } from "../../hooks/2fa/useDisable2FA";
import { useRegenerateBackupCodes } from "../../hooks/2fa/useRegenerate2FA";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SecurityPage = () => {
  const [disablePassword, setDisablePassword] = useState("");
  const [newBackupCodes, setNewBackupCodes] = useState<string[]>([]);

  const disable2FA = useDisable2FA();
  const regenerateBackupCodes = useRegenerateBackupCodes();
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}"),
  );

  const handleDisable2FA = () => {
    if (!disablePassword.trim()) {
      toast.error("Password is required");
      return;
    }

    disable2FA.mutate(disablePassword, {
      onSuccess: () => {
        const updatedUser = { ...user, twoFactorEnabled: false };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        toast.success("2FA has been disabled successfully.");
        setDisablePassword("");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to disable 2FA");
      },
    });
  };

  const handleRegenerateBackupCodes = () => {
    regenerateBackupCodes.mutate(undefined, {
      onSuccess: (data) => {
        setNewBackupCodes(data.backupCodes);
        toast.success("Backup codes regenerated successfully!");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to regenerate backup codes",
        );
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Security</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your account security settings.
          </p>
        </div>

        {/* 2FA Status Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Two-Factor Authentication
              </h2>
              <p className="text-sm text-gray-500">
                Add an extra layer of security to your account.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user.twoFactorEnabled
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {user.twoFactorEnabled ? "Enabled" : "Disabled"}
              </span>
              {!user.twoFactorEnabled && (
                <button
                  onClick={() => navigate("/2fa/setup")}
                  className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm"
                >
                  Enable 2FA
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Disable 2FA Card */}
        {user.twoFactorEnabled && (
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Disable 2FA
              </h2>
              <p className="text-sm text-gray-500">
                Enter your password to disable two-factor authentication.
              </p>
            </div>
            <input
              type="password"
              value={disablePassword}
              onChange={(e) => setDisablePassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            />
            <button
              onClick={handleDisable2FA}
              disabled={disable2FA.isPending}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors text-sm"
            >
              {disable2FA.isPending ? "Disabling..." : "Disable 2FA"}
            </button>
          </div>
        )}

        {/* Regenerate Backup Codes Card */}
        {user.twoFactorEnabled && (
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Backup Codes
              </h2>
              <p className="text-sm text-gray-500">
                Regenerate your backup codes. Old codes will be invalidated.
              </p>
            </div>

            {newBackupCodes.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-red-600 font-medium">
                  ⚠️ Save these now — they won't be shown again!
                </p>
                <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-2">
                  {newBackupCodes.map((code, i) => (
                    <p
                      key={i}
                      className="font-mono text-sm text-gray-700 bg-white rounded px-3 py-2 border border-gray-200"
                    >
                      {code}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleRegenerateBackupCodes}
              disabled={regenerateBackupCodes.isPending}
              className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors text-sm"
            >
              {regenerateBackupCodes.isPending
                ? "Regenerating..."
                : "Regenerate Backup Codes"}
            </button>
          </div>
        )}

        {/* Back to dashboard */}
        <div className="text-center">
          <a
            href="/dashboard"
            className="text-sm text-emerald-600 hover:text-emerald-500 font-medium"
          >
            Back to dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
