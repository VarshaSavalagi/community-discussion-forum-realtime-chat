import { useEffect, useState } from "react";
import API, { setAuthToken } from "../services/api";
import socket from "../sockets/socket";
import { useParams } from "react-router-dom";
import { Container, TextField, Button, Card, Typography } from "@mui/material";

export default function Discussion() {
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [comment, setComment] = useState("");

  // ================= FETCH COMMENTS =================
  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error("Fetch Comments Error:", err);
    }
  };

  // ================= ADD COMMENT =================
  const addComment = async () => {
    console.log("ADD CLICKED");

    try {
      if (!comment) return;

      await API.post("/comments", {
        content: comment,
        discussionId: id
      });

      setComment("");
      fetchComments();
    } catch (err) {
      console.error("Add Comment Error:", err);
    }
  };

  // ================= SEND MESSAGE (FIXED) =================
  const sendMessage = () => {
    console.log("SEND CLICKED");

    if (!text) return;

    const msg = {
      sender: "User",
      text
    };

    // ✅ FIX 1: update UI immediately
    setMessages((prev) => [...prev, msg]);

    socket.emit("sendMessage", {
      room: id,
      sender: "User",
      text
    });

    setText("");
  };

  // ================= INIT =================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);

    socket.emit("joinRoom", id);

    socket.on("receiveMessage", (msg) => {
      console.log("RECEIVED:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    fetchComments();

    return () => {
      socket.off("receiveMessage");
    };
  }, [id]);

  // ================= UI =================
  return (
    <Container>
      <Typography variant="h4">Discussion</Typography>

      {/* COMMENTS */}
      <Card style={{ padding: 20, marginTop: 20 }}>
        <Typography>Comments</Typography>

        <TextField
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button onClick={addComment} style={{ marginTop: 10 }}>
          Add
        </Button>

        {comments.map((c) => (
          <Typography key={c._id}>{c.content}</Typography>
        ))}
      </Card>

      {/* CHAT */}
      <Card style={{ padding: 20, marginTop: 20 }}>
        <Typography>Live Chat</Typography>

        {messages.map((m, i) => (
          <Typography key={i}>
            <b>{m.sender}:</b> {m.text}
          </Typography>
        ))}

        <TextField
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button onClick={sendMessage} style={{ marginTop: 10 }}>
          Send
        </Button>
      </Card>
    </Container>
  );
}