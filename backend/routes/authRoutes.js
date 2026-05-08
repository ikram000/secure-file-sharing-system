const router = require('express').Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/test',login);

module.exports = router;

