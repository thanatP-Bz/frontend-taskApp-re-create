import { useLogout } from "../hooks/auth/useLogout";

export const Navbar = () => {
  const logout = useLogout();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-emerald-600">TaskApp</h1>
          </div>

          {/* Right side - Logout */}
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">Welcome back!</span>
            <button
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {logout.isPending ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
