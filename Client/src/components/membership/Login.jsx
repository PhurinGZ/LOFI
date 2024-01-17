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
  const { setPath, user } = useAuth();
  const BASE_URL = "http://localhost:8080";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  console.log(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Login successful");
        // login({
        //   data: responseData.data,
        //   token: responseData.token,
        //   message: responseData.message,
        // });
        localStorage.setItem("token", responseData.token);
        setAuthToken(responseData.token)
        // Redirect to home page
        navigate("/");
        setPath("/?auth=profile");
      } else {
        console.error("Login failed");
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
