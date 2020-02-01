var mongoose = require("mongoose");

var companySchema = mongoose.Schema({
    name: String,
    password: String

});

module.exports = mongoose.model("Company", companySchema);