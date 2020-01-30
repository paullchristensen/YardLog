var express   = require("express");
var router    = express.Router();
var passport  = require("passport");
var User      = require("../models/user");


//ROOT ROUTE
router.get("/", function(req, res){
    res.render("landing");
});


// AUTH ROUTES
router.get("/register", function(req, res){
    
    //res.send("REGISTER HERE");
	res.render("register");
	
});

//handing user sign up
router.post("/register", function(req, res){
	
	var newUser = new User({username: req.body.username});
	
	User.register(newUser, req.body.password, function(err,user){
		if(err)
		{
			req.flash("error", err.message);
			return res.render("register");
		}
		else
		{
			passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to YelpCamp " + user.username );
                console.log("successful registration");
				res.redirect("/yards");
			});
		}
	});
	
});


//show login form
router.get("/login", function(req, res){
	res.render("login");
});

//handing login logic
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/yards",
		failureRedirect: "/login"
 	}),function(req, res){
	
});


router.get("/logout", function(req, res){
	
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/yards");
	
});


module.exports = router;