import * as React from "react";
import {
  Box,
  Button,
  Card,
  FormLabel,
  FormControl,
  TextField,
  Typography,
  Snackbar,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContextValue";
import CloseIcon from "@mui/icons-material/Close";
import "../App.css";
import { useLocation } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: 460,
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  borderRadius: 22,
  border: "1px solid rgba(255, 122, 0, 0.2)",
  boxShadow: "0 24px 40px rgba(59, 33, 0, 0.12)",
  background: "rgba(255, 255, 255, 0.92)",
  backdropFilter: "blur(6px)",
}));

export default function Authentication() {
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get("mode");

  const [username, setUsername] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [formState, setFormState] = React.useState(mode === "signup" ? 1 : 0);
  const [open, setOpen] = React.useState(false);

  const { handleLogin, handleRegister } = React.useContext(AuthContext);

  // 🔹 Main Auth Handler
  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (formState === 0) {
        //  Login
        await handleLogin(username, password);
        setMessage("Login successful");
      } else {
        //  Register
        const result = await handleRegister(username, name, password);
        setUsername("");
        setMessage(result || "Registered successfully");
      }
      setOpen(true);
      setError("");
      setFormState(0); 
      setPassword("");
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Something went wrong";
      setError(msg);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="authPage">
      <Box className="authShell">
        <Box className="authInfoPanel">
          <Typography variant="h3" className="authInfoTitle">
            SyncView
          </Typography>
          <Typography className="authInfoText">
            Seamless calls, shared moments, and quick room access in one place.
          </Typography>
          <Typography className="authInfoBadge">Live • Secure • Instant</Typography>
        </Box>

        <StyledCard>
          <Box className="authTabRow">
            <Button
              variant={formState === 0 ? "contained" : "text"}
              onClick={() => setFormState(0)}
              fullWidth
              sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700 }}
            >
              Sign In
            </Button>
            <Button
              variant={formState === 1 ? "contained" : "text"}
              onClick={() => setFormState(1)}
              fullWidth
              sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700 }}
            >
              Sign Up
            </Button>
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {formState === 0 ? "Welcome Back" : "Create Account"}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {formState === 0
              ? "Sign in to continue your conversations"
              : "Join now and start connecting in seconds"}
          </Typography>

          <Box
            component="form"
            onSubmit={handleAuth}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {formState === 1 && (
              <FormControl fullWidth>
                <FormLabel>Name</FormLabel>
                <TextField
                  size="small"
                  value={name}
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
              </FormControl>
            )}

            <FormControl fullWidth>
              <FormLabel>User Name</FormLabel>
              <TextField
                size="small"
                value={username}
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Password</FormLabel>
              <TextField
                size="small"
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            </FormControl>

            <p style={{color:"red"}}>{error}</p>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                textTransform: "none",
                borderRadius: "12px",
                fontWeight: 700,
                py: 1,
                background: "linear-gradient(135deg, #ff7a00, #ef4f00)",
                boxShadow: "0 12px 20px rgba(239, 79, 0, 0.3)",
              }}
            >
              { formState === 0
                ? "Login"
                : "Register"}
            </Button>
          </Box>

          <Typography variant="caption" color="text.secondary" textAlign="center">
            {formState === 0
              ? "New here? Switch to Sign Up"
              : "Already have an account? Switch to Sign In"}
          </Typography>
        </StyledCard>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message={message || error}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
}