const mongoose = require("mongoose")

const Schema = mongoose.Schema

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => timestamp,
  },
})

module.exports = commentSchema
