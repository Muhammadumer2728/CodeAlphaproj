const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  originalURL: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("URL", urlSchema);