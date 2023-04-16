const { body, validationResult } = require("express-validator");

const Article = require("../../models/blog/article");
const Comment = require("../../models/blog/comment");

// comment create post method controller
exports.comment_create = [
	body("article", "Invalid article id.").isMongoId(),
	body("parent", "Invalid parent id.").optional().isMongoId(),
	body("content", "Invalid content.").trim().isLength({ min: 1 }).escape(),
		
	(req, res, next) => {
		const errors = validationResult(req);

		// if errors, reload (jank, but i need to sleep)
		if (!errors.isEmpty()) { return res.redirect("back"); }

		// create new comment
		Comment.create({ 
			article: req.body.article,
			parent: req.body.parent,
			content: req.body.content

		}).then( // redirect to article detail and scroll to parent or comment if top-level
			async result => { 
				await result.populate("article", "slug");
				res.redirect(`${result.article.url}#${result.parent ? result.parent : result._id}`) 
			}, 
			err => { return next(err); }
		);
	}
]

// comment delete method controller
exports.comment_delete = (req, res, next) => {
	// delete comment
	Comment.findOneAndDelete({ _id: req.params.id }).then(
		async result => { 
			await result.populate("article", "slug");

			// redirect to article detail and scroll to parent or comment form if top-level
			res.redirect(`${result.article.url}#${result.parent ? result.parent : "comments"}`) 
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
		Comment.findOneAndUpdate({ _id: req.params.id }, { 
			content: req.body.content

		}).then( // redirect to article detail and scroll to comment
			async result => { 
				await result.populate("article", "slug");
				res.redirect(`${result.article.url}#${result._id}`) 
			}, 
			err => { return next(err); }
		);
	}
]