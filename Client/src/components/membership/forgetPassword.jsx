import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  DialogContentText,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import * as api from '../../api/axios'

const ForgetPassword = () => {
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
      const response = await api.forgetPassword(email)
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
    setFormError("");
  };

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: "2px solid #bb98ff",
                outline: "none",
              },
          },
        },
      },
    },
  });

  return (
    <div>
      <a onClick={openModal}>Forgot Password?</a>

      <Dialog open={showModal} onClose={closeModal}>
        <ThemeProvider theme={theme}>
          <DialogTitle sx={{ color: "black", fontSize: "18px" }}>
            Password Reset
          </DialogTitle>
          <DialogContent sx={{ marginTop: "10px", fontSize: "14px" }}>
            <DialogContentText>
              To initiate a password reset, please enter your email address
              here. We will send the password reset information to your email.
            </DialogContentText>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                fullWidth
                sx={{
                  marginTop: "30px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: " #bb98ff",
                    },
                    "&:hover fieldset": {
                      borderColor: "#bb98ff",
                    },
                  },
                }}
              />
              {formError && <p className="error-message">{formError}</p>}
              <DialogActions>
                <Button
                  onClick={closeModal}
                  disabled={loading}
                  sx={{
                    border: "2px solid #D3D3D3",
                    "&:hover": {
                      backgroundColor: "#D3D3D3",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  sx={{
                    border: "2px solid #bb98ff",
                    "&:hover": {
                      backgroundColor: "#bb98ff",
                      color:"#fff",
                    },
                  }}
                >
                  {loading ? "Sending..." : "Send Email"}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </ThemeProvider>
      </Dialog>
    </div>
  );
};

export default ForgetPassword;
