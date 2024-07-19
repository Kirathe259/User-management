import React, { useState } from "react";
import axios from 'axios';
//import api from "../../services/api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const FormTitle = styled("div")({
  backgroundColor: "#202",
  color: "white",
  width: 450,
  textAlign: "center",
  fontFamily: "Nunito, sans-serif",
  fontSize: 15,
  fontWeight: 50,
  padding: "0.5px",
  borderRadius: "0.5rem",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "0",
  marginBottom: "5px",
});

function RegisterForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const showLoginLink = location.pathname !== "/login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [residence, setResidence] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+254");

  const areFieldsFilled = () => {
    return (
      name &&
      email &&
      phoneNumber &&
      idNumber &&
      password &&
      confirmPassword &&
      gender &&
      dateOfBirth &&
      residence
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormErrors({ ...formErrors, [name]: "" });
    setServerError("");
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "idNumber":
        setIdNumber(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "dateOfBirth":
        setDateOfBirth(value);
        break;
      case "residence":
        setResidence(value);
        break;
      default:
        break;
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    const regex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{5,15}$/;
    if (!regex.test(newPassword)) {
      setFormErrors({
        ...formErrors,
        password: "Password should be between 5 and 15 characters and contain at least one letter, one number, and one special character",
      });
    } else {
      setFormErrors({ ...formErrors, password: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setFormErrors({
        ...formErrors,
        confirmPassword: "Passwords do not match",
      });
      setLoading(false);
      return;
    }

    const userData = {
      name,
      email,
      phoneNumber: countryCode + phoneNumber,
      idNumber,
      password,
      gender,
      dateOfBirth,
      residence,
    };

    try {
      const response = await axios.post("", userData);

      if (response.status === 200) {
        toast.success("Registration successful!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/verify-otp", { state: { email } });
        }, 3000);

        setName("");
        setEmail("");
        setPhoneNumber("");
        setIdNumber("");
        setPassword("");
        setConfirmPassword("");
        setGender("");
        setDateOfBirth("");
        setResidence("");
        setFormErrors({});
      } else {
        console.error("Registration failed. Status:", response.status);
      }
    } catch (error) {
      if (!error.response) {
        setServerError("No server response");
      } else if (error.response.status === 400) {
        setFormErrors({
          ...formErrors,
          email: "User already exists, Log in instead",
        });
      } else {
        setServerError("Internal Server Error");
        console.error("Error submitting form data:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
    setPhoneNumber("");
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#202",
      },
      action: {
        active: "#d9d9d9",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          minHeight: "100vh",
          padding: { xs: "15px", md: "20px" },
        }}
      >
        <ToastContainer />

        <Box sx={{ width: "100%", maxWidth: { xs: "100%", md: "400px" } }} >
          <FormTitle style={{ backgroundColor: "#202", }}>
            <h2 style={{ textAlign: "center", position: "relative" }}>
              <span
                style={{
                  borderBottom: "1px solid white",
                  display: "inline-block",
                  width: "calc(200px)",
                  padding: "0 10px",
                  
                }}
              >
                Signup
              </span>
            </h2>
          </FormTitle>

          <form onSubmit={handleSubmit} style={{ width: "33vw",}}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { label: "Name", name: "name", value: name },
                { label: "Email", name: "email", value: email },
                { label: "ID Number", name: "idNumber", value: idNumber },
              ].map((field) => (
                <TextField
                  key={field.name}
                  label={field.label}
                  variant="outlined"
                  type="text"
                  name={field.name}
                  value={field.value}
                  onChange={handleChange}
                  error={Boolean(formErrors[field.name])}
                  helperText={formErrors[field.name]}
                  style={{ width: "100%" }}
                  autoComplete="off"
                />
              ))}
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
                <Select
                  value={countryCode}
                  onChange={handleCountryCodeChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  style={{ marginBottom: "1px" }}
                >
                  <MenuItem value="+254">+254 (Kenya)</MenuItem>
                  <MenuItem value="+243">+243 (DRC)</MenuItem>
                  <MenuItem value="+250">+250 (Rwanda)</MenuItem>
                  <MenuItem value="+257">+257 (Burundi)</MenuItem>
                  <MenuItem value="+255">+255 (Tanzania)</MenuItem>
                  <MenuItem value="+256">+256 (Uganda)</MenuItem>
                  <MenuItem value="+27">+27 (S. Sudan)</MenuItem>
                </Select>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleChange}
                  error={Boolean(formErrors.phoneNumber)}
                  helperText={formErrors.phoneNumber}
                  style={{ width: "100%" }}
                  autoComplete="off"
                  inputProps={{
                    maxLength: 9,
                    pattern: "[7-9][0-9]{8}",
                  }}
                />
              </Box>
              <TextField
                select
                label="Gender"
                variant="outlined"
                name="gender"
                value={gender}
                onChange={handleChange}
                error={Boolean(formErrors.gender)}
                helperText={formErrors.gender}
                style={{ width: "100%" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <TextField
                label="Date of Birth"
                variant="outlined"
                type="date"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={handleChange}
                error={Boolean(formErrors.dateOfBirth)}
                helperText={formErrors.dateOfBirth}
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="YYYY-MM-DD"
              />
              <TextField
                label="Residence"
                variant="outlined"
                type="text"
                name="residence"
                value={residence}
                onChange={handleChange}
                error={Boolean(formErrors.residence)}
                helperText={formErrors.residence}
                style={{ width: "100%" }}
                autoComplete="off"
              />
              <TextField
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handlePasswordChange}
                error={Boolean(formErrors.password)}
                helperText={formErrors.password}
                style={{ width: "100%" }}
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        style={{ background: "grey" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirm Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                error={Boolean(formErrors.confirmPassword)}
                helperText={formErrors.confirmPassword}
                style={{ width: "100%" }}
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        style={{ background: "grey" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
                disabled={loading || !areFieldsFilled()}
              >
                {loading ? "Loading..." : "Sign up"}
              </Button>
              {serverError && <p style={{ color: "red" }}>{serverError}</p>}
            </Box>
          </form>
          {showLoginLink && (
            <Box mt={2}>
              <Link to="/login">Already registered? Proceed to Login</Link>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default RegisterForm;
