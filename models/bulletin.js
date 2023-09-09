const mongoose = require("mongoose");
const MarkdownIt = require("markdown-it");

const Schema = mongoose.Schema;

const md = new MarkdownIt();

// bulletin model schema
const BulletinSchema = new Schema({
	content: { type: String, required: true },
}, { 
	timestamps: { createdAt: "created_date" } 
});

// render markdown-parsed content
BulletinSchema.methods.renderContent = function() {
	return md.render(this.content);
}

module.exports = mongoose.model("Bulletin", BulletinSchema);