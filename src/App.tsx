import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import Dashboard from "./pages/task/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterPage from "./pages/auth/RegisterPage";
import EmailVerificationPage from "./pages/email/EmailVerificationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* email verification */}
        <Route path="/verify-email" element={<EmailVerificationPage />} />

        {/* routes with protected */}
        {/* Tasks route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Default: redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
