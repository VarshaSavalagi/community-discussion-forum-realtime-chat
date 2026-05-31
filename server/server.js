// server/server.js

const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);

// ==================
// MIDDLEWARE
// ==================
app.use(cors());
app.use(express.json());

// ==================
// DATABASE CONNECTION
// ==================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Error:", err);
    process.exit(1);
  });

// ==================
// LOAD MODELS
// ==================
const User = require("./models/User");
const Discussion = require("./models/Discussion");
const Comment = require("./models/Comment");
const Message = require("./models/Message");

// ==================
// ROUTES
// ==================
const authRoutes = require("./routes/authRoutes");
const discussionRoutes = require("./routes/discussionRoutes");
const commentRoutes = require("./routes/commentRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/discussions", discussionRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/messages", messageRoutes);

// ==================
// TEST ROUTE
// ==================
app.get("/", (req, res) => {
  res.send("API Running Successfully");
});

// ==================
// SOCKET.IO SETUP (WITH DB STORAGE)
// ==================
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // join room
  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  // send message + save to DB
  socket.on("sendMessage", async (data) => {
    try {
      const newMessage = await Message.create({
        room: data.room,
        sender: data.sender,
        text: data.text
      });

      io.to(data.room).emit("receiveMessage", newMessage);

    } catch (error) {
      console.log("Message Error:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ==================
// SERVER START
// ==================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});