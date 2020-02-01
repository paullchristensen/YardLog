var express   = require("express");
var router    = express.Router();
var Yard      = require("../models/yard");
var Company    = require("../models/company");
var middleware = require("../middleware/index.js");


// INDEX ROUTE
router.get("/yards", function(req, res){

	//Find yards for the logged in user
	if( req.user && req.user.company)
	{
		
		Company.findById(req.user.company.id, function(err, foundCompany){
		if(err)
			console.log(err);
		else{

			Yard.find({"company.companyname": foundCompany.name}, function(err, allYards){
				if(err)
					console.log(err);
				else{
					res.render("yards/index", {yards: allYards});			
				}
			});
			}
		});
	}
	else
	{
		res.render("yards/index",  {yards: null});	
	}
});

//NEW ROUTE
router.get("/yards/new", middleware.isLoggedIn, function(req, res){
    res.render("yards/new.ejs");
});

//CREATE ROUTE
router.post("/yards",  middleware.isLoggedIn, function(req, res){
	
	var name = req.body.name;
	var area = req.body.area;
	var latitude = req.body.latitude;
	var longitude = req.body.longitude;
	var landOwner = req.body.landOwner;
	var desc = req.body.description;
	
	var newYard = {name: name,area: area , latitude: latitude, longitude: longitude, landOwner: landOwner, description: desc}

	Yard.create(newYard, function(err, newlyCreated){
			if(err)
				console.log(err);
			else{
				console.log("Current User: " + req.user);
				console.log("Company: " +  req.user.company);

				Company.findById(req.user.company.id, function(err, foundCompany){
				 	if(err)
				 		console.log(err);
				 	else
				 	{
				 		newlyCreated.company.id = req.user.company.id;
				 		newlyCreated.company.companyname = foundCompany.name;
						newlyCreated.save();
				 	}
				 });
				res.redirect("/yards");
			}
		});
	
	
});


// SHOW ROUTE
router.get("/yards/:id", middleware.isLoggedIn, function(req, res){
	
	Yard.findById(req.params.id).populate("comments").exec(function(err, foundYard){
		if(err)
			console.log(err);
		else
		{
			res.render("yards/show", {yard: foundYard});
		}
	});

});

// EDIT ROUTE
router.get("/yards/:id/edit", middleware.isLoggedIn, function(req, res){
	
	Yard.findById(req.params.id, function(err, foundYard){
		res.render("yards/edit", {yard: foundYard});
	});
});

// UPDATE YARD ROUTE
router.put("/yards/:id", middleware.isLoggedIn, function(req, res){
	
	//req.body.campground.body = req.sanitize(req.body.blog.body);
	
	Yard.findByIdAndUpdate(req.params.id, req.body.yard , function(err, foundCampground){
	if(err)
		res.redirect("/yards");
	else
	{
		res.redirect("/yards/"+ req.params.id);
	}
	});
});


//DELETE ROUTE
router.delete("/yards/:id", middleware.isLoggedIn, function(req, res){
	
	Yard.findByIdAndRemove(req.params.id, function(err){
		if(err)
			res.redirect("/yards");
		else
		{
			res.redirect("/yards");
		}
	});
});

module.exports = router;