// controllers/discussionController.js

const Discussion = require("../models/Discussion");

// CREATE DISCUSSION
exports.createDiscussion = async (req, res) => {
  try {
    const { title, content } = req.body;

    const discussion = await Discussion.create({
      title,
      content,
      user: req.user
    });

    res.status(201).json(discussion);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL DISCUSSIONS
exports.getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(discussions);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE DISCUSSION
exports.getDiscussionById = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id)
      .populate("user", "name email");

    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    res.json(discussion);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE DISCUSSION
exports.deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    // only owner can delete
    if (discussion.user.toString() !== req.user) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await discussion.deleteOne();

    res.json({ message: "Discussion deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};