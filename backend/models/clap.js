const mongoose = require('mongoose');

const clapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

clapSchema.index({ user: 1, article: 1 }, { unique: true });

module.exports = mongoose.model('Clap', clapSchema);
