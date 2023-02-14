require("dotenv").config()
const path = require("path")
const express = require("express")
const session = require("express-session")
const exphbs = require("express-handlebars")
const routes = require("./routes")
const helpers = require("./utils/helpers")

const app = express()
const PORT = process.env.PORT || 3001

const mongoose = require("./config/config")
const MongooseStore = require("mongoose-express-session")(session.Store)

const sess = {
  secret: process.env.secret,
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new MongooseStore({
    connection: mongoose,
  }),
}

app.use(session(sess))

const hbs = exphbs.create({ helpers })

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use(routes)

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`)
  })
})
