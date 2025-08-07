const { Schema, model, Types } = require('mongoose');

const followSchema = new Schema(
  {
    follower: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    following: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

followSchema.index({ follower: 1, following: 1 }, { unique: true });

module.exports = model('Follow', followSchema);
