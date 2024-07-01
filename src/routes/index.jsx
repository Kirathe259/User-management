import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";

function Approutes() {
  return (
    <Router>
      <Routes>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default Approutes;