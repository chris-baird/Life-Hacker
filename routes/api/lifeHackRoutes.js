const router = require("express").Router();
const isAuthenticated = require("../../middleware/isAuthenticated");
const uploadHandler = require("../../middleware/multer-google-storage");
const {
  getLifeHacks,
  getLifeHackById,
  createLifeHack,
  createComment,
  removeComment,
  updateLifeHackById,
  deleteLifeHackById,
  addLike,
} = require("../../controllers/lifeHackController");

router.route("/").get(getLifeHacks);

// TODO Fix the auth rediret
router
  .route("/:id")
  .get(getLifeHackById)
  .put(isAuthenticated)
  .put(updateLifeHackById)
  .delete(isAuthenticated)
  .delete(deleteLifeHackById);

router
  .route("/")
  .post(isAuthenticated)
  .post(uploadHandler.any())
  .post(createLifeHack);

router.route("/:lifeHackId/comments").post(isAuthenticated).post(createComment);

router
  .route("/:lifeHackId/comments/:commentId")
  .delete(isAuthenticated)
  .delete(removeComment);

router.route("/:lifeHackId/likes").post(addLike);

module.exports = router;
