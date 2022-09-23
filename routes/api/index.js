const router = require("express").Router()
const userRoutes = require("./userRoutes")
const lifeHackRoutes = require("./lifeHackRoutes")

router.use("/users", userRoutes)

router.use("/lifeHacks", lifeHackRoutes)

module.exports = router
