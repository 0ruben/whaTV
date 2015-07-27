/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

 	facebookConnect: function(req,res){
 		if(req.param('facebook_id')){
 			User.findOne({facebook_id:req.param('facebook_id')},function(err,user){
 				if(err) return res.status(404).end();
 				if(!user)
 				{
 					if(!req.param('email')){
 						var email = req.param('facebook_id')+"@facebook.com";
 					}
 					else
 						var email = req.param('email');
          User.create({email:email,facebook_id:req.param('facebook_id')}, function userCreated(err, user){   // CREATE ACCOUNT
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
 	}

 };

