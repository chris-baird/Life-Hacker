const router = require("express").Router()
const isAuthenticated = require("../middleware/isAuthenticated")
const { User, LifeHack } = require("../models")

router.get("/", (req, res) => {
  res.render("landing", { user: req.session.loggedIn })
})

router.get("/browse", async (req, res) => {
  const data = await LifeHack.find()
  const lifeHacks = data.map((lh) => {
    const lifehackJSON = lh.toJSON()
    lifehackJSON.owned =
      lh.userId.toString() === req.session.userId ? true : false
    return lifehackJSON
  })
  res.render("browse", { user: req.session.loggedIn, lifeHacks })
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
  const data = await User.findOne({ _id: req.session.userId }).populate(
    "lifeHacks"
  )

  const userData = data.toJSON()
  const lifeHacks = userData.lifeHacks.map((lh) => {
    lh.owned = true
    return lh
  })

  userData.lifeHacks = lifeHacks

  res.render("dashboard", {
    user: req.session.loggedIn,
    User: userData,
  })
})

module.exports = router
