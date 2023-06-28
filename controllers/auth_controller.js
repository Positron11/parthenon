// login view get method controller
exports.login_get = (req, res, next) => {
	if (req.query.next) { req.session.returnTo = req.query.next }
	res.render("auth/login", { title: "Log In" });
}

// login view post method controller
exports.login_post = (req, res, next) => {
	const returnTo = req.session.returnTo;
	req.session.returnTo = undefined;
	res.redirect(returnTo || "/");
}

// logout view controller
exports.logout = (req, res, next) => {
	req.logout();
	res.redirect(req.query.next);
}