const mongoose = require('mongoose');

const fileSchema =
  new mongoose.Schema({

    filename: {
      type: String,
      required: true
    },

    path: {
      type: String,
      required: true
    },

    iv: {
      type: String,
      required: true
    },

    uploadedBy: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    // File Size
    size: {
      type: Number,
      default: 0
    }

  },

    {
      timestamps: true
    }

  );

module.exports =
  mongoose.model(
    'File',
    fileSchema
  );