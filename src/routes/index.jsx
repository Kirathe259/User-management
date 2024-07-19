import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import VerifyOtpPage from "../pages/VerifyOtpPage";
import LoginPage from "../pages/LoginPage";

function Approutes() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<RegisterPage/>} />
      <Route path="/verify-otp" element={<VerifyOtpPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </Router>
  );
}

export default Approutes;