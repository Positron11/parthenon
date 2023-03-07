var express = require("express");
var router = express.Router();

var blog_controller = require("../controllers/blog/blog_controller")
var article_controller = require("../controllers/blog/article_controller")

router.get("/", blog_controller.article_list);

router.get("/create", article_controller.article_create_get);
router.post("/create", article_controller.article_create_post);

router.get("/article/:slug/delete", article_controller.article_delete_get);
router.post("/article/:slug/delete", article_controller.article_delete_post);

router.get("/article/:slug/edit", article_controller.article_update_get);
router.post("/article/:slug/edit", article_controller.article_update_post);

router.get("/article/:slug", blog_controller.article_detail);

module.exports = router;
