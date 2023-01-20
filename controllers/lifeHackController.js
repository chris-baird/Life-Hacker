const { LifeHack, User } = require("../models")
// Update all these models to use the User model to create the lifehacks
module.exports = {
  createLifeHack: async (req, res) => {
    try {
      const newLifeHack = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
      }
      // Creates new lifehack
      const DBLifeHack = await LifeHack.create(newLifeHack)
      // Updating users lifehacks array
      const DBUser = await User.updateOne(
        { _id: req.session.userId },
        { $push: { lifeHacks: DBLifeHack._id } }
      )

      res.json({
        message: "Created lifeHack",
        lifeHack: DBLifeHack,
      })
    } catch (error) {
      res.json(error)
    }
  },

  getLifeHacks: async (req, res) => {
    try {
      const lifeHacks = await LifeHack.find()

      res.json(lifeHacks)
    } catch (error) {
      console.log(error)
      res.json(error)
    }
  },

  getLifeHackById: async (req, res) => {
    try {
      const DBLifeHack = await LifeHack.findOne({ _id: req.params.id })

      res.json(DBLifeHack)
    } catch (error) {
      res.json(error)
    }
  },

  updateLifeHackById: async (req, res) => {},

  deleteLifeHackById: async (req, res) => {},

  // Needs to be updated to match new model
  createComment: async (req, res) => {
    try {
      const lifeHack = await User.updateOne(
        {
          userName: req.body.userName,
          "lifeHacks._id": req.body.lifeHackId,
        },
        {
          $push: {
            "lifeHacks.$.comments": {
              text: req.body.text,
              userName: req.session.username,
            },
          },
        },
        { new: true }
      )

      if (!lifeHack) {
        return res.status(404).json({ message: "No lifeHack with this id!" })
      }

      res.json({
        message: "Created comment",
        lifeHack: lifeHack,
      })
    } catch (error) {
      res.json(error)
    }
  },
}
