const express = require("express");
const {
  createVideo,
  getAllVideos,
  getLatestVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
} = require("../controllers/video.controller");
const protect = require("../middleware/auth");

const router = express.Router();

// Public routes
router.get("/", getAllVideos);            // GET /api/videos
router.get("/latest", getLatestVideos);  // GET /api/videos/latest
router.get("/:id", getVideoById);        // GET /api/videos/:id

// Protected routes (admin only)
router.post("/", protect, createVideo);    // POST /api/videos
router.put("/:id", protect, updateVideo);  // PUT /api/videos/:id
router.delete("/:id", protect, deleteVideo); // DELETE /api/videos/:id

module.exports = router;
