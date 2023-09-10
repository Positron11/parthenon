const Bulletin = require("../models/bulletin");

// home page controller
exports.index = (req, res, next) => {
	const cutoffDate = new Date();
	cutoffDate.setMonth(cutoffDate.getMonth() - 1);
	Bulletin.findOne({ "created_date": { "$gt": cutoffDate } }, {}, { sort: { 'created_date' : -1 } }).then(
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

// bulletins page controller
exports.bulletins = (req, res, next) => {
	Bulletin.find({}, {}, { sort: { 'created_date' : -1 } }).then(
		result => {
			res.render("index/bulletins", { 
				title: "Bulletins",
				bulletins: result
			});
		}, 
		err => { return next(err); }
	);
}