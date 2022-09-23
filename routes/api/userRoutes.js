const router = require("express").Router()
const isAuthenticated = require("../../middleware/isAuthenticated")
const { signUp, logout, login } = require("../../controllers/userController")

router
  .route("/")
  .get(isAuthenticated)
  .get(function (req, res) {
    console.log(req.session)
    res.send("Hello World")
  })

router.route("/").post(signUp)

router.route("/").delete(logout)

router.route("/login").post(login)

module.exports = router
