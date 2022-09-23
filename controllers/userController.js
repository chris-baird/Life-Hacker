const { User } = require("../models")

module.exports = {
  signUp: async (req, res) => {
    try {
      const user = await User.create(req.body)

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
        res.status(204).end()
      })
    } else {
      res.status(404).end()
    }
  },

  login: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          userName: req.body.userName,
        },
      })

      if (!user) {
        res.status(400).json({ message: "No user account found!" })
        return
      }

      const validPassword = user.isValidPassword(req.body.password)
      if (!validPassword) {
        res.status(400).json({ message: "No user account found!" })
        return
      }

      req.session.save(() => {
        req.session.userId = user._id
        req.session.username = user.userName
        req.session.loggedIn = true

        res.json({ user, message: "You are now logged in!" })
      })
    } catch (err) {
      res.status(400).json({ message: "No user account found!" })
    }
  },
}
