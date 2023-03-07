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
	Article.findOne({ slug: req.params.slug }).then(
		result => {
			if (result === null) {
				const error = new Error("This article does not exist");
				error.status = 404;
				return next(error);
			}

			res.render("blog/article_delete", {
				title: "Delete Article",
				article: result
			});
		},
		err => { return next(err); }
	);
}

exports.article_delete_post = (req, res, next) => {
	Article.findOneAndDelete({ slug: req.params.slug }).then(
		result => {	res.redirect("/blog") },
		err => { return next(err); }
	);
}

exports.article_update_get = (req, res, next) => {
	Article.findOne({ slug: req.params.slug }).then(
		result => {
			if (result === null) {
				const error = new Error("This article does not exist");
				error.status = 404;
				return next(error);
			}

			res.render("blog/article_editor", { 
				title: "Edit Article",
				form_data: result
			});
		},
		err => { return next(err); }
	);
}

exports.article_update_post = [
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

		Article.findOne({ slug: req.params.slug }).then(
			result => { 
				if (result === null) {
					const error = new Error("This article does not exist");
					error.status = 404;
					return next(error);
				}
				
				result.title = req.body.title;
				result.subtitle = req.body.subtitle;
				result.description = req.body.description;
				result.content = req.body.content;

				result.save().then(
					result => { res.redirect(result.url); },
					err => { return next(err); }
				);
			 }, 
			err => { return next(err); }
		);
	}
]