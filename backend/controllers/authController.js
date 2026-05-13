const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// REGISTER
exports.register = async (req, res) => {

  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({
        errors: errors.array()
      });

    }

    // Get Data
    const { name, email, password } = req.body;

    // Email Validation
    if (!email.includes('@')) {

      return res.status(400).json({
        msg: "Invalid email"
      });

    }

    // Check Existing User
    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {

      return res.status(400).json({
        msg: "Email already exists"
      });

    }

    // Password Validation
    if (password.length < 6) {

      return res.status(400).json({
        msg: "Weak password"
      });

    }

    // Hash Password
    const hash = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({

      name,
      email,
      password: hash,
      role: "admin"

    });

    // Response
    res.status(201).json({

      msg: "User registered successfully",
      user

    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};


// LOGIN
exports.login = async (req, res) => {

  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({
        errors: errors.array()
      });

    }

    // Find User
    const user = await User.findOne({
      email: req.body.email
    });

    if (!user) {

      return res.status(400).json({
        msg: "User not found"
      });

    }

    // Compare Password
    const valid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!valid) {

      return res.status(400).json({
        msg: "Wrong password"
      });

    }

    // JWT Token
    const token = jwt.sign(

      {
        id: user._id,
        role: user.role
      },

      process.env.JWT_SECRET,

      {
        expiresIn: '1h'
      }

    );

    // Response
    res.json({

      msg: "Login successful",

      token,

      user: {

        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role

      }

    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};