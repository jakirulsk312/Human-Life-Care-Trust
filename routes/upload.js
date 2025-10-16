require("dotenv").config();

const express = require("express");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const streamifier = require("streamifier");

const router = express.Router();
const upload = multer(); // for handling multipart/form-data

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload route
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Decode and sanitize folder name
    const folderRaw = decodeURIComponent(req.query.folder || "projects/general");
    // Replace all non-alphanumeric, non-slash, non-underscore, non-hyphen characters with underscores
    const folder = folderRaw.replace(/[^a-zA-Z0-9/_-]/g, "_");

    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.error("❌ Cloudinary upload failed:", err);
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: err.message,
    });
  }
});

module.exports = router;





// require("dotenv").config();
// const express = require("express");
// const multer = require("multer");
// const { v2: cloudinary } = require("cloudinary");
// const streamifier = require("streamifier");

// const router = express.Router();
// const upload = multer(); // for handling multipart/form-data

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Upload route
// router.post("/", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//     const folderRaw = decodeURIComponent(req.query.folder || "projects/general");
//     const folder = folderRaw.replace(/[^a-zA-Z0-9/_-]/g, "_");

//     const streamUpload = (fileBuffer) =>
//       new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream({ folder }, (err, result) => {
//           if (result) resolve(result);
//           else reject(err);
//         });
//         streamifier.createReadStream(fileBuffer).pipe(stream);
//       });

//     const result = await streamUpload(req.file.buffer);

//     res.status(200).json({ success: true, url: result.secure_url, public_id: result.public_id });
//   } catch (err) {
//     console.error("Cloudinary upload failed:", err);
//     res.status(500).json({ success: false, message: "Upload failed", error: err.message });
//   }
// });

// module.exports = router;
