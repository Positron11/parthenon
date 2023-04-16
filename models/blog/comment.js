const mongoose = require("mongoose");
const MarkdownIt = require("markdown-it");

const Schema = mongoose.Schema;

const md = new MarkdownIt();

// comment model schema
const CommentSchema = new Schema({
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
CommentSchema.pre("findOneAndDelete", async function(next) {
	const comment = await this.model.findOne(this.getQuery());
	for (const reply of comment.replies) {
		await this.model.findOneAndDelete({ _id: reply._id });
	}; next();
});

// render markdown-parsed content
CommentSchema.methods.renderContent = function() {
	return md.render(this.content);
}

module.exports = mongoose.model("Comment", CommentSchema);