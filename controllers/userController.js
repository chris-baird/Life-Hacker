const { User } = require("../models")

module.exports = {
  signUp: async (req, res) => {
    try {
      // TODO Add email regex for email

      // Type error handling
      if (typeof req.body.email !== "string") {
        throw { message: "email must be of type string" }
      }
      if (typeof req.body.password !== "string") {
        throw { message: "password must be of type string" }
      }
      if (typeof req.body.userName !== "string") {
        throw { message: "userName must be of type string" }
      }

      // Extracting properties from req body
      const newUser = {
        email: req.body.email,
        password: req.body.password,
        userName: req.body.userName,
      }

      // Creating new user
      const user = await User.create(newUser)

      // Saving user to session storage
      req.session.save(() => {
        req.session.userId = user._id
        req.session.username = user.userName
        req.session.loggedIn = true

        res.json({
          message: "Signup successful",
          user: user,
        })
      })
    } catch (error) {
      res.json(error)
    }
  },

  logout: (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.redirect("/")
      })
    } else {
      res.redirect("/")
    }
  },

  login: async (req, res) => {
    try {
      // Type checking req body userName
      if (typeof req.body.userName !== "string") {
        throw { message: "userName must be of type string" }
      }

      // Extracting properties from req.body
      const userName = req.body.userName
      const password = req.body.password

      // Finding a user by userName
      const user = await User.findOne({
        userName: userName,
      })

      // No user found with userName
      if (!user) {
        res.status(400).json({ message: "No user account found!" })
        return
      }

      // Checking if password matches
      const validPassword = await user.isValidPassword(password)

      // Password did not match
      if (!validPassword) {
        res.status(400).json({ message: "Invalid username or password!" })
        return
      }

      // Saving use to session storage
      req.session.save(() => {
        req.session.userId = user._id
        req.session.username = user.userName
        req.session.loggedIn = true

        res.json({ user, message: "You are now logged in!" }).status(200)
      })
    } catch (err) {
      res.status(400).json(err)
    }
  },
}
