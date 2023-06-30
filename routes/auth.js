var express = require("express");
const passport = require('passport');

var router = express.Router();

// import controllers
const auth_controller = require("../controllers/auth_controller");

// registration views
router.get("/register", auth_controller.registration_get);
router.post("/register", auth_controller.registration_post);

// login views
router.get("/login", auth_controller.login_get);
router.post("/login", passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), auth_controller.login_post);

// logout views
router.post("/logout", auth_controller.logout);

module.exports = router;