const passport = require('passport');
const flash = require("express-flash");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");

// login view get method controller
exports.registration_get = (req, res, next) => {
	if (req.query.next) { req.session.returnTo = req.query.next }
	res.render("auth/registration", { title: "Register" });
}

// login view post method controller
exports.registration_post = [
	body("username", "Invalid username.").trim().isLength({ min: 3, max: 20 }).custom(value => {
		return User.findOne({ username: value }).then(result => { 
			return result ? Promise.reject("A user with this name already exists.") : true 
		}) 
	}),
	body("password", "Password must be at least 8 characters long.").isLength({ min: 8 }),
	body("captcha", "Incorrect captcha response.").trim().custom((value, {req, loc, path}) => {
		return value == eval(req.body.captchaQuestion) || Promise.reject();
	}),
	
	(req, res, next) => {
		const errors = validationResult(req);

		// get and clear return to url
		const returnTo = req.session.returnTo;
		req.session.returnTo = undefined;

		// if errors...
		if (!errors.isEmpty()) {
			// flash error message
			req.flash("error", errors.array()[0].msg);

			// re-render form with data
			res.render("auth/registration", { title: "Register" }); 
			return;
		}

		// create new user
		User.register({
			username: req.body.username,
			active: true
		}, req.body.password).then( // login and redirect to return url
			result => {
				passport.authenticate("local")(req, res, () => {
					req.flash("info", `Welcome, ${result.username}`);
					res.redirect(returnTo || "/");
				});
			}, 
			err => { return next(err); }
		);
	}
]

// login view get method controller
exports.login_get = (req, res, next) => {
	if (req.query.next) { req.session.returnTo = req.query.next }
	res.render("auth/login", { title: "Log In" });
}

// login view post method controller
exports.login_post = (req, res, next) => {
	const returnTo = req.session.returnTo;
	req.session.returnTo = undefined;
	req.flash("info", `Welcome back, ${req.user.username}.`);
	res.redirect(returnTo || "/");
}

// logout view controller
exports.logout = (req, res, next) => {
	req.flash("info", `Until next time, ${req.user.username}.`);
	req.logout();
	res.redirect(req.query.next);
}