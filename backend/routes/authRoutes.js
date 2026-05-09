const router = require('express').Router();

const { body } = require('express-validator');

const {
  register,
  login
} = require('../controllers/authController');


// Register Route
router.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ],
  register
);


// Login Route
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').notEmpty()
  ],
  login
);


// Test Route
router.get('/test', (req, res) => {
  res.json({
    msg: "Auth route working"
  });
});

module.exports = router;