# 🚀 Community Discussion Forum with Real-Time Chat

---

## 📖 Project Overview

A full-stack MERN application that integrates **discussion forums** with **real-time chat**. Users can create discussions, post comments, and communicate instantly within discussion-specific chat rooms.

---

## ❗ Problem Statement

Most platforms separate:

* Forums → structured but slow
* Chat apps → fast but unstructured

This leads to fragmented communication.

This project solves it by combining:

* **Threaded discussions + real-time messaging in a single system**

---

## ✨ Features

### 🔐 Authentication

* User registration & login
* JWT-based authentication
* Protected API access

### 🧵 Discussion System

* Create discussions
* Fetch all discussions
* View discussion details

### 💬 Comment System

* Add comments
* Fetch comments per discussion

### ⚡ Real-Time Chat

* Live chat per discussion
* Instant message updates
* Multi-user communication

---

## ⚡ Real-Time Chat Functionality

* Implemented using **Socket.IO**
* Each discussion acts as a **room**
* Flow:

  * `joinRoom` → user joins discussion
  * `sendMessage` → send message
  * `receiveMessage` → broadcast to users

---

## 🛠 Tech Stack

| Layer     | Technology            |
| --------- | --------------------- |
| Frontend  | React.js, Material UI |
| Backend   | Node.js, Express.js   |
| Database  | MongoDB               |
| Auth      | JWT                   |
| Real-Time | Socket.IO             |

---

## 🏗 Architecture

```
Frontend (React)
      ↓ REST API
Backend (Express)
      ↓
MongoDB

Frontend (React)
      ↔ Socket.IO
Backend Server
      ↔ Other Clients
```

---

## 📂 Folder Structure

```
community-discussion-forum-realtime-chat/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Discussion.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── sockets/
│   │   │   └── socket.js
│   │   │
│   │   ├── main.jsx
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Discussion.js
│   │   ├── Comment.js
│   │   └── Message.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── discussionRoutes.js
│   │   └── commentRoutes.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .env.example
├── .gitignore
└── README.md
```

---

## 🔗 API Endpoints

### Base URL

```text
http://localhost:7000/api
```

---

### 🔐 Auth APIs

* **Register**

```http
POST http://localhost:7000/api/auth/register
```

* **Login**

```http
POST http://localhost:7000/api/auth/login
```

---

### 🧵 Discussion APIs

* **Get All Discussions**

```http
GET http://localhost:7000/api/discussions
```

* **Create Discussion**

```http
POST http://localhost:7000/api/discussions
```

* **Delete Discussion**

```http
DELETE http://localhost:7000/api/discussions/:id
```

---

### 💬 Comment APIs

* **Get Comments by Discussion**

```http
GET http://localhost:7000/api/comments/:discussionId
```

* **Add Comment**

```http
POST http://localhost:7000/api/comments
```

---

## 🔌 Socket.IO Events

### Client → Server

* `joinRoom`
* `sendMessage`

### Server → Client

* `receiveMessage`

---

## ▶️ How to Run

### 1. Clone Repository

```bash
git clone 
cd community-discussion-forum-realtime-chat
```

---

### 2. Backend Setup

```bash
cd server
npm install
npm start
```

---

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

### 4. Environment Variables

Create `.env` inside `server/`:

```env
PORT=7000
MONGO_URI=mongodb://localhost:27017/community-forum
JWT_SECRET=your_secret_key
```

---

### 5. Start MongoDB

Ensure MongoDB is running locally.

---

### 6. Open Application

```
http://localhost:5173
```

---

## 🎯 Learning Outcomes

* Full-stack MERN development
* REST API design & testing
* MongoDB schema design
* JWT authentication
* Real-time communication with Socket.IO
* Debugging and integration skills

---

## 🧠 Interview Summary

Developed a full-stack MERN application integrating forum discussions with real-time chat. Implemented authentication, CRUD operations, comment system, and Socket.IO-based messaging, demonstrating strong full-stack and real-time system design skills.

---


## 🏷 Tags

```
MERN, FullStack, SocketIO, RealTime, MongoDB, React, NodeJS
```
