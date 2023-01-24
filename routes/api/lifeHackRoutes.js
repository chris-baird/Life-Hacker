const router = require("express").Router()
const isAuthenticated = require("../../middleware/isAuthenticated")
const {
  getLifeHacks,
  getLifeHackById,
  createLifeHack,
  createComment,
  updateLifeHackById
} = require("../../controllers/lifeHackController")

router.route("/").get(getLifeHacks)

router.route("/:id").get(getLifeHackById)

router.route("/:id").put(isAuthenticated).put(updateLifeHackById)

router.route("/").post(isAuthenticated).post(createLifeHack)

router.route("/:lifeHackId/comment").post(isAuthenticated).post(createComment)

module.exports = router
