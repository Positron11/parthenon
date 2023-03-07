const Article = require("../../models/blog/article");

exports.article_list = (req, res, next) => {
	Article.find().sort({ updated_date: -1 }).then(
		result => {
			res.render("blog/index", { 
				title: "Blog",
				articles: result	
			}); 
		}, 
		err => { return next(err); }
	);
}

exports.article_detail = (req, res, next) => {
	Article.findOne({ slug: req.params.slug }).then(
		result => {
			if (result === null) {
				const error = new Error("This article does not exist");
				error.status = 404;
				return next(error);
			}

			res.render("blog/article", { 
				title: result.title,
				article: result	
			}); 
		}, 
		err => { return next(err); }
	);
}
