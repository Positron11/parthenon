// check if user has required permissions
exports.sessionAuthCheck = function (status) {
	return function (req, res, next) {
		// if logged in...
		if (req.isAuthenticated()) {
			// if user doesn't have permissions, throw 403 error...
			if (status && !req.user.roles.includes(status)) {
				const error = new Error("You don't have permission to acess this page");
				error.status = 403;
				return next(error);
			} else { 
				// ...otherwise proceed to target
				return next(); 
			}

		// if not logged in...
		} else {
			// cache return to url
			req.session.returnTo = req.originalUrl || req.url
			// send to login page
			res.redirect("/login") 
		}
	}
}

// get authenticated user data
exports.sessionAuthData = function (req, res, next) {
	if (req.isAuthenticated()) { res.locals.user = req.user; } 
	return next();
}