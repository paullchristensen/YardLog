var mongoose = require("mongoose");

var yardSchema = new mongoose.Schema({
	name: String,
    area: String,
    latitude: Number,
    longitude: Number,
    description: String,
    landOwner: String,
    inUse: Boolean,
    created: {type: Date, default: Date.now},
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