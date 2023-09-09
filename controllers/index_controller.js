const Bulletin = require("../models/bulletin");

// home page controller
exports.index = (req, res, next) => {
	Bulletin.findOne({}, {}, { sort: { 'created_at' : -1 } }).then(
		result => {
			res.render("index/index", { 
				title: "Home",
				bulletin: result
			});
		}, 
		err => { return next(err); }
	);
}

// about page controller
exports.about = (req, res, next) => {
	res.render("index/about", { title: "About" });
}

// contact page controller
exports.contact = (req, res, next) => {
	res.render("index/contact", { title: "Contact" });
}