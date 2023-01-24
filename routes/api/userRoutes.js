const router = require("express").Router()
const isAuthenticated = require("../../middleware/isAuthenticated")
const {
  createUser,
  logout,
  login,
} = require("../../controllers/userController")

router
  .route("/")
  .get(isAuthenticated)
  .get(function (req, res) {
    res.send("Hello World " + req.session.username)
  })

router.route("/").post(createUser)

router.route("/logout").get(logout)

router.route("/login").post(login)

module.exports = router
