import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, CircularProgress, Button } from "@mui/material";
import * as api from "../api/axios";

const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");
  const { emailToken } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const data = await api.verifyEmail(emailToken);

        setVerificationStatus(
          `Email verified successfully for user ${data.username}`
        );
        // Redirect to a different page or perform any other action upon successful verification
      } catch (error) {
        console.error("Error:", error);
        const errorMessage = error.message || "Unknown error occurred";
        setVerificationStatus(`Email verification failed: ${errorMessage}`);
      }
    };

    verifyEmail();
  }, [emailToken]);

  return (
    <Container
      maxWidth="sm"
      style={{
        textAlign: "center",
        marginTop: "50px",
        backgroundColor: "#f0f0f0",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <Typography variant="h4" gutterBottom style={{ color: "#333" }}>
        Email Verification
      </Typography>
      <Typography variant="body1" paragraph style={{ color: "#555" }}>
        {verificationStatus === "Verifying..." ? (
          <CircularProgress style={{ color: "#2196F3" }} />
        ) : (
          <Typography variant="body1" style={{ color: "#333" }}>
            {verificationStatus}
          </Typography>
        )}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href="/"
        style={{ marginTop: "15px" }}
      >
        Back to Home
      </Button>
    </Container>
  );
};

export default VerifyEmail;
