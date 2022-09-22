const path = require("path")
const express = require("express")
const session = require("express-session")
const exphbs = require("express-handlebars")

const app = express()
const PORT = process.env.PORT || 3001

const mongoose = require("./config/config")
const MongooseStore = require("mongoose-express-session")(session.Store)

const sess = {
  secret: "Super secret secret",
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

const hbs = exphbs.create()

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`)
  })
})
