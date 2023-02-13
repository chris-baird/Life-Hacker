const { LifeHack, User } = require("../models")

// Update all these models to use the User model to create the lifehacks
module.exports = {
  createLifeHack: async (req, res) => {
    try {
      // console.log(req.body)
      console.log(req.files)
      // Throws error if image upload failed
      if (!req.files[0]) {
        throw { message: "Unexpected error, please try again" }
      }

      // Type error handling
      if (typeof req.body.title !== "string") {
        throw { message: "title must be of type string" }
      }
      if (typeof req.body.description !== "string") {
        throw { message: "description must be of type string" }
      }

      // Extracting properties from req body
      const newLifeHack = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.files[0].path,
        createdBy: req.session.username,
        userId: req.session.userId,
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
      console.log(error)
      res.status(400).json(error)
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
      const body = { ...req.body }

      // Finding user by id
      const UpdatedDBLifeHack = await LifeHack.findOneAndUpdate(
        { _id: id, userId: req.session.userId },
        { $set: body },
        { runValidators: true, new: true }
      )

      // Safeguard to prevent users from updating other users LifeHacks
      if (!UpdatedDBLifeHack) {
        return res.json({
          message: "Invalid User",
        })
      }

      res.json({
        message: "Updated lifeHack",
        lifeHack: UpdatedDBLifeHack,
      })
    } catch (error) {
      res.json(error)
    }
  },

  deleteLifeHackById: async (req, res) => {
    try {
      const deleteImages = require("../middleware/deleteImages")

      // Type error handling
      if (typeof req.params.id !== "string") {
        throw { message: "id must be of type string" }
      }

      // Extracting user id from req params
      const id = req.params.id

      // Finding user by id
      const RemovedDBLifeHack = await LifeHack.findOneAndRemove({
        _id: id,
        userId: req.session.userId,
      })

      // Safeguard to prevent users from deleting other users LifeHacks
      if (!RemovedDBLifeHack) {
        return res.json({
          message: "Invalid User",
        })
      }

      // Gets image to delete
      const image = RemovedDBLifeHack.imageUrl.split("/")[3]

      // Deletes all images from bucket storage
      deleteImages([image])

      // Removes LifeHack from users subdocument
      await User.updateOne(
        { _id: req.session.userId },
        { $pull: { lifeHacks: RemovedDBLifeHack._id } }
      )

      res.json({
        message: "Removed lifeHack",
        lifeHack: RemovedDBLifeHack,
      })
    } catch (error) {
      res.json(error)
    }
  },
  createComment: async (req, res) => {
    try {
      // Type error handling
      if (typeof req.body.text !== "string") {
        throw { message: "text must be of type string" }
      }
      if (typeof req.params.lifeHackId !== "string") {
        throw { message: "id must be of type string" }
      }

      // Extracting user id from req params
      const id = req.params.lifeHackId

      // Extracting properties from req body
      const newComment = {
        text: req.body.text,
        userName: req.session.username,
      }

      // update lifehack with comment
      const DBUpdatedLifeHack = await LifeHack.findByIdAndUpdate(
        { _id: id },
        { $push: { comments: newComment } },
        { runValidators: true, new: true }
      )

      // if lifeHack does not exist res with error no lifeHack by that id
      if (!DBUpdatedLifeHack) {
        return res.status(404).json({ message: "No lifeHack with this id!" })
      }

      res.json({
        message: "Created comment",
        lifeHack: DBUpdatedLifeHack,
      })
    } catch (error) {
      res.json(error)
    }
  },
  removeComment: async (req, res) => {
    try {
      // Type error handling
      if (typeof req.params.lifeHackId !== "string") {
        throw { message: "id must be of type string" }
      }
      if (typeof req.params.commentId !== "string") {
        throw { message: "id must be of type string" }
      }

      // Extracting user id from req params
      const lifeHackId = req.params.lifeHackId
      const commentId = req.params.commentId

      // update lifehack with comment
      const DBUpdatedLifeHack = await LifeHack.findByIdAndUpdate(
        { _id: lifeHackId },
        { $pull: { comments: { _id: commentId } } },
        { runValidators: true, new: true }
      )

      // if lifeHack does not exist res with error no lifeHack by that id
      if (!DBUpdatedLifeHack) {
        return res.status(404).json({ message: "No lifeHack with this id!" })
      }

      res.json({
        message: "Removed comment",
        lifeHack: DBUpdatedLifeHack,
      })
    } catch (error) {
      res.json(error)
    }
  },
}
