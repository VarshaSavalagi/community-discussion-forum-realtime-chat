// routes/discussionRoutes.js

const express = require("express");
const router = express.Router();
const {
  createDiscussion,
  getDiscussions,
  getDiscussionById,
  deleteDiscussion
} = require("../controllers/discussionController");

const protect = require("../middleware/authMiddleware");

// protected create
router.post("/", protect, createDiscussion);

// public fetch
router.get("/", getDiscussions);
router.get("/:id", getDiscussionById);

// protected delete
router.delete("/:id", protect, deleteDiscussion);

module.exports = router;