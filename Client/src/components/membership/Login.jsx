import React from "react";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Register from "./register";

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
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  color: "black",
  backgroundColor: "#E3F2FD",
};




function Login() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = React.useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Login successful");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <div variant="contained" color="primary" onClick={handleOpen} style={{color: "#9747FF"}}>
        Open Login
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
            <CloseIcon
              sx={{
                position: "absolute",
                left: "93%",
                top: "1%",
                cursor: "pointer",
              }}
              onClick={handleClose}
            />
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
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
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
                marginTop:"10px",
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
              display:"flex"
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
                paddingRight:"10px",
              }}
            >
              Forgot Password?
            </a>

            </span>
            Don't have an account?{" "}
            <a
              style={{
                color: "#9747FF",
                fontFamily: "Inter",
                fontSize: 15,
                fontStyle: "normal",
                fontWeight: 200,
                lineHeight: "normal",
              }}
            >
              <Register />
            </a>
            .
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Login;
