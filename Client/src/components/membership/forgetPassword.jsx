import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const ForgetPassword = () => {
  const BASE_URL = "http://localhost:8000";
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/forget-password`,
        { email }, // Send email as an object in the request body
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      if (response.status === 200) {
        console.log("Password reset email sent successfully");
        window.location.reload();
        alert(`Password reset email sent to: ${email}`);
      } else {
        const errorMessage = response.data.message || "Password reset failed";
        setFormError(errorMessage);
        console.error(errorMessage);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      setFormError("User not found");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormError(""); // Clear form error when closing the modal
  };

  return (
    <div>
      <button onClick={openModal}>Forgot Password?</button>

      <Dialog open={showModal} onClose={closeModal}>
        <DialogTitle sx={{ color: "black", fontSize: "18px" }}>
          Password Reset
        </DialogTitle>
        <DialogContent sx={{ marginTop: "10px", fontSize: "14px" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              fullWidth
            />
            {formError && <p className="error-message">{formError}</p>}
            <DialogActions>
              <Button onClick={closeModal} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Email"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ForgetPassword;
