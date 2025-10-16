const Press = require("../models/Press");

// Create a new press item
exports.createPress = async (req, res) => {
  try {
    const { imageUrl } = req.body; // The URL from Cloudinary

    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    const press = new Press({ imageUrl });
    await press.save();

    res.status(201).json({ message: "Press item created successfully", press });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all press items
exports.getAllPress = async (req, res) => {
  try {
    const pressItems = await Press.find().sort({ createdAt: -1 });
    res.status(200).json(pressItems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a press item
exports.deletePress = async (req, res) => {
  try {
    const { id } = req.params;
    const press = await Press.findByIdAndDelete(id);

    if (!press) {
      return res.status(404).json({ message: "Press item not found" });
    }

    res.status(200).json({ message: "Press item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
