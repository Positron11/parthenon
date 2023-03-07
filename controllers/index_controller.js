// home page controller
exports.index = (req, res, next) => {
	res.render("index", { title: "Home" });
}

// about page controller
exports.about = (req, res, next) => {
	res.render("about", { title: "About" });
}

// contact page controller
exports.contact = (req, res, next) => {
	res.render("contact", { title: "Contact" });
}