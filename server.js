// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("./routes/admin");
const memberRoutes = require("./routes/memberRoutes");
const eventRoutes = require("./routes/eventRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const uploadRoutes = require("./routes/upload");
const videoRoutes = require("./routes/video.routes");
const pressRoutes = require("./routes/pressRoutes");
// const projectRoutes = require("./routes/projectRoutes");


require("dotenv").config();

const app = express();

// -----------------------------
// CORS
// -----------------------------
const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:3000",
  "http://localhost:5173",
  "https://hlcct.vercel.app",
  "https://hlcct.org"

];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Postman or server-to-server
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

// -----------------------------
// Body parser
// -----------------------------
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// -----------------------------
// MongoDB connection
// -----------------------------
const MONGO_URI = process.env.MONGO_URI;

// Optional local fallback for development
const LOCAL_URI = "mongodb://localhost:27017/human_life_care";

const connectDB = async () => {
  try {
    const uriToUse = process.env.NODE_ENV === "development" && !MONGO_URI ? LOCAL_URI : MONGO_URI;

    await mongoose.connect(uriToUse, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: !!uriToUse.includes("mongodb+srv"),
      tlsAllowInvalidCertificates: process.env.NODE_ENV === "development",
      serverSelectionTimeoutMS: 30000, // 30s
    });

    console.log(`✅ MongoDB Connected Successfully (${uriToUse.includes("localhost") ? "Local" : "Atlas"})`);
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};

// Wait for DB before starting server
const startServer = async () => {
  await connectDB();

  // -----------------------------
  // Routes
  // -----------------------------
  app.use("/api/admin", adminRoutes);

  app.use("/api/members", memberRoutes);
  app.use("/api/events", eventRoutes);
  app.use("/api/gallery", galleryRoutes);
  app.use("/api/upload", uploadRoutes);
  app.use("/api/videos",videoRoutes);
  app.use("/api/press", pressRoutes);
  // app.use("/api/projects", projectRoutes);

  // -----------------------------
  // Health check
  // -----------------------------
  app.get("/health", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Server is running",
      timestamp: new Date().toISOString(),
    });
  });

  // -----------------------------
  // 404 handler
  // -----------------------------
  app.use("*", (req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
  });

  // -----------------------------
  // Global error handler
  // -----------------------------
  app.use((err, req, res, next) => {
    console.error("Global error handler:", err);
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal server error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  });

  // -----------------------------
  // Start server
  // -----------------------------
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  });

  // -----------------------------
  // Graceful shutdown
  // -----------------------------
  ["SIGTERM", "SIGINT"].forEach(signal => {
    process.on(signal, () => {
      console.log(`👋 ${signal} received. Shutting down gracefully`);
      process.exit(0);
    });
  });
};

startServer();
