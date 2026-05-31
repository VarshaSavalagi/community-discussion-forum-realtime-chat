// routes/commentRoutes.js

const express = require("express");
const router = express.Router();
const {
  addComment,
  getComments,
  deleteComment
} = require("../controllers/commentController");

const protect = require("../middleware/authMiddleware");

// add comment (protected)
router.post("/", protect, addComment);

// get comments (public)
router.get("/:discussionId", getComments);

// delete comment (protected)
router.delete("/:id", protect, deleteComment);

module.exports = router;