const router = require("express").Router()
const apiRoutes = require("./api/index.js")
const homeRoutes = require("./homeRoutes")

router.use("/", homeRoutes)

router.use("/api", apiRoutes)

module.exports = router
