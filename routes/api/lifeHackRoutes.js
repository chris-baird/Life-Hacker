const router = require("express").Router()
const isAuthenticated = require("../../middleware/isAuthenticated")
const {
  getLifeHacks,
  getLifeHackById,
  createLifeHack,
  createComment,
  removeComment,
  updateLifeHackById,
  deleteLifeHackById,
} = require("../../controllers/lifeHackController")


router.route("/").get(getLifeHacks)

// TODO Fix the auth rediret
router.route("/:id").get(getLifeHackById).put(isAuthenticated).put(updateLifeHackById).delete(isAuthenticated).delete(deleteLifeHackById)

router.route("/").post(isAuthenticated).post(createLifeHack)

router.route("/:lifeHackId/comments").post(isAuthenticated).post(createComment)

router.route("/:lifeHackId/comments/:commentId").delete(isAuthenticated).delete(removeComment)

module.exports = router
