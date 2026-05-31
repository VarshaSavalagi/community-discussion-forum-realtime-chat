// models/Comment.js

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  discussion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Discussion",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);