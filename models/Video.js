const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    link: { type: String, required: true }, // full YouTube URL
    videoId: { type: String },              // extracted automatically
    thumbnail: { type: String },            // auto generated from videoId
  },
  { timestamps: true }
);

// Helper: extract videoId from YouTube URL
function extractVideoId(url) {
  try {
    const parsedUrl = new URL(url);

    // Short link: https://youtu.be/xxxx
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }

    // Watch link: https://youtube.com/watch?v=xxxx
    if (parsedUrl.searchParams.get("v")) {
      return parsedUrl.searchParams.get("v");
    }

    // Embed link: https://youtube.com/embed/xxxx
    if (parsedUrl.pathname.startsWith("/embed/")) {
      return parsedUrl.pathname.split("/embed/")[1];
    }

    return null;
  } catch (err) {
    return null;
  }
}

// Middleware: auto-fill videoId + thumbnail
VideoSchema.pre("save", function (next) {
  if (this.link && !this.videoId) {
    const id = extractVideoId(this.link);
    if (id) {
      this.videoId = id;
      if (!this.thumbnail) {
        this.thumbnail = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      }
    }
  }
  next();
});

module.exports = mongoose.model("Video", VideoSchema);
