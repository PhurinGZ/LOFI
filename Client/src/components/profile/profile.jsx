import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.scss";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const Profile = ({ handleLogout }) => {
  const BASE_URL = "http://localhost:8000";
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const [userProfile, setUserProfile] = useState();
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic if needed
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setFormError("New password and confirm password do not match");
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
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password:</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="buttonChangePasswod">
                  {formError && <p className="error-message">{formError}</p>}
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
