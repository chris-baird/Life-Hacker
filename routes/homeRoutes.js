const router = require("express").Router()
const isAuthenticated = require("../middleware/isAuthenticated")
const { User } = require("../models")

router.get("/", (req, res) => {
  res.render("landing", { user: req.session.loggedIn })
})

router.get("/browse", (req, res) => {
  res.render("browse", { user: req.session.loggedIn })
})

router.get("/signup", (req, res) => {
  res.render("signup", { user: req.session.loggedIn })
})

router.get("/login", (req, res) => {
  res.render("login", { user: req.session.loggedIn })
})

router.get("/lifehack/:id", (req, res) => {
  res.render("lifeHack", { user: req.session.loggedIn })
})

router.get("/dashboard", isAuthenticated, async (req, res) => {
  const userData = await User.findOne({ _id: req.session.userId }).populate(
    "lifeHacks"
  )
  console.log(userData.toJSON().lifeHacks[0].comments)
  res.render("dashboard", {
    user: req.session.loggedIn,
    User: userData.toJSON(),
  })
})

module.exports = router
