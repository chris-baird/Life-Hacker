const { LifeHack, User, Comment } = require("../models")

module.exports = {
	createComment: async (req, res) => {
		try {
			// Type error handling
			if (typeof req.body.text !== "string") {
				throw { message: "title must be of type string" }
			}

			// Extracting properties from req body
			const newComment = {
				text: req.body.text,
				userName: req.session.username
			}

			const DBComment = await Comment.create(newComment)

			// Updating users lifehacks array with created comment id
			await LifeHack.updateOne(
				{ _id: req.params.lifeHackId },
				{ $push: { comments: DBComment._id } }
			)

			res.json({
				message: "Created lifeHack",
				lifeHack: DBComment,
			})
		} catch (error) {
			res.json(error)
		}
	}
}