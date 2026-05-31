// controllers/commentController.js

const Comment = require("../models/Comment");

// ADD COMMENT
exports.addComment = async (req, res) => {
  try {
    const { content, discussionId } = req.body;

    const comment = await Comment.create({
      content,
      discussion: discussionId,
      user: req.user
    });

    res.status(201).json(comment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET COMMENTS FOR DISCUSSION
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      discussion: req.params.discussionId
    })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

    res.json(comments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE COMMENT
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== req.user) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await comment.deleteOne();

    res.json({ message: "Comment deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};