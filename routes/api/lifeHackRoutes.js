const router = require("express").Router()
const isAuthenticated = require("../../middleware/isAuthenticated")
const {
  getLifeHacks,
  getLifeHackById,
  createLifeHack,
  createComment,
} = require("../../controllers/lifeHackController")

router.route("/").get(getLifeHacks)

router.route("/:id").get(getLifeHackById)

router.route("/").post(isAuthenticated).post(createLifeHack)

router.route("/:lifeHackId/comment").post(isAuthenticated).post(createComment)

module.exports = router
