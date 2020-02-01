var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: {type: Boolean, default: false},
    company: {
        id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Company"
        }
     },
});

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);