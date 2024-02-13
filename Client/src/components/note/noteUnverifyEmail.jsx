// NoteUnverifyEmail.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAuth } from "../../context/authContext";
import "./styles.scss";

const NoteUnverifyEmail = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleResendVerification = () => {
    navigate("/?auth=profile");
    console.log("Resending verification email...");
  };

  return (
    <div className="unverified-email" style={{ padding: "10%" }}>
      <p>Your email is not verified. Please verify your email address.</p>
      <Button
        sx={{ marginTop: "5%" }}
        variant="contained"
        color="primary"
        onClick={handleResendVerification}
      >
        Verification Email
      </Button>
      {user && user.email && (
        <p className="email-info">Verification email sent to: {user.email}</p>
      )}
    </div>
  );
};

export default NoteUnverifyEmail;
