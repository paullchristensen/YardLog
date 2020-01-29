var mongoose   = require("mongoose");
var Yard       = require("./models/yard");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Jim Farm",
        area: "Mallaig",
        latitude: 54.188373,
        longitude: -111.351075,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        landOwner: "James Christensen",
        inUse: true 
    },
    {
        name: "Viel",
        area: "Mallaig",
        latitude: 54.205986,
        longitude: -111.378857,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        landOwner: "James Christensen",
        inUse: true 
    },
    {
        name: "South Norbert",
        area: "Mallaig",
        latitude: 54.162864,
        longitude: -111.328997,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        landOwner: "",
        inUse: true 
    }
]

function seedDB(){
    //Remove all yards
    Yard.remove({}, function(err){
         if(err){
             console.log(err);
         }
         console.log("removed yards!");

          Comment.remove({}, function(err) {
               if(err){
                   console.log(err);
               }
               console.log("removed comments!");
            //add a few yards
             data.forEach(function(seed){
                 Yard.create(seed, function(err, yard){
                     if(err){
                         console.log(err)
                     } else {
                         console.log("added a yard");
                        // create a comment
                          Comment.create(
                              {
                                  text: "This place is great, but I wish there was internet",
                        //          author: "Homer"
                              }, function(err, comment){
                                  if(err){
                                    console.log(err);
                                  } else {
                                      yard.comments.push(comment);
                                      yard.save();
  
                                }
                          });
                     }
                 });
            });
        }); 
     });
  
 }
  
 module.exports = seedDB;