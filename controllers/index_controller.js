// home page controller
exports.index = (req, res, next) => {
	res.render("index/index", { title: "Home" });
}

// about page controller
exports.about = (req, res, next) => {
	res.render("index/about", { title: "About" });
}

// contact page controller
exports.contact = (req, res, next) => {
	res.render("index/contact", { title: "Contact" });
}