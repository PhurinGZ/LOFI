import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../context/authContext";

// Custom styled TextField
const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: 20,
    "& fieldset": {
      border: "1px solid #9747FF",
    },
    "&:hover fieldset": {
      borderColor: "#9747FF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9747FF",
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#E3F2FD",
  padding: "2%",
  color: "black",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  borderRadius: 8,
  zIndex: 1000, // Correct syntax for zIndex
};

const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the transparency as needed
  zIndex: 100,
};

const Register = ({ isModalOpen }) => {
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [shakeInputs, setShakeInputs] = useState(false);

  const { setPath } = useAuth();
  const BASE_URL = "http://localhost:8080";
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Clear existing errors when the user starts typing
    setUsernameError(false);
    setEmailError(false);
    setPasswordError(false);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const validateForm = () => {
    let isValid = true;

    // Validate username
    if (!formData.username) {
      setUsernameError(true);
      isValid = false;
    }

    // Validate email
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!isEmailValid) {
      setEmailError(true);
      isValid = false;
    }

    // Validate password
    if (formData.password.length < 8) {
      setPasswordError(true);
      isValid = false;
    }

    return isValid;
  };

  const handleRegistration = async () => {
    try {
      if (!validateForm()) {
        // Form validation failed, apply shaking animation to inputs
        setShakeInputs(true);
        return;
      }
      // Your registration logic
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Registration successful");
        navigate("/");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleClose = () => {
    setPath("/?auth=register");
  };

  return (
    <div>
      {isModalOpen && (
        <>
          <div style={backdropStyle}>
            <div style={style}>
              <Typography
                color="textSecondary"
                component="div"
                sx={{
                  textAlign: "center",
                  marginBottom: 2,
                  color: "#3D3D3D",
                  textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  fontFamily: "Inter",
                  fontSize: 30,
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "normal",
                }}
              >
                <strong>Welcome to</strong>
                <Link to="/" onCanPlay={handleClose}>
                  <CloseIcon
                    sx={{
                      position: "absolute",
                      left: "93%",
                      top: "1%",
                      cursor: "pointer",
                    }}
                  />
                </Link>
                <br />
                <img
                  src="public/assets/icons/LOGO.svg"
                  alt="Logo"
                  style={{ marginTop: 10, maxWidth: "100%" }}
                />
              </Typography>

              <form>
                <CustomTextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  error={usernameError}
                  helperText={usernameError ? "Username is required!" : ""}
                  className={shakeInputs && usernameError ? "shake-input" : ""}
                />

                <CustomTextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={emailError}
                  helperText={emailError ? "Valid email is required!" : ""}
                  className={shakeInputs && emailError ? "shake-input" : ""}
                />

                <CustomTextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={passwordError}
                  helperText={
                    passwordError
                      ? "Password must be at least 8 characters!"
                      : ""
                  }
                  className={shakeInputs && passwordError ? "shake-input" : ""}
                />

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  margin="normal"
                  onClick={handleRegistration}
                  sx={{
                    borderRadius: 20,
                    background: "#BB98FF",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    width: 400,
                    height: 56,
                    flexShrink: 0,
                  }}
                >
                  Register
                </Button>
              </form>

              <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{
                  color: "rgba(0, 0, 0, 0.56)",
                  fontFamily: "Inter",
                  fontSize: 15,
                  fontStyle: "normal",
                  fontWeight: 200,
                  lineHeight: "normal",
                  marginTop: 2,
                  display: "flex",
                }}
              >
                Already have an account?{" "}
                <Link
                  to="/?auth=login"
                  href="/login"
                  style={{
                    color: "#9747FF",
                    fontFamily: "Inter",
                    fontSize: 15,
                    fontStyle: "normal",
                    fontWeight: 200,
                    lineHeight: "normal",
                  }}
                >
                  Login
                </Link>
                .
              </Typography>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
