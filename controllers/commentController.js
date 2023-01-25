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
				message: "Created comment",
				lifeHack: DBComment,
			})
		} catch (error) {
			res.json(error)
		}
	},
	removeComment: async (req, res) => {
		try {
			// Type error handling
			if (typeof req.params.lifeHackId !== "string") {
				throw { message: "lifeHack id must be of type string" }
			}
			if (typeof req.params.commentId !== "string") {
				throw { message: "comment id must be of type string" }
			}

			// Extracting user id from req params
			const lifeHackId = req.params.lifeHackId
			const commentId = req.params.commentId

			// Finding user by id
			const DBComment = await Comment.findOneAndRemove({
				_id: commentId,
				userName: req.session.username,
			})

			// Safeguard to prevent users from deleting other users LifeHacks
			if (!DBComment) {
				return res.json({
					message: "Invalid User",
				})
			}

			// Removes LifeHack from users subdocument
			await LifeHack.updateOne(
				{ _id: lifeHackId },
				{ $pull: { comments: DBComment._id } }
			)

			res.json({
				message: "Removed comment",
				lifeHack: DBComment,
			})
		} catch (error) {
			res.json(error)
		}
	},
}