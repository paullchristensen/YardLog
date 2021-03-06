var mongoose = require("mongoose");

var yardSchema = new mongoose.Schema({
	name: String,
    area: String,
    latitude: Number,
    longitude: Number,
    hives: Number,
    description: String,
    landOwner: String,
    inUse: Boolean,
    created: {type: Date, default: Date.now},
    company: {
        id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Company"
        },
        companyname: String
    },
    author: {
        id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
        },
        username: String
     },
    comments:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
        }
    ]
});

var Yard = mongoose.model("Yard", yardSchema);

module.exports = mongoose.model("Yard", yardSchema);