/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

 	facebookConnect: function(req,res){
 		if(req.param('facebook_id')){
 			User.findOne({facebook_id:req.param('facebook_id')}).exec(function(err,user){
 				if(err) return res.status(400).end();
 				if(!user)
 				{
          User.create({facebook_id:req.param('facebook_id'),username:req.param('username')}, function userCreated(err, user){   // CREATE ACCOUNT
          	if(err){ console.log(err); return res.status(400).end();}    
          	res.status(200).json(user);
          });
      }
        else if(user.facebook_id){   // USER CREATED
        	res.status(200).json(user);
        }
        else return res.status(406).end();
    });
 		}
 	},

 	create:function(req, res){
 		User.findOne({req.param('username'), facebook_id:null}).exec(function(err,user){
 			if(user)
 				return res.status(400).send("Pseudo déjà utilisé");
 			else{

 				User.create(req.params.all()).exec(function(err,user){
 					if(err){
 						console.log(err);
 						return res.status(400).end();
 					}	
 					return res.status(200).json(user);

 				});
 			}
 		})
 	},

 	login:function(req, res){
 		User.findOne({username:req.param('username'),password:req.param('password')}).exec(function(err,user){
 			if(err){
 				console.log(err);
 				return res.status(400).end();
 			}
 			if(!user)
 				return res.status(406).end();
 			else
 				return res.status(200).json(user);
 		})
 	}
 };

