var express               = require("express");
var app                   = express();
var bodyParser            = require("body-parser");
var mongoose              = require("mongoose");
var methodOverride        = require("method-override");
var seedDB                = require("./seeds");
var passport              = require("passport");
var	LocalStrategy         = require("passport-local");
var	passportLocalMongoose = require("passport-local-mongoose");
var indexRoutes           = require("./routes/index");
var yardRoutes            = require("./routes/yards");
var commentRoutes         = require("./routes/comments");
var adminRoutes           = require("./routes/admin");
var flash                 = require("connect-flash");
var User                  = require("./models/user");


//mongoose.connect("mongodb://localhost:27017/yardlog", {useNewUrlParser: true, useUnifiedTopology: true});


mongoose.connect("mongodb+srv://Paul:123@cluster0-pxjjp.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect("mongodb+srv://Paul:123@cluster0-pxjjp.mongodb.net/test?retryWrites=true&w=majority",{
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useCreateIndex: true
// }).then(()=>{
// 	console.log('ERROR:', err.message);
// }).catch(err=>{
// 	console.log(err);
// });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); //so that .ejs is not needed in render page
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');

//seedDB(); //seed the database

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Christensen Bee Ranch",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});


//ROUTES
app.use(adminRoutes);
app.use(indexRoutes);
app.use(yardRoutes);
app.use(commentRoutes);


app.listen(3000, function(){
    console.log("YardLog Server started!!!");
});