var express   = require("express");
var router    = express.Router();
var User      = require("../models/user");
var passwordHash = require('password-hash');
var passport  = require("passport");

//ADMIN ROUTE
router.get("/adminlogin", function(req, res){
    res.render("adminlogin");
});


router.post('/adminlogin',passport.authenticate('local', {failureRedirect: "/adminlogin", failureFlash: true }),function(req, res) {


    res.redirect("/adminsettings");
    // if(req.user.isAdmin)
    // {
    //     return res.render("adminsettings",  {success: "Admin login sucessful"});
    // }
    // else
    // {
    //     return res.render("adminlogin",  {error: "You are not an administrator"});
    // }

  });


router.get("/adminsettings", function(req, res){
  
    if(req.user)
    {
        console.log("Is logged in");
        if(req.user.isAdmin)
            return res.render("adminsettings",  {success: "Admin login sucessful"});
        else
            return res.render("adminlogin",  {error: "You are not an administrator"});
    }
    else
    {
        console.log("Is not logged in");
        req.flash("error",  "You are not a logged in administrator");
        res.redirect("/adminlogin");
    }
});
 // req.user



module.exports = router;