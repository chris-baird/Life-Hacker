const mongoose = require("mongoose")

const Schema = mongoose.Schema

const lifeHackSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => timestamp,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
  ratings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Rating",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
})

lifeHackSchema.virtual("averageRating").get(function () {
  return this.ratings.reduce((rating) => rating, 0) / this.ratings.length
})

lifeHackSchema.virtual("totalLikes").get(function () {
  return this.likes.length
})

lifeHackSchema.virtual("totalComments").get(function () {
  return this.comments.length
})

const LifeHackModel = mongoose.model("lifeHack", lifeHackSchema)

module.exports = LifeHackModel
