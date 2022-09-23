const mongoose = require("mongoose")

const Schema = mongoose.Schema

const likeSchema = new Schema({
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

const LikeModel = mongoose.model("like", likeSchema)

module.exports = LikeModel
