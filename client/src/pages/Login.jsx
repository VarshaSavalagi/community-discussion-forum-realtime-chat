import { useState } from "react";
import API, { setAuthToken } from "../services/api";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setAuthToken(res.data.token);
    window.location.href = "/dashboard";
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "100px" }}>
      <Paper style={{ padding: 30 }}>
        <Typography variant="h5">Login</Typography>

        <TextField fullWidth margin="normal" label="Email" onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth margin="normal" label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

        <Button fullWidth variant="contained" onClick={login} style={{ marginTop: 10 }}>
          Login
        </Button>
      </Paper>
    </Container>
  );
}