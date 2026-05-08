const fs = require('fs');
const { encrypt, decrypt } = require('../utils/encryption');
const File = require('../models/File');

// Upload File
exports.uploadFile = async (req, res) => {
  try {

    // Encrypt file
    const { encrypted, iv } = encrypt(req.file.buffer);

    // Create file path
    const filePath = `uploads/${Date.now()}.enc`;

    // Save encrypted file
    fs.writeFileSync(filePath, encrypted);

    // Save file info in MongoDB
    const savedFile = await File.create({
      filename: req.file.originalname,
      path: filePath,
      iv: iv.toString('hex'),
      uploadedBy: req.user.id
    });

    // Response
    res.json({
      msg: "File uploaded securely",
      id: savedFile._id
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};


// Download File
exports.downloadFile = async (req, res) => {
  try {

    // Find file in database
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        msg: "File not found"
      });
    }
    if (file.uploadedBy.toString() !== req.user.id) {
      return res.status(403).json({
        msg: "Access denied"
      });
    }
    // Read encrypted file
    const encrypted = fs.readFileSync(file.path);

    // Decrypt file
    const decrypted = decrypt(
      encrypted,
      Buffer.from(file.iv, 'hex')
    );

    // Send original file
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${file.filename}"`
    );

    res.attachment(file.filename);

    res.send(decrypted);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};