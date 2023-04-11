const { body, validationResult } = require("express-validator");
const slugify = require("slugify");

const Article = require("../../models/blog/article");

// article create view get method controller
exports.article_create_get = (req, res, next) => {
	// render article editor view
	res.render("blog/article_editor", { 
		title: "Create Article",
		action: "Create"
	});
}

// article create view post method controller
exports.article_create_post = [
	body("title", "Invalid title.").trim().isLength({ min: 1, max: 40 }).custom(value => { 
		return Article.findOne({ slug: slugify(value, { lower: true, strict: true }) }).then(result => { 
			return result ? Promise.reject("An article with this title already exists.") : true 
		}) 
	}).escape(),
	
	body("subtitle", "Invalid subtitle.").trim().isLength({ min: 1, max: 40 }).escape(),
	body("description", "Invalid description.").trim().isLength({ min: 1, max: 300 }).escape(), 
	body("content", "Invalid content.").trim().isLength({ min: 1 }).escape(),
		
	(req, res, next) => {
		const errors = validationResult(req);

		// if errors, re-render form with data
		if (!errors.isEmpty()) {
			res.render("blog/article_editor", {
				title: "Create Article",
				action: "Create",
				form_data: req.body,
				errors: errors.array()
			}); return;
		}

		// create new article instance
		const article = new Article({ 
			title: req.body.title,
			subtitle: req.body.subtitle,
			description: req.body.description,
			content: req.body.content
		});
		
		// save new article instance
		article.save().then(
			result => { res.redirect(result.url); }, 
			err => { return next(err); }
		);
	}
]

// article delete view get method controller
exports.article_delete_get = (req, res, next) => {
	// get article by unique slug
	Article.findOne({ slug: req.params.slug }).then(
		result => {
			// if article not found
			if (result === null) {
				const error = new Error("This article does not exist");
				error.status = 404;
				return next(error);
			}

			// render article delete view
			res.render("blog/article_delete", {
				title: "Delete Article",
				article: result
			});
		},
		err => { return next(err); }
	);
}

// article delete view post method controller
exports.article_delete_post = (req, res, next) => {
	// get article by unique slug and delete it
	Article.findOneAndDelete({ slug: req.params.slug }).then(
		result => {	
			// if article does not exist
			if (result === null) {
				const error = new Error("This article does not exist");
				error.status = 404;
				return next(error);
			}

			// go back to article list view
			res.redirect("/blog") 
		},
		err => { return next(err); }
	);
}

// article update view get method controller
exports.article_update_get = (req, res, next) => {
	// get article by unique slug
	Article.findOne({ slug: req.params.slug }).then(
		result => {
			// if article not found
			if (result === null) {
				const error = new Error("This article does not exist");
				error.status = 404;
				return next(error);
			}

			// render article editor view
			res.render("blog/article_editor", { 
				title: "Edit Article",
				action: "Update",
				form_data: result
			});
		},
		err => { return next(err); }
	);
}

// article update view post method controller
exports.article_update_post = [
	body("title", "Invalid title.").trim().isLength({ min: 1, max: 40 }).custom((value, { req }) => { 
		const slug = slugify(value, { lower: true, strict: true });
		return slug === req.params.slug ? true : Article.findOne({ slug: slug }).then(result => { 
			return result ? Promise.reject("An article with this title already exists.") : true 
		}) 
	}).escape(),
	
	body("title", "Invalid title.").trim().isLength({ min: 1, max: 40 }).escape(),
	body("subtitle", "Invalid subtitle.").trim().isLength({ min: 1, max: 40 }).escape(),
	body("description", "Invalid description.").trim().isLength({ min: 1, max: 300 }).escape(), 
	body("content", "Invalid content.").trim().isLength({ min: 1 }).escape(),

	(req, res, next) => {
		const errors = validationResult(req);

		// if errors, re-render form with data
		if (!errors.isEmpty()) {
			res.render("blog/article_editor", {
				title: "Edit Article",
				action: "Update",
				form_data: req.body,
				errors: errors.array()
			}); return;
		}

		Article.findOne({ slug: req.params.slug }).then(
			result => { 
				// if article does not exist
				if (result === null) {
					const error = new Error("This article does not exist");
					error.status = 404;
					return next(error);
				}
				
				// update all fields
				result.title = req.body.title;
				result.subtitle = req.body.subtitle;
				result.description = req.body.description;
				result.content = req.body.content;

				// save article and go to article url
				result.save().then(
					result => { res.redirect(result.url); },
					err => { return next(err); }
				);
			 }, 
			err => { return next(err); }
		);
	}
]