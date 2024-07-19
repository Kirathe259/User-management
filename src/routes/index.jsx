import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import VerifyOtpPage from "../pages/VerifyOtpPage";
import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import OtpPasswordPage from "../pages/OtpPasswordPage";

function Approutes() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<RegisterPage/>} />
      <Route path="/verify-otp" element={<VerifyOtpPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
      <Route path="/otp-password" element={<OtpPasswordPage/>} />
      <Route path="/reset-password" element={<ResetPasswordPage/>} />
      <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </Router>
  );
}

export default Approutes;