const mongoose = require("mongoose");
const slugify = require("slugify");
const mongoosePaginate = require("mongoose-paginate-v2");
const MarkdownIt = require("markdown-it");
const plainText = require('markdown-it-plain-text');
const he = require("he");

const Schema = mongoose.Schema;
const Comment = require("../../models/blog/comment");

const md = new MarkdownIt();
md.use(plainText);

// article model schema
const ArticleSchema = new Schema({
	title: { type: String, required: true, maxlength: 40 },
	slug: { type: String, required: true, unique: true },
	subtitle: { type: String, maxlength: 40 },
	description: { type: String, maxlength: 300 },
	content: { type: String, required: true }
}, { 
	timestamps: { createdAt: "created_date", updatedAt: "updated_date" } 
});

// article model schema plugins
ArticleSchema.plugin(mongoosePaginate);

// article url virtual
ArticleSchema.virtual("url").get(function() {
	return `/writings/${this.slug}`;
});

// article comments virtual
ArticleSchema.virtual("comments", {
	ref: "Comment",
	localField: "_id",
	foreignField: "article"
});

// generate slug pre-validation
ArticleSchema.pre("validate", function(next) {
	this.slug = slugify(he.decode(this.title), { lower: true, strict: true });
	next();
});

// deletion cascade
ArticleSchema.pre("findOneAndDelete", async function(next) {
	const article = await this.model.findOne(this.getQuery());
	await Comment.deleteMany({ article: article._id });
	next();
});

// render markdown-parsed description
ArticleSchema.methods.renderDescription = function() {
	return md.renderInline(this.description);
}

// render inline markdown-parsed description
ArticleSchema.methods.renderDescriptionPlaintext = function() {
	md.renderInline(this.description);
	return md.plainText;
}

// render markdown-parsed content
ArticleSchema.methods.renderContent = function() {
	return md.render(this.content);
}

// render inline markdown-parsed content
ArticleSchema.methods.renderContentPreview = function() {
	md.renderInline(String(this.content).slice(0, 150));
	return md.plainText;
}

module.exports = mongoose.model("Article", ArticleSchema);