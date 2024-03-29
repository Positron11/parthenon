const express = require("express");

// custom middlware
const authMiddleware = require("../middleware/auth_middleware")

const router = express.Router();

// import controllers
const blog_controller = require("../controllers/blog/blog_controller");
const article_controller = require("../controllers/blog/article_controller");
const comment_controller = require("../controllers/blog/comment_controller");

// article list view
router.get("/", blog_controller.article_list);

// article create views
router.get("/create", authMiddleware.sessionAuthCheck("superuser"), article_controller.article_create_get);
router.post("/create", authMiddleware.sessionAuthCheck("superuser"), article_controller.article_create_post);

// article delete views
router.get("/:slug/delete", authMiddleware.sessionAuthCheck("superuser"), article_controller.article_delete_get);
router.post("/:slug/delete", authMiddleware.sessionAuthCheck("superuser"), article_controller.article_delete_post);

// article edit views
router.get("/:slug/edit", authMiddleware.sessionAuthCheck("superuser"), article_controller.article_update_get);
router.post("/:slug/edit", authMiddleware.sessionAuthCheck("superuser"), article_controller.article_update_post);

// article detail view
router.get("/:slug", blog_controller.article_detail);

// comment create method
router.post("/:slug/comment/create", authMiddleware.sessionAuthCheck(), comment_controller.comment_create);

// comment delete method
router.post("/:slug/comment/:id/delete", authMiddleware.sessionAuthCheck(), comment_controller.comment_delete);

// comment edit method
router.post("/:slug/comment/:id/edit", authMiddleware.sessionAuthCheck(), comment_controller.comment_edit);

module.exports = router;
