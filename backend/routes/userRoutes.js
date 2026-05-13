const router = require('express').Router();

const auth = require('../middleware/auth');

const User = require('../models/User');


// ADMIN ONLY
router.get(

  '/all-users',

  auth,

  async (req, res) => {

    try {

      // Admin Check
      if(req.user.role !== "admin") {

        return res.status(403).json({
          msg: "Admin access only"
        });

      }

      // Get Users
      const users = await User.find()
        .select('-password');

      res.json(users);

    } catch(err) {

      res.status(500).json({
        error: err.message
      });

    }

  }

);

module.exports = router;