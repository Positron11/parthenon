const mongoose = require("mongoose");
const MarkdownIt = require("markdown-it");
const plainText = require('markdown-it-plain-text');

const Schema = mongoose.Schema;

const md = new MarkdownIt();
md.use(plainText);

// comment model schema
const CommentSchema = new Schema({
	author: { type: Schema.Types.ObjectId, ref: "User", autopopulate: { select: "username" } },
	article: { type: Schema.Types.ObjectId, ref: "Article" },
	parent: { type: Schema.Types.ObjectId, ref: "Comment", index: true },
	content: { type: String, required: true },
}, { 
	timestamps: { createdAt: "created_date", updatedAt: "updated_date" } 
});

// comment replies virtual
CommentSchema.virtual("replies", {
	ref: "Comment",
	localField: "_id",
	foreignField: "parent",
	autopopulate: { options: { sort: { created_date: -1 } } }
})

// autopopulate plugin
CommentSchema.plugin(require("mongoose-autopopulate"))

// deletion cascade
CommentSchema.pre("deleteOne", { document: true, query: false }, async function(next) {
	for (const reply of this.replies) {
		await reply.deleteOne();
	}; next();
});

// render markdown-parsed content
CommentSchema.methods.renderContent = function() {
	return md.render(this.content);
}

// render plaintext content
CommentSchema.methods.renderContentPlaintext = function() {
	md.renderInline(this.content);
	return md.plainText;
}

module.exports = mongoose.model("Comment", CommentSchema);