var express   = require("express");
var router    = express.Router();
var passport  = require("passport");
var User      = require("../models/user");
var Company      = require("../models/company");
var passwordHash = require('password-hash');


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
	
	//Check that company exists
	var companyName = req.body.companyname;
	var companyPassword = req.body.companypassword;
	Company.findOne({name: companyName}, function(err, company)
	{
		 if(err){
	
	 	 	return res.render("register",  {error: err.message});
		 }
		 else
		 {
			 //Verify company password
		 	if(company && passwordHash.verify(companyPassword, company.password))
			{
				//Register new user
			    var newUser = new User({username: req.body.username});
				User.register(newUser, req.body.password, function(err,user){
					if(err)
					{
						//req.flash("error", err.message);
						return res.render("register", {error: err.message});
					}
					else
					{
						passport.authenticate("local")(req, res, function(){
							//Associate user with company
							user.company.id = company._id;
							user.save();
							req.flash("success", "Welcome to YardLog " + user.username );
							console.log("successful registration");
							res.redirect("/yards");
						});
					}
				});
		 	}
		 	else
			{
				return res.render("register", {error: "Invalid company login!"});
		 	
			}
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