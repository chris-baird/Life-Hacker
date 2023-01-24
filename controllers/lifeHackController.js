const { LifeHack, User } = require("../models")
// Update all these models to use the User model to create the lifehacks
module.exports = {
  createLifeHack: async (req, res) => {
    try {
      // Type error handling
      if (typeof req.body.title !== "string") {
        throw { message: "title must be of type string" }
      }
      if (typeof req.body.description !== "string") {
        throw { message: "description must be of type string" }
      }
      if (typeof req.body.imageUrl !== "string") {
        throw { message: "imageUrl must be of type string" }
      }

      // Extracting properties from req body
      const newLifeHack = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
      }

      // Creating new lifeHack
      const DBLifeHack = await LifeHack.create(newLifeHack)

      // Updating users lifehacks array with created lifeHack id
      await User.updateOne(
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
      // Type error handling
      if (typeof req.params.id !== "string") {
        throw { message: "id must be of type string" }
      }

      // Extracting user id from req params
      const id = req.params.id

      // Finding user by id
      const DBLifeHack = await LifeHack.findOne({ _id: id })

      res.json(DBLifeHack)
    } catch (error) {
      // Invalid id
      if (error.name === "CastError") {
        return res.json({ message: "Invalid id" })
      }

      res.json(error)
    }
  },

  updateLifeHackById: async (req, res) => {
    try {
      // Type error handling
      if (typeof req.params.id !== "string") {
        throw { message: "id must be of type string" }
      }

      // Extracting user id from req params
      const id = req.params.id

      // Extracting user id from req body
      const body = {...req.body}
      
      // Finding user by id
      const UpdatedDBLifeHack = await LifeHack.findOneAndUpdate({ _id: id },{$set:body},{ runValidators: true, new: true })

      res.json({
        message: "Updated lifeHack",
        lifeHack: UpdatedDBLifeHack,
      })
    } catch (error) {
      res.json(error)
    }
  },

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
