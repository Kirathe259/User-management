import api from "../../services/api";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function OtpPassword() {
  const [passOtp, setPassOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const handleInputChange = (value) => {
    setPassOtp(value);
  };

  const handleVerifyPassOTP = async (e) => {
    e.preventDefault();
    setLoadingVerify(true);
    
        try {
            const response = await api.post("/resendpasswordotp", { email });

      if (response.status === 200) {
        alert("OTP verified");
        navigate("/reset-password");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred while verifying OTP. Please try again later.");
    } finally {
      setLoadingVerify(false);
    }
  };

  const handleResendPassOTP = async () => {
    setLoadingResend(true);

    try {
      const response = await api.post("/resendpasswordotp", { email });

      if (response.status === 200) {
        setMessage(response.data.message);
      } else {
        setMessage("Failed to resend OTP. Please try again later.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setMessage(
        "An error occurred while resending OTP. Please try again later."
      );
    } finally {
      setLoadingResend(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#DEE1E6",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        className="ver2"
        sx={{
          padding: 3,
          borderRadius: 3,
          backgroundColor: "white",
          textAlign: "center",
          width: "400px",
          height: "500px",
        }}
      >
        <Typography
          variant="h3"
          color="primary"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#c00100" }}
        >
          TeleAfia
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", marginBottom: "30px" }}
        >
          OTP Verification
        </Typography>
        <Typography gutterBottom>
          A verification code has been sent to your email address.
        </Typography>
        <Typography
          gutterBottom
          sx={{ marginTop: "20px", marginBottom: "10px" }}
        >
          {message}
        </Typography>
        <form onSubmit={handleVerifyPassOTP}>
          <TextField
            label="Verification code"
            variant="outlined"
            type="text"
            value={passOtp}
            onChange={(e) => handleInputChange(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loadingVerify}
            sx={{ mr: 0, backgroundColor: "#c00100" }}
          >
            {loadingVerify ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Verify OTP"
            )}
          </Button>
        </form>
        <Button
          onClick={handleResendPassOTP}
          disabled={loadingResend}
          sx={{
            marginTop: "20px",
            border: "1px solid black",
            backgroundColor: "white",
          }}
        >
          {loadingResend ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Resend OTP"
          )}
        </Button>
      </Box>
    </Box>
  );
}

export default OtpPassword;
