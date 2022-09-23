const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ratingSchema = new Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
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

const RatingModel = mongoose.model("rating", ratingSchema)

module.exports = RatingModel
