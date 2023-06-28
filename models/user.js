const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

// user model schema
const UserSchema = new Schema({
	roles: { type: Array }
}, { 
	timestamps: { createdAt: "joining_date" } 
});

// passport plugin
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);