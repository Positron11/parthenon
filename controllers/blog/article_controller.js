const { body, validationResult } = require("express-validator");

const Article = require("../../models/blog/article");

exports.article_create_get = (req, res, next) => {
	res.render("blog/article_editor", { 
		title: "Create Article"
	});
}

exports.article_create_post = [
	body("title", "Invalid title.").trim().isLength({ min: 1, max: 40 }).escape(),
	body("subtitle", "Invalid subtitle.").trim().isLength({ min: 1, max: 40 }).escape(),
	body("description", "Invalid description.").trim().isLength({ min: 1, max: 300 }).escape(), 
	body("content", "Invalid content.").trim().isLength({ min: 1 }).escape(),

	(req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.render("blog/article_editor", {
				title: "Create Article",
				form_data: req.body,
				errors: errors.array()
			}); return;
		}

		const article = new Article({ 
			title: req.body.title,
			subtitle: req.body.subtitle,
			description: req.body.description,
			content: req.body.content
		});
		
		article.save().then(
			result => { res.redirect(result.url); }, 
			err => { return next(err); }
		);
	}
]

exports.article_delete_get = (req, res, next) => {
	res.send("NOT IMPLEMENTED: Article delete GET.")
}

exports.article_delete_post = (req, res, next) => {
	res.send("NOT IMPLEMENTED: Article delete POST.")
}

exports.article_update_get = (req, res, next) => {
	res.send("NOT IMPLEMENTED: Article update GET.")
}

exports.article_update_post = (req, res, next) => {
	res.send("NOT IMPLEMENTED: Article update POST.")
}