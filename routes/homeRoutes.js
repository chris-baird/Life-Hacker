const router = require("express").Router()
const isAuthenticated = require("../middleware/isAuthenticated")

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

router.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard", { user: req.session.loggedIn })
})

module.exports = router
