import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


function VerifyOtp() {
	const [otp, setOtp] = useState(["", "", "", ""]);
	const [verifyLoading, setVerifyLoading] = useState(false);
	const [resendLoading, setResendLoading] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const email = location.state?.email || "";

	const handleInputChange = (index, value) => {
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		if (value && index < otp.length - 1) {
			document.getElementById(`otp-${index + 1}`).focus();
		}
	};

	const handleVerifyOTP = async (e) => {
		e.preventDefault();
		setVerifyLoading(true);

		try {
			const enteredOtp = otp.join("");
			const response = await api.post("/verifyotp", { enteredOtp });

			if (response.status === 200) {
				navigate("/login");
			} else {
				alert(response.data.message);
			}
		} catch (error) {
			console.error("Error verifying OTP:", error);
			alert(
				"An error occurred during OTP verification. Please try again later."
			);
		}

		setVerifyLoading(false);
	};

	const handleResendOTP = async () => {
		try {
			setResendLoading(true);
			const response = await api.post("", { email });

			if (response.status === 200) {
				alert(response.data.message);
			} else {
				alert("Failed to resend OTP. Please try again later.");
			}
		} catch (error) {
			console.error("Error resending OTP:", error);
			alert("An error occurred while resending OTP. Please try again later.");
		}

		setResendLoading(false);
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				backgroundColor: "#202",
        outline: "solid thin #202"
			}}>
			<Box
				sx={{
					width: 400,
					p: 4,
					borderRadius: 3,
					bgcolor: "white",
					textAlign: "center",
				}}>
				<Typography
					variant="h3"
					gutterBottom
					sx={{ color: "#202", fontWeight: "bold" }}>
					OTP Verification
				</Typography>
				<Typography
					variant="h5"
					gutterBottom
					sx={{ fontWeight: "bold", marginBottom: "20px" }}>
					OTP Verification
				</Typography>
				<Typography gutterBottom>
					A verification code has been sent to{" "}
					<span style={{ color: "blue" }}>{email}</span>. If the email address
					is incorrect, you can go back and change it.
				</Typography>
				<Typography gutterBottom>Enter OTP sent to your device here</Typography>
				<form onSubmit={handleVerifyOTP}>
					<div>
						{otp.map((value, index) => (
							<TextField
								key={index}
								type="text"
								maxLength={1}
								value={value}
								onChange={(e) => handleInputChange(index, e.target.value)}
								id={`otp-${index}`}
								sx={{ width: 60, textAlign: "center", mb: 2, mr: 1 }}
							/>
						))}
					</div>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						disabled={verifyLoading}
						sx={{ mt: 2, backgroundColor: "#202" }}>
						{verifyLoading ? "Verifying..." : "Verify OTP"}
					</Button>
				</form>
				<Button
					onClick={handleResendOTP}
					disabled={resendLoading}
					sx={{
						mt: 2,
						color: "#202",
						backgroundColor: "white",
						border: "1px solid black",
					}}>
					{resendLoading ? "Resending..." : "RESEND OTP"}
				</Button>
			</Box>
		</Box>
	);
}

export default VerifyOtp;

