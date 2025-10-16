const Video = require("../models/Video");

// Create Video
const createVideo = async (req, res) => {
  try {
    const video = await Video.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Video created successfully",
      data: video,
    });
  } catch (error) {
    console.error("Error creating video:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating video",
      error: error.message,
    });
  }
};

// Get All Videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Videos fetched successfully",
      count: videos.length,
      data: videos,
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching videos",
      error: error.message,
    });
  }
};

// Get Latest 3 Videos
const getLatestVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 }).limit(3);
    return res.status(200).json({
      success: true,
      message: "Latest 3 videos fetched successfully",
      count: videos.length,
      data: videos,
    });
  } catch (error) {
    console.error("Error fetching latest videos:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching latest videos",
      error: error.message,
    });
  }
};

// Get Video by ID
const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Video fetched successfully",
      data: video,
    });
  } catch (error) {
    console.error("Error fetching video:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching video",
      error: error.message,
    });
  }
};

  // Update Video
  const updateVideo = async (req, res) => {
    try {
      const { id } = req.params;
      const video = await Video.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!video) {
        return res.status(404).json({
          success: false,
          message: "Video not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Video updated successfully",
        data: video,
      });
    } catch (error) {
      console.error("Error updating video:", error);
      return res.status(500).json({
        success: false,
        message: "Error updating video",
        error: error.message,
      });
    }
  };

// Delete Video
const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findByIdAndDelete(id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Video deleted successfully",
      data: video,
    });
  } catch (error) {
    console.error("Error deleting video:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting video",
      error: error.message,
    });
  }
};

module.exports = {
  createVideo,
  getAllVideos,
  getLatestVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
};
