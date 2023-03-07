const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	title: { type: String, required: true, maxlength: 40 },
	slug: { type: String, required: true, unique: true },
	subtitle: { type: String, maxlength: 40 },
	description: { type: String, maxlength: 300 },
	content: { type: String, required: true }
}, { 
	timestamps: { createdAt: "created_date", updatedAt: "updated_date" } 
});

ArticleSchema.virtual("url").get(function() {
	return `/blog/article/${this.slug}`;
});

ArticleSchema.pre("validate", function(next) {
	this.slug = slugify(this.title, { lower: true });
	next();
});

module.exports = mongoose.model("Article", ArticleSchema);