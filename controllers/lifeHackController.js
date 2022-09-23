const { LifeHack } = require("../models")

module.exports = {
  createLifeHack: async (req, res) => {
    try {
      const lifeHack = await LifeHack.create({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        userId: req.session.userId,
      })
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
      const lifeHacks = await LifeHack.find()

      res.json({
        lifeHacks,
      })
    } catch (error) {
      res.json(error)
    }
  },

  createComment: async (req, res) => {
    try {
      const lifeHack = await LifeHack.findByIdAndUpdate(
        {
          _id: req.params.lifeHackId,
        },
        {
          $addToSet: {
            comments: { text: req.body.text, userId: req.session.userId },
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
