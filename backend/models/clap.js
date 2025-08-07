const { Schema, model, Types } = require('mongoose');

const clapSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    article: {
      type: Types.ObjectId,
      ref: 'Article',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

clapSchema.index({ user: 1, article: 1 }, { unique: true });

module.exports = model('Clap', clapSchema);
