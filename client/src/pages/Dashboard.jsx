import { useEffect, useState } from "react";
import API, { setAuthToken } from "../services/api";
import { Container, TextField, Button, Card, Typography } from "@mui/material";

export default function Dashboard() {
  const [discussions, setDiscussions] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // ================= FETCH =================
  const fetchDiscussions = async () => {
    try {
      const res = await API.get("/discussions");
      setDiscussions(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  // ================= CREATE =================
  const createDiscussion = async () => {
    console.log("CREATE CLICKED");

    try {
      if (!title || !content) {
        alert("Fill all fields");
        return;
      }

      const res = await API.post("/discussions", { title, content });

      console.log("Created:", res.data);

      setTitle("");
      setContent("");

      fetchDiscussions();
    } catch (err) {
      console.error("Create Error:", err);
    }
  };

  // ================= INIT =================
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuthToken(token); // CRITICAL FIX
    } else {
      console.log("No token found");
    }

    fetchDiscussions();
  }, []);

  // ================= UI =================
  return (
    <Container>
      <Typography variant="h4">Dashboard</Typography>

      <Card style={{ padding: 20, marginTop: 20 }}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          fullWidth
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ marginTop: 10 }}
        />

        <Button
          variant="contained"
          onClick={createDiscussion}
          style={{ marginTop: 10 }}
        >
          Create
        </Button>
      </Card>

      {discussions.map((d) => (
        <Card key={d._id} style={{ padding: 15, marginTop: 10 }}>
          <Typography>{d.title}</Typography>

          <Button
            onClick={() =>
              (window.location.href = `/discussion/${d._id}`)
            }
          >
            Open
          </Button>
        </Card>
      ))}
    </Container>
  );
}