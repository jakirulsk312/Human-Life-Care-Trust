const express = require("express");
const router = express.Router();
const pressController = require("../controllers/pressController");

// Routes
router.post("/", pressController.createPress); // Accepts Cloudinary URL in body
router.get("/", pressController.getAllPress);
router.delete("/:id", pressController.deletePress);

module.exports = router;
