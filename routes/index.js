const CyclicDb = require("@cyclic.sh/dynamodb");
const db = CyclicDb("dead-blue-squirrel-ringCyclicDB");

var express = require("express");
var router = express.Router();

router.get("/", async function(req, res, next) {
	var header_content = (await db.collection("static-content").get("index")).props.content;
	res.render("index", { 
		title: "Home", 
		header_content: header_content 
	});
});

router.get("/explore", async function(req, res, next) {
	var header_content = (await db.collection("static-content").get("about")).props.content;
	var collection = await db.collection("blog-posts");
	var postlist = (await collection.list()).results;
	var posts = await Promise.all(postlist.map(async ({ key }) => (await collection.get(key)).props));
	res.render("explore", { 
		title: "Explore", 
		header_content: header_content, 
		posts: posts 
	});
});

router.get("/about", async function(req, res, next) {
	var header_content = (await db.collection("static-content").get("about")).props.content;
	res.render("about", { 
		title: "About", 
		header_content: header_content 
	});
});

router.get("/contact", async function(req, res, next) {
	var header_content = (await db.collection("static-content").get("contact")).props.content;
	res.render("contact", { 
		title: "Contact", 
		header_content: header_content
	});
});

module.exports = router;
