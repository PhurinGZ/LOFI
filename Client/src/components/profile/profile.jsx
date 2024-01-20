import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./styles.scss";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const Profile = ({ handleLogout }) => {
  const [showPasswordcurrentPassword, setShowPasswordcurrentPassword] =
    useState(false);
  const [showPasswordnewPassword, setShowPasswordnewPassword] = useState(false);
  const [showPasswordconfirmPassword, setShowPasswordconfirmPassword] =
    useState(false);
  const BASE_URL = "http://localhost:8000";
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const [userProfile, setUserProfile] = useState();
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user?.data?._id) {
      axios
        .get(`${BASE_URL}/api/users/${user.data._id}`, {
          headers: {
            "x-auth-token": token,
          },
        })
        .then((response) => {
          setUserProfile(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [BASE_URL, user?.data?._id, token]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });

    // Validate password on change
    if (name === "newPassword" || name === "confirmPassword" || name === "currentPassword") {
      const errors = validatePassword(value);
      setFormError({
        ...formError,
        [name]: errors.length > 0 ? errors[0] : "",
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setFormError("New password and confirm password do not match");
      return;
    }

    const passwordErrors = validatePassword(passwordForm.newPassword);

    if (passwordErrors.length > 0) {
      setFormError(passwordErrors.join(", "));
      return;
    }

    // Make a request to update the password
    axios
      .put(
        `${BASE_URL}/api/users/${user.data._id}`,
        { password: passwordForm.newPassword },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then((response) => {
        console.log("Password updated successfully");
        setFormError("");
        // Reload the page
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        setFormError("Error updating password. Please try again.");
      });
  };

  return (
    <div className="membership">
      <div className="modalBackdrop">
        <div className="modalOverlay">
          <div className="modalHeader">
            <img
              src="/public/assets/icons/LOGO.svg"
              className="logo"
              alt="Logo"
            />
            <Link to="/" className="closeButton">
              <CloseIcon />
            </Link>
          </div>
          <div className="content">
            <div className="myInfo">
              <div className="myinfo-head">
                <h1>My information</h1>
              </div>
              <div className="myinfo-content">
                <span>
                  <p>User Name: </p>{" "}
                  <p>{userProfile?.data?.username || "Loading..."}</p>
                </span>
                <span style={{ marginTop: "10px" }}>
                  {" "}
                  <p>Email:</p>{" "}
                  <p>{userProfile?.data?.email || "Loading..."}</p>
                </span>
              </div>
            </div>

            <div className="managemember">
              <div className="head-managemenber">
                <h1>Manage member</h1>
              </div>
              <p>Member: {userProfile?.data?.role || "Loading..."}</p>
            </div>
            <div className="changepassword">
              <div className="head-changepassword">
                <h1>Change Password</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password:</label>
                  <input
                    type={showPasswordcurrentPassword ? "text" : "password"}
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handleChange}
                    placeholder="********"
                    required
                  />
                  <IconButton
                    onClick={() =>
                      setShowPasswordcurrentPassword(
                        !showPasswordcurrentPassword
                      )
                    }
                    edge="end"
                  >
                    {showPasswordcurrentPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                  <div className="error">
                    {formError.currentPassword && (
                      <p className="error-message">{formError.currentPassword}</p>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password:</label>
                  <input
                    type={showPasswordnewPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    placeholder="********"
                    value={passwordForm.newPassword}
                    onChange={handleChange}
                    required
                  />
                  <IconButton
                    onClick={() =>
                      setShowPasswordnewPassword(!showPasswordnewPassword)
                    }
                    edge="end"
                  >
                    {showPasswordnewPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                  <div className="error">
                    {formError.newPassword && (
                      <p className="error-message">{formError.newPassword}</p>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type={showPasswordconfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="********"
                    value={passwordForm.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <IconButton
                    onClick={() =>
                      setShowPasswordconfirmPassword(
                        !showPasswordconfirmPassword
                      )
                    }
                    edge="end"
                  >
                    {showPasswordconfirmPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                  <div className="error">
                    {formError.confirmPassword && (
                      <p className="error-message">
                        {formError.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
                <div className="buttonChangePasswod">
                  <button type="submit" className="change-password-button">
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="logoutButton">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
