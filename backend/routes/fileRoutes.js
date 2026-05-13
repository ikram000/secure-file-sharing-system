const router = require('express').Router();

const multer = require('multer');

const auth = require('../middleware/auth');

const {
  uploadFile,
  downloadFile,
  getFiles,
  deleteFile,
  getAllFiles
} = require('../controllers/fileController');

const upload = multer({
  storage: multer.memoryStorage()
});

// Upload File
router.post(
  '/upload',
  auth,
  upload.single('file'),
  uploadFile
);

// Download File
router.get(
  '/download/:id',
  auth,
  downloadFile
);

// User Files
router.get(
  '/',
  auth,
  getFiles
);

// Delete File
router.delete(
  '/:id',
  auth,
  deleteFile
);

// Admin - Get All File
router.get(
  '/all-files',
  auth,
  getAllFiles
);

module.exports = router;