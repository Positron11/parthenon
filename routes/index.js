const express = require("express");

const router = express.Router();

// import controllers
const index_controller = require("../controllers/index_controller")

// home page view
router.get("/", index_controller.index);

// about page view
router.get("/about", index_controller.about);

// contact page view
router.get("/contact", index_controller.contact);

// bulletins page view
router.get("/bulletins", index_controller.bulletins);

module.exports = router;
