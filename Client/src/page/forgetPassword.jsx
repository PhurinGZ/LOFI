import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const history = useNavigate();
  const BASE_URL = "http://localhost:8000";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/api/users/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword }),
        }
      );

      if (response.ok) {
        setSuccess(true);
      } else {
        if (response.status === 404) {
          setError("Token not found or expired"); // Adjust the message based on your API response
        } else {
          const data = await response.json();
          setError(data.message || "Error resetting password");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Internal Server Error");
    }
  };

  return (
    <div>
      {success ? (
        <div className="container">
          <h1>Password Reset Successful</h1>
          <p>
            Your password has been reset successfully. You can now proceed to
            login.
          </p>
        </div>
      ) : (
        <div>
          <h2>Reset Password</h2>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
