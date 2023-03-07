const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

// article model schema
const ArticleSchema = new Schema({
	title: { type: String, required: true, maxlength: 40 },
	slug: { type: String, required: true, unique: true },
	subtitle: { type: String, required: true, maxlength: 40 },
	description: { type: String, required: true, maxlength: 300 },
	content: { type: String, required: true }
}, { 
	timestamps: { createdAt: "created_date", updatedAt: "updated_date" } 
});

// article url virtual
ArticleSchema.virtual("url").get(function() {
	return `/blog/article/${this.slug}`;
});

// generate slug pre-validation
ArticleSchema.pre("validate", function(next) {
	this.slug = slugify(this.title, { lower: true, strict: true });
	next();
});

module.exports = mongoose.model("Article", ArticleSchema);