const router = require("express").Router()
const isAuthenticated = require("../middleware/isAuthenticated")

router.get("/", (req, res) => {
  res.render("landing")
})

router.get("/browse", (req, res) => {
  res.render("browse")
})

router.get("/signup", (req, res) => {
  res.render("signup")
})

router.get("/login", (req, res) => {
  res.render("login")
})

router.get("/lifehack/:id", (req, res) => {
  res.render("lifeHack")
})

router.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard")
})

module.exports = router
