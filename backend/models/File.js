const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  iv: String,
  uploadedBy: String
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);