import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import RegisterPage from "../pages/RegisterPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

function Approutes() {
  return (
    <Router>
      <Routes>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default Approutes;