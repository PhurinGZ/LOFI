import React, { useState } from "react";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import "./styles.scss";

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
  zIndex: 100, // Correct syntax for zIndex
};

const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the transparency as needed
  zIndex: 99,
};

function Login({ isModalOpen }) {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [shakeInputs, setShakeInputs] = useState(false);

  const { setPath } = useAuth();
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    // Reset validation errors and shaking animation when user starts typing
    setEmailError(false);
    setPasswordError(false);
    setShakeInputs(false);

    if (name === "usernameOrEmail") {
      // Handle email validation
      setEmailError(!isEmail);
    } else if (name === "password") {
      // Handle password validation
      setPasswordError(value.length < 8);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;

    if (!formData.usernameOrEmail) {
      setEmailError(true);
      isValid = false;
    }

    if (!formData.password) {
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

      // Your existing login logic here
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Login successful");
        alert("Login successful");
      } else {
        console.error("Login failed");
        alert("Login failed");
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
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
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
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={passwordError}
                helperText={
                  passwordError
                    ? "Password must be at least 8 characters!!"
                    : ""
                }
                className={shakeInputs && passwordError ? "shake-input" : ""}
              />

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
              <span>
                <a
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
                </a>
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
