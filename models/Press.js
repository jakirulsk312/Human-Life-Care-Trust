const mongoose = require("mongoose");

const pressSchema = new mongoose.Schema(
  {  
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("press", pressSchema);