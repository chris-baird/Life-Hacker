const mongoose = require("mongoose")

const Schema = mongoose.Schema

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => timestamp,
  },
})

const CommentModel = mongoose.model("comment", commentSchema)

module.exports = CommentModel
