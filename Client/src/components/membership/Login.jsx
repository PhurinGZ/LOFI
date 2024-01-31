// Login.jsx
import React, { useState } from "react";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { setAuthToken } from "../../auth/auth";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./styles.scss";
import ForgetPassword from "./forgetPassword";
import * as api from "../../api/axios";

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
  zIndex: 1000,
};

const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 100,
};

function Login({ isModalOpen }) {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const [shakeInputs, setShakeInputs] = useState(false);
  const { setPath, user } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // console.log(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    // Reset validation errors and shaking animation when user starts typing
    setEmailError(false);
    setPasswordError(false);
    setShakeInputs(false);

    if (name === "email") {
      // Handle email validation
      setEmailError(!isEmail);
    } else if (name === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,26}$/;
      setPasswordError(!passwordRegex.test(value));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;

    if (!formData.email || emailError) {
      setEmailError(true);
      isValid = false;
    }

    if (!formData.password || passwordError) {
      setPasswordError(true);
      isValid = false;
    }

    return isValid;
  };

  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch("/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       console.log("Login successful");
  //       alert("Login successful")
  //     } else {
  //       console.error("Login failed");
  //       alert("Login failed")
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //   }
  // };

  const handleLogin = async () => {
  try {
    if (!validateForm()) {
      // Form validation failed, apply shaking animation to inputs
      setShakeInputs(true);
      return;
    }

    const response = await api.login(formData);

    console.log(response);

    if (response.status === 200) {
      // Assuming successful response status is 200
      // const responseData = await response.json();
      localStorage.setItem("token", response.data.token);
      setAuthToken(response.data.token);

      // Redirect to home page
      navigate("/");
      setPath("/?auth=profile");

      // Reload the page
      window.location.reload();
    } else {
      // Check if the response contains a custom message
      const errorMessage = response.data.message || "Login failed";
      setFormError(errorMessage);
      console.error(errorMessage);
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
};


  const handleClose = () => {
    setPath("/?auth=login");
  };

  return (
    <div>
      {isModalOpen && (
        <>
          <div style={backdropStyle}></div>
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
              <Link to="/" onClick={handleClose}>
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
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={emailError}
                helperText={emailError ? "Email is required!!" : ""}
                className={shakeInputs && emailError ? "shake-input" : ""}
              />

              <CustomTextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={passwordError}
                helperText={
                  passwordError
                    ? "Password must contain at least 8+ A-Za-zd@$!%*?&"
                    : ""
                }
                className={shakeInputs && passwordError ? "shake-input" : ""}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
              />
              {formError && <p className="error-message">{formError}</p>}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                margin="normal"
                onClick={handleLogin}
                sx={{
                  marginTop: "10px",
                  borderRadius: 20,
                  background: "#BB98FF",
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  width: 400,
                  height: 56,
                  flexShrink: 0,
                }}
              >
                Login
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
              <span
                style={{
                  color: "#9747FF",
                  fontFamily: "Inter",
                  fontSize: 15,
                  fontStyle: "normal",
                  fontWeight: 200,
                  lineHeight: "normal",
                  paddingRight: "10px",
                }}
              >
                {/* <a
                  href="#"
                  style={{
                    color: "#9747FF",
                    fontFamily: "Inter",
                    fontSize: 15,
                    fontStyle: "normal",
                    fontWeight: 200,
                    lineHeight: "normal",
                    paddingRight: "10px",
                  }}
                >
                  Forgot Password?
                </a> */}
                <ForgetPassword />
              </span>
              Don't have an account?{" "}
              <Link
                to="/?auth=register"
                style={{
                  color: "#9747FF",
                  fontFamily: "Inter",
                  fontSize: 15,
                  fontStyle: "normal",
                  fontWeight: 200,
                  lineHeight: "normal",
                }}
              >
                Register
              </Link>
              .
            </Typography>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
