import * as React from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormLabel,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: 400,
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  marginTop: "10vh",
  borderRadius: 12,
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
}));

export default function Authentication() {

  const [username, setUsername] = React.useState("");
  const[name, setName] = React.useState("");
  const[password, setPassword] = React.useState("");
  // const[error, setError] = React.useState("");
  // const[message, setMessage] = React.useState("");

  const[formState, setFormState] = React.useState(0); 
  // const[open,setOpen] = React.useState(false);
  

  
  return (
    <StyledCard>
      {/* Header */}
      <div>
        <Button variant={formState === 0 ? "contained" : ""} onClick={() => setFormState(0)}>
          Sign in
        </Button>
        <Button variant={formState === 1 ? "contained" : ""} onClick={() => setFormState(1)}>
          Sign up
        </Button>
      </div>

      <Typography variant="body2" color="text.secondary">
        Use your account to continue
      </Typography>

      {/* Form */}
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >

        {formState === 1 && (
          <>
            {/* Name */}
            <FormControl fullWidth>
              <FormLabel>Name</FormLabel> 
              <TextField
                size="small"
                value={name}  
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </>
        )}
        

        {/* User Name */}
        <FormControl fullWidth>
          <FormLabel>User Name</FormLabel>
          <TextField
            size="small"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
        </FormControl>

        {/* Password */}
        <FormControl fullWidth>
          <FormLabel>Password</FormLabel>
          <TextField
            size="small"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormControl>

        {/* Remember */}
        <FormControlLabel
          control={<Checkbox size="small" />}
          label="Remember me"
        />

        {/* Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 500,
          }}
        >
          Sign in
        </Button>
      </Box>
    </StyledCard>
  );
}