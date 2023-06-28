var express = require("express");
const passport = require('passport');

// custom middlware
const authMiddleware = require("../middleware/auth_middleware")

var router = express.Router();

// import controllers
const auth_controller = require("../controllers/auth_controller");

// login views
router.get("/login", auth_controller.login_get);
router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), auth_controller.login_post);

// logout views
router.post("/logout", auth_controller.logout);

module.exports = router;