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
  // author: {
  //   type: String,
  //   required: true,
  // },
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
  likes: [{
    type: mongoose.Schema.ObjectId,
    ref: "like"
  }],
  ratings: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "rating"
    }
  ],
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "comment"
    }
  ],
})

// lifeHackSchema.virtual("averageRating").get(function () {
//   return (
//     this.ratings.reduce((acc, rating) => acc + rating, 0) / this.ratings.length
//   )
// })

lifeHackSchema.virtual("totalLikes").get(function () {
  return this.likes.length
})

lifeHackSchema.virtual("totalComments").get(function () {
  return this.comments.length
})

const LifeHackModel = mongoose.model("lifeHack", lifeHackSchema)

module.exports = LifeHackModel
