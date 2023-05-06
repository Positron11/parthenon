const Article = require("../../models/blog/article");
const Comment = require("../../models/blog/comment");

// article list view controller
exports.article_list = (req, res, next) => {
	// get all articles in reverse chronological order
	Article.find(null, "created_date title subtitle description slug").sort({ created_date: -1 }).then(
		result => {
			// render article list view
			res.render("blog/article_list", { 
				title: "Blog",
				articles: result	
			}); 
		}, 
		err => { return next(err); }
	);
}

// article detail view controller
exports.article_detail = (req, res, next) => {
	// get article by unique slug and populate with top-level comments
	Article.findOne({ slug: req.params.slug }).populate({ 
		path: "comments", 
		match: { parent: undefined }, 
		options: { sort: { created_date: -1 } } 
	}).then(
		result => {
			// if no articles found
			if (result === null) {
				const error = new Error("This article does not exist");
				error.status = 404;
				return next(error);
			}

			// render article detail view
			res.render("blog/article_detail", { 
				title: result.title,
				article: result	
			}); 
		}, 
		err => { return next(err); }
	);
}
