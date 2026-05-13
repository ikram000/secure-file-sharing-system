const fs = require('fs');

const {
  encrypt,
  decrypt
} = require('../utils/encryption');

const File = require('../models/File');


// Upload File
exports.uploadFile = async (req, res) => {

  try {

    // Encrypt File
    const {
      encrypted,
      iv
    } = encrypt(req.file.buffer);

    // Create File Path
    const filePath =
      `uploads/${Date.now()}.enc`;

    // Save Encrypted File
    fs.writeFileSync(
      filePath,
      encrypted
    );

    // Save File Info In MongoDB
    const savedFile = await File.create({

      filename:
        req.file.originalname,

      path:
        filePath,

      iv:
        iv.toString('hex'),

      uploadedBy:
        req.user.id,

      size:
        req.file.size

    });

    // Response
    res.json({

      msg:
        "File uploaded securely",

      id:
        savedFile._id

    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};


// Get User Files
exports.getFiles = async (req, res) => {

  try {

    // Logged-In User Files
    const files =
      await File.find({

        uploadedBy:
          req.user.id

      });

    res.json(files);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};


// Download File
exports.downloadFile = async (req, res) => {

  try {

    // Find File
    const file =
      await File.findById(
        req.params.id
      );

    if (!file) {

      return res.status(404).json({
        msg: "File not found"
      });

    }

    // Check Owner OR Admin
    if (

      file.uploadedBy.toString()
      !== req.user.id

      &&

      req.user.role !== "admin"

    ) {

      return res.status(403).json({
        msg: "Access denied"
      });

    }

    // Read Encrypted File
    const encrypted =
      fs.readFileSync(file.path);

    // Decrypt File
    const decrypted =
      decrypt(

        encrypted,

        Buffer.from(
          file.iv,
          'hex'
        )

      );

    // Send Original File
    res.setHeader(

      'Content-Disposition',

      `attachment; filename="${file.filename}"`

    );

    res.setHeader(
      'Content-Type',
      'application/octet-stream'
    );

    res.send(decrypted);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};


// Delete File
exports.deleteFile = async (req, res) => {

  try {

    // Find File
    const file =
      await File.findById(
        req.params.id
      );

    if (!file) {

      return res.status(404).json({
        msg: "File not found"
      });

    }

    // Check Owner OR Admin
    if (

      file.uploadedBy.toString()
      !== req.user.id

      &&

      req.user.role !== "admin"

    ) {

      return res.status(403).json({
        msg: "Access denied"
      });

    }

    // Delete Physical File
    if (
      fs.existsSync(file.path)
    ) {

      fs.unlinkSync(file.path);

    }

    // Delete MongoDB Record
    await File.findByIdAndDelete(
      req.params.id
    );

    res.json({
      msg: "File deleted successfully"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};


// ADMIN - Get All Files
exports.getAllFiles = async (req, res) => {

  try {

    // Admin Check
    if(req.user.role !== "admin") {

      return res.status(403).json({
        msg: "Admin access only"
      });

    }

    // Get All Files
    const files = await File.find();

    res.json(files);

  } catch(err) {

    res.status(500).json({
      error: err.message
    });

  }

};