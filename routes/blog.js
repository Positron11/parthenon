const express = require("express");

const router = express.Router();

// import controllers
const blog_controller = require("../controllers/blog/blog_controller");
const article_controller = require("../controllers/blog/article_controller");
const comment_controller = require("../controllers/blog/comment_controller");

// article list view
router.get("/", blog_controller.article_list);

// article create views
router.get("/create", article_controller.article_create_get);
router.post("/create", article_controller.article_create_post);

// article delete views
router.get("/article/:slug/delete", article_controller.article_delete_get);
router.post("/article/:slug/delete", article_controller.article_delete_post);

// article edit views
router.get("/article/:slug/edit", article_controller.article_update_get);
router.post("/article/:slug/edit", article_controller.article_update_post);

// article detail view
router.get("/article/:slug", blog_controller.article_detail);

// comment create method
router.post("/comment/create", comment_controller.comment_create);

// comment delete method
router.post("/comment/:id/delete", comment_controller.comment_delete);

// comment edit method
router.post("/comment/:id/edit", comment_controller.comment_edit);

module.exports = router;
