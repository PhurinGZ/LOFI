import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import * as api from '../api/axios';

const ResetPassword = () => {
  const { token } = useParams();
  const history = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPasswordNewPassword, setShowPasswordNewPassword] = useState(false);
  const [showPasswordConfirmPassword, setShowPasswordConfirmPassword] =
    useState(false);

  const [formError, setFormError] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const response = await api.resetPassword(newPassword, token)

      if (response.status === 200) {
        setSuccess(true);
      } else {
        if (response.status === 404) {
          setError("Token not found or expired"); // Adjust the message based on your API response
        } else {
          const data = await response.data;
          setError(data.message || "Error resetting password");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Internal Server Error");
    }
  };

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8 || password.length > 26) {
      errors.push("Password must be between 8 and 26 characters");
    }
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    const numericRegex = /\d/;
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!lowerCaseRegex.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    if (!upperCaseRegex.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!numericRegex.test(password)) {
      errors.push("Password must contain at least one numeric digit");
    }

    if (!symbolRegex.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    return errors;
  };
  const validatePasswords = () => {
    const newPasswordErrors = validatePassword(newPassword);
    const confirmPasswordErrors = validatePassword(confirmPassword);

    setFormError({
      newPassword: newPasswordErrors.length > 0 ? newPasswordErrors[0] : "",
      confirmPassword:
        confirmPasswordErrors.length > 0 ? confirmPasswordErrors[0] : "",
    });

    return newPasswordErrors.length === 0 && confirmPasswordErrors.length === 0;
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    const newPasswordErrors = validatePassword(e.target.value);
    setFormError({
      ...formError,
      newPassword: newPasswordErrors.length > 0 ? newPasswordErrors[0] : "",
    });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    const confirmPasswordErrors = validatePassword(e.target.value);
    setFormError({
      ...formError,
      confirmPassword:
        confirmPasswordErrors.length > 0 ? confirmPasswordErrors[0] : "",
    });
  };

  const styleinput = {
    outline: "none",
    height: "25px",
    width: "190px",
    borderRadius: "5px",
    border: "1px solid ",
  };

  const labelStyle = {
    fontSize: "1.5rem",
    margin: "10px",
  };

  const stylesbutton = {
    backgroundColor: "green",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px",
  };

  return (
    <form onSubmit={handleResetPassword}>
      {success ? (
        <div className="container">
          <h1>Password Reset Successful</h1>
          <p>
            Your password has been reset successfully. You can now proceed to
            login.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "5px",
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
              }}
            >
              Reset Password
            </h2>
            <div style={labelStyle}>
              <label style={{ margin: "0px 10px 0px 10px" }}>
                New Password:
              </label>
              <input
                type={showPasswordNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={handleNewPasswordChange}
                style={styleinput}
              />
              <IconButton
                onClick={() =>
                  setShowPasswordNewPassword(!showPasswordNewPassword)
                }
                edge="end"
              >
                {showPasswordNewPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
              <div style={{ fontSize: "1rem" }}>
                {formError.newPassword && formError.newPassword.length > 0 && (
                  <p className="error-message">{formError.newPassword}</p>
                )}
              </div>
            </div>
            <div style={labelStyle}>
              <label style={{ margin: "0px 10px 0px 10px" }}>
                Confirm Password:
              </label>
              <input
                type={showPasswordConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                style={styleinput}
              />
              <IconButton
                onClick={() =>
                  setShowPasswordConfirmPassword(!showPasswordConfirmPassword)
                }
                edge="end"
              >
                {showPasswordConfirmPassword ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
              <div style={{ fontSize: "1rem" }}>
                {formError.confirmPassword &&
                  formError.confirmPassword.length > 0 && (
                    <p className="error-message">{formError.confirmPassword}</p>
                  )}
              </div>
            </div>

            {error && <div style={{ color: "red" }}>{error}</div>}
            <button type="submit" style={stylesbutton}>
              Reset Password
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default ResetPassword;
