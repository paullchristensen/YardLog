var express   = require("express");
var router    = express.Router();
var Yard      = require("../models/yard");


// INDEX ROUTE
router.get("/yards", function(req, res){
	Yard.find({}, function(err, allYards){
		if(err)
			console.log(err);
		else{
			res.render("yards/index", {yards: allYards});			
		}
	});
});

//NEW ROUTE
router.get("/yards/new", function(req, res){
    res.render("yards/new.ejs");
});

//CREATE ROUTE
router.post("/yards",  function(req, res){
	
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
			res.redirect("/yards");
		}
	});
	
});


// SHOW ROUTE
router.get("/yards/:id", function(req, res){
	
	//Yard.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
	Yard.findById(req.params.id, function(err, foundYard){
		if(err)
			console.log(err);
		else
		{
			res.render("yards/show", {yard: foundYard});
		}
	});

});

// EDIT ROUTE
router.get("/yards/:id/edit", function(req, res){
	
	Yard.findById(req.params.id, function(err, foundYard){
		res.render("yards/edit", {yard: foundYard});
	});
});

// UPDATE CAMPGROUND ROUTE
router.put("/yards/:id", function(req, res){
	
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
router.delete("/yards/:id", function(req, res){
	
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