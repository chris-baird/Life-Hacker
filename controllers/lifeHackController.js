const { LifeHack, User } = require("../models")
// Update all these models to use the User model to create the lifehacks
module.exports = {
  createLifeHack: async (req, res) => {
    try {
      const lifeHack = await User.updateOne(
        { _id: req.session.userId },
        {
          $push: {
            lifeHacks: {
              title: req.body.title,
              description: req.body.description,
              imageUrl: req.body.imageUrl,
              userId: req.session.userId,
            },
          },
        }
      )

      res.json({
        message: "Created lifeHack",
        lifeHack: lifeHack,
      })
    } catch (error) {
      res.json(error)
    }
  },

  getLifeHacks: async (req, res) => {
    try {
      const lifeHacks = await User.find().select([
        "-password",
        "-_id",
        "-email",
        "-favorites",
      ])

      res.json(lifeHacks)
    } catch (error) {
      console.log(error)
      res.json(error)
    }
  },

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
