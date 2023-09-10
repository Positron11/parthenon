var express = require("express");

// custom middlware
const authMiddleware = require("../middleware/auth_middleware")

var router = express.Router();

// import controllers
const user_controller = require("../controllers/user_controller");

// account views
router.get("/account", authMiddleware.sessionAuthCheck(), user_controller.account_get);

// user deletion view
router.post("/user/:id/delete", authMiddleware.sessionAuthCheck(), user_controller.user_delete);

// user password update view
router.post("/user/:id/update-password", authMiddleware.sessionAuthCheck(), user_controller.user_update_password);

// profile views
router.get("/users/:username", user_controller.profile);

module.exports = router;