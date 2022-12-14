const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const lifeHackSchema = require("./LifeHack")

const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  lifeHacks: [lifeHackSchema],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "LifeHack",
    },
  ],
})

// Hashing password before user is saved in the database
UserSchema.pre("save", async function (next) {
  //'this' refers to the current document about to be saved
  const user = this
  // Checks to see if the account is new before hashing password.
  //Hash the password with a salt rounds
  const hash = await bcrypt.hash(user.password, 10)
  //Replace the plain text password with the hash and then store it
  this.password = hash
  //Calls the next middleware
  next()
})

//Attaching method to the user schema check if the provided password is valid
UserSchema.methods.isValidPassword = async function (password) {
  const user = this

  //Hashes the password sent by the user for login and checks if the hashed password stored in the
  //database matches the one sent. Returns true if it does else false.
  const compare = await bcrypt.compare(password, user.password)
  return compare
}

const UserModel = mongoose.model("user", UserSchema)

module.exports = UserModel
