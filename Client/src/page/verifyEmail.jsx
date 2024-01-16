import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, CircularProgress, Button } from "@mui/material";

// Import the desired Google Font
import "@fontsource/roboto"; // Example: Using Roboto

const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");
  const { emailToken } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/verify-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ emailToken }), // Assuming emailToken is the token parameter
          }
        );

        if (response.ok) {
          const data = await response.json();
          setVerificationStatus(
            `Email verified successfully for user ${data.name}`
          );
          // Redirect to a different page or perform any other action upon successful verification
        } else {
          const errorData = await response.json();
          setVerificationStatus(`Email verification failed: ${errorData}`);
        }
      } catch (error) {
        console.error("Error:", error);
        setVerificationStatus("Error occurred during email verification");
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
        fontFamily: "Roboto, sans-serif", // Set the desired font family
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
