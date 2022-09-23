const { LifeHack, User } = require("../models")

module.exports = {
  createLifeHack: async (req, res) => {
    try {
      const lifeHack = await LifeHack.create({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        userId: req.session.userId,
        author: req.session.username,
      })

      // await User.findByIdAndUpdate(
      //   req.session.userId,
      //   {
      //     $addToSet: {
      //       lifeHacks: lifeHack._id,
      //     },
      //   },
      //   { new: true }
      // )

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
      const lifeHacks = await LifeHack.find().populate("comments")

      res.json(lifeHacks)
    } catch (error) {
      console.log(error)
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
            comments: { text: req.body.text, userName: req.session.username },
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
