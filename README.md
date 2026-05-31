# 📌 Community Discussion Forum with Real-Time Chat

---

## 1. 📖 Project Overview

A full-stack MERN application that integrates:

* **Discussion forum (async communication)**
* **Real-time chat (instant communication)**

Users can:

* Register & login
* Create discussions
* Comment on discussions
* Chat live inside discussion rooms

---

## 2. 🎯 Problem Statement

Traditional platforms split:

* Forums → slow, structured
* Chat apps → fast, unstructured

This creates:

* Context loss
* Fragmented communication

This system unifies both into:

* **Threaded discussions + real-time chat in one place**

---

## 3. 🚀 Key Features

### Authentication

* JWT-based login/register
* Protected routes

### Discussion System

* Create discussion
* Fetch all discussions
* View individual discussion

### Comment System

* Add comments to discussions
* View discussion-specific comments

### Real-Time Chat

* Chat inside each discussion
* Instant message updates
* Multi-user support

---

## 4. ⚡ Real-Time Chat (Core Logic)

* Socket.IO establishes persistent connection
* Each discussion = **chat room**
* Flow:

  * User joins room → `joinRoom`
  * User sends message → `sendMessage`
  * Server broadcasts → `receiveMessage`

---

## 5. 🛠 Tech Stack

| Layer     | Technology            |
| --------- | --------------------- |
| Frontend  | React.js, Material UI |
| Backend   | Node.js, Express.js   |
| Database  | MongoDB (Local)       |
| Auth      | JWT                   |
| Real-Time | Socket.IO             |

---

## 6. 🏗 System Architecture

```
Frontend (React)
     ↓ REST API
Backend (Express)
     ↓
MongoDB Database

Frontend (React)
     ↔ Socket.IO
Backend Server
     ↔ Other Clients
```

---

## 7. 📂 Folder Structure

```
root/
│
├── client/
│   └── src/
│       ├── pages/
│       ├── services/
│       └── sockets/
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── middleware/
│
├── .env.example
├── .gitignore
└── README.md
```

---

## 8. 🔗 API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Discussions

* `GET /api/discussions`
* `POST /api/discussions`
* `DELETE /api/discussions/:id`

### Comments

* `GET /api/comments/:discussionId`
* `POST /api/comments`

---

## 9. 🔌 Socket.IO Events

### Client → Server

* `joinRoom`
* `sendMessage`

### Server → Client

* `receiveMessage`

---

## 10. ⚙️ Setup & Installation

### Step 1: Clone Repository

```
git clone https://github.com/VarshaSavalagi/community-discussion-forum-realtime-chat.git
cd project-folder
```

---

### Step 2: Backend Setup

```
cd server
npm install
npm start
```

---

### Step 3: Frontend Setup

```
cd client
npm install
npm run dev
```

---

### Step 4: Start MongoDB

Ensure local MongoDB server is running.

---

### Step 5: Access Application

```
http://localhost:5173
```

---

## 6. 🧪 Testing Flow

1. Register user
2. Login → get token
3. Create discussion
4. Open discussion
5. Add comment
6. Send real-time message
7. Open second tab → verify live chat

---

## 13. 🎓 Learning Outcomes

* Full-stack application development
* REST API design
* MongoDB schema modeling
* JWT authentication
* Real-time systems using Socket.IO
* Frontend-backend integration
* Debugging production-level issues

---

