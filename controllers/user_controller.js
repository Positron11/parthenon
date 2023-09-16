const { body, validationResult } = require("express-validator");

const User = require("../models/user");
const Comment = require("../models/blog/comment");

// account view get method controller
exports.account_get = (req, res, next) => { res.render("user/account", { title: "Account" }); }
 
// user password update method
exports.user_update_password = [
	body("oldpass", "Incorrect password.").custom((value, { req, loc, path }) => {
		return User.findOne({ _id: req.user._id }).then(async result => {
			const error = (await result.authenticate(value)).error;
			return error ? Promise.reject("Incorrect password") : true;
		})
	}),
	body("newpass", "Password must be at least 8 characters long.").isLength({ min: 8 }).custom((value, {req, loc, path}) => {
		return value == req.body.confirmpass || Promise.reject("Slow down, your password confirmation doesn't match.");
	}),


	(req, res, next) => {
		const errors = validationResult(req);

		// if errors...
		if (!errors.isEmpty()) {
			// flash error message
			req.flash("error", errors.array()[0].msg);

			// redirect to account page and jump to form
			res.redirect("/account#passwordFormHeader"); 
			return;
		}

		// find user
		User.findOne({ _id: req.params.id }).then(
			async result => {
				// check if user is current user
				if (!req.user._id.equals(result._id)) { 
					const error = new Error("You are not the user whose password you are trying to update");
					error.status = 403;
					return next(error);
				}

				// update password
				await result.changePassword(req.body.oldpass, req.body.newpass);

				// redirect to account page
				req.flash("success", "Password updated");
				res.redirect("/account"); 
			},
			err => { return next(err); }
		);
	}
]

// user deletion method
exports.user_delete = [
	body("password", "Incorrect password.").custom((value, { req, loc, path }) => {
		return User.findOne({ _id: req.user._id }).then(async result => {
			const error = (await result.authenticate(value)).error;
			return error ? Promise.reject("Incorrect password") : true;
		})
	}),

	(req, res, next) => {
		const errors = validationResult(req);

		// if errors...
		if (!errors.isEmpty()) {
			// flash error message
			req.flash("error", errors.array()[0].msg);

			// redirect to account page and jump to form
			res.redirect("/account#userDeleteFormHeader"); 
			return;
		}

		// find user
		User.findOne({ _id: req.params.id }).then(
			async result => {
				// check if user is current user
				if (!req.user._id.equals(result._id)) { 
					const error = new Error("We'll allow suicide, but we draw the line at murder");
					error.status = 403;
					return next(error);
				}

				// delete user
				await result.deleteOne();

				// redirect to home
				req.flash("info", `Farewell, ${result.username}`);
				res.redirect("/"); 
			},
			err => { return next(err); }
		);
	}
]

// profile view get method controller
exports.profile = (req, res, next) => {
	User.findOne({ "username": req.params.username }).then(
		user => {
			// if no user found
			if (user === null) {
				const error = new Error(`No user by the name of ${req.params.username} exists`);
				error.status = 404;
				return next(error);
			}

			Comment.find({ "author": user._id }, {}, { sort: { "created_date": -1 } })
				.populate({ path: "article", select: "slug title" })
				.populate({ path: "parent", select: "content" }).then(
				comments => {
					res.render("user/profile", { 
						title: user.username,
						profilee: user,
						comments: comments 
					}); 
				},
				err => { return next(err); }
			);
		},
		err => { return next(err); }
	);
}