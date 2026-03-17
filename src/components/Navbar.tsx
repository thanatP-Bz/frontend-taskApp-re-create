import { useState, useRef, useEffect } from "react";
import { useLogout } from "../hooks/auth/useLogout";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isGoogleUser = user?.authProvider === "google";

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-emerald-600">TaskApp</h1>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">Welcome back!</span>

            {/* Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-[#8a836e] text-white rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Options
                <svg
                  className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                  {/* ✅ Only show for non-Google users */}
                  {!isGoogleUser && (
                    <>
                      <button
                        onClick={() => {
                          navigate("/change-password");
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg transition-colors"
                      >
                        🔑 Change Password
                      </button>
                      <button
                        onClick={() => {
                          navigate("/security");
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        🔐 Security
                      </button>
                      <hr className="border-gray-100" />
                    </>
                  )}

                  <button
                    onClick={() => {
                      logout.mutate();
                      setDropdownOpen(false);
                    }}
                    disabled={logout.isPending}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg transition-colors disabled:opacity-50"
                  >
                    {logout.isPending ? "Logging out..." : "🚪 Logout"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
