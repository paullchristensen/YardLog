var express           = require("express");
var bodyParser        = require("body-parser");
var indexRoutes       = require("./routes/index");
var yardRoutes        = require("./routes/yards");
var mongoose          = require("mongoose");
var methodOverride    = require("method-override");
var seedDB            = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yardlog", {useNewUrlParser: true, useUnifiedTopology: true});

var app     = express();


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); //so that .ejs is not needed in render page
app.use(express.static("public"));
app.use(methodOverride("_method"));

seedDB(); //seed the database

//ROUTES
app.use(indexRoutes);
app.use(yardRoutes);





app.listen(3000, function(){
    console.log("YardLog Server started!!!");
});