const router = require('express').Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const { uploadFile, downloadFile } = require('../controllers/fileController');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', auth, upload.single('file'), uploadFile);
router.get('/download/:id', auth, downloadFile);

module.exports = router;