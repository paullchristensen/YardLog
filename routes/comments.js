var express   = require("express");
var router    = express.Router({mergeParams: true});
var Yard = require("../models/yard");
var Comment = require("../models/comment");
//var middleware = require("../middleware/index.js");



// NEW COMMENT ROUTE
router.get("/yards/:id/comments/new", function(req, res){
	Yard.findById(req.params.id, function(err, yard){
		if(err)
			console.log(err);
		else{
			res.render("comments/new", {yard: yard});
		}
	});
});


// COMMENTS CREATE ROUTE
router.post("/yards/:id/comments", function(req, res){
	
	Yard.findById(req.params.id, function(err, yard){
		if(err)
		{
			//req.flash("error", "Something went wrong");
			res.redirect("/yard");	
		}
		else{
           
			 Comment.create(req.body.comment, function (err, comment){
			 	if(err)	{
			 		console.log(err);
			 	}
			 	else{
					//add username and id to comment
					//req.user.username
					//comment.author.id = req.user._id;
                    //comment.author.username = req.user.username;
                    console.log(comment);
					comment.save();
			 		yard.comments.push(comment);
			 		yard.save();
					//req.flash("sucess", "Successfully added comment");
					res.redirect('/yards/' + yard._id);
			 	}
			 });
		}
	});
	
});


// // EDIT COMMENT ROUTE
//  router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){

// 	 Comment.findById(req.params.comment_id, function(err, foundComment){
// 		 if(err)
// 			 res.redirect("back");
// 		 else{
// 			  res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});	

// 		 }
// 	 });
	
//  });

// // UPDATE COMMENT ROUTE
//  router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	
// // 	//req.body.campground.body = req.sanitize(req.body.blog.body);
	
// 	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment , function(err, foundComment){
// 	if(err)
//  		res.redirect("/back");
//  	{
//  		res.redirect("/campgrounds/"+ req.params.id);
//  	}
//  	});
//  });


//  //DELETE COMMENT ROUTE
//  router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	
//   	Comment.findByIdAndRemove(req.params.comment_id, function(err){
// 		if(err)
//  			res.redirect("/back");
//  		else
//  		{
// 			req.flash("success", "Comments deleted");
//  			res.redirect("/campgrounds/"+ req.params.id);
// 		}
//  	});
//  });





module.exports = router;