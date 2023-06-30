const { body, validationResult } = require("express-validator");

const Article = require("../../models/blog/article");
const Comment = require("../../models/blog/comment");

// comment create post method controller
exports.comment_create = [
	body("article", "Invalid article id.").isMongoId(),
	body("author", "Invalid author id.").isMongoId(),
	body("parent", "Invalid parent id.").optional().isMongoId(),
	body("content", "Invalid content.").trim().isLength({ min: 1 }).escape(),
		
	(req, res, next) => {
		const errors = validationResult(req);

		// if errors, reload (jank, but i need to sleep)
		if (!errors.isEmpty()) { return res.redirect("back"); }

		// create new comment
		Comment.create({ 
			author: req.body.author,
			article: req.body.article,
			parent: req.body.parent,
			content: req.body.content

		}).then( // redirect to article detail and scroll to parent or comment if top-level
			async result => { 
				await result.populate("article", "slug");
				req.flash("success", `Posted comment`);
				res.redirect(`${result.article.url}#${result.parent ? result.parent : result._id}`) 
			}, 
			err => { return next(err); }
		);
	}
]

// comment delete method controller
exports.comment_delete = (req, res, next) => {
	// find comment
	Comment.findOne({ _id: req.params.id }).then(
		async result => {
			// check if user is comment author
			if (!req.user.roles.includes("superuser") && !req.user._id.equals(result.author._id)) { 
				const error = new Error("You're not the author of the comment you're trying to delete");
				error.status = 403;
				return next(error);
			}

			// delete comment
			await result.deleteOne();
			await result.populate("article", "slug");

			// redirect to article detail and scroll to parent or comment form if top-level
			req.flash("success", `Deleted comment`);
			res.redirect(`${result.article.url}#${result.parent ? result.parent : "CommentSection"}`) 
		},
		err => { return next(err); }
	);
}

// comment edit post method controller
exports.comment_edit = [
	body("content", "Invalid content.").trim().isLength({ min: 1 }).escape(),
		
	(req, res, next) => {
		const errors = validationResult(req);

		// if errors, reload (jank, but i need to sleep)
		if (!errors.isEmpty()) { return res.redirect("back"); }

		// edit comment
		Comment.findOne({ _id: req.params.id }).then(
			async result => {
				// check if user is comment author
				if (!(req.user._id.equals(result.author._id))) { 
					const error = new Error("You're not the author of the comment you're trying to edit");
					error.status = 403;
					return next(error);
				}

				// update comment
				result.content = req.body.content;
				await result.save();

				// redirect to article detail and scroll to comment
				await result.populate("article", "slug");
				req.flash("success", `Edited comment`);
				res.redirect(`${result.article.url}#${result._id}`) 
			}, 
			err => { return next(err); }
		);
	}
]