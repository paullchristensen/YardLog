var express    = require("express");
var bodyParser = require("body-parser");

var app     = express();


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); //so that .ejs is not needed in render page
app.use(express.static("public"));




app.get("/", function(req, res){
    res.render("landing");
});








app.listen(3000, function(){
    console.log("YardLog Server started!!!");
});