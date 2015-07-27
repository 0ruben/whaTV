/**
 * UserkeywordController
 *
 * @description :: Server-side logic for managing userkeywords
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {


 	bindKeyword: function(req, res){
 		var keywordID;
 		Keyword.findOne({str:req.param('keyword'), is_standard:}).exec(function(err, keyword){
 			if(!keyword){
 				Keyword.create({keyword:req.param('keyword')}).exec(function(err, keyword){
 					keywordID = keyword.id;
 				});
 			}
 			else
 				keywordID = keyword.id;

 			UserKeyword.create({user:req.param('user'),keyword:keywordID}).exec(function(err, keyword){
 				if(err)
 					return res.status(400).end();
 				else
 					return res.status(200).end();
 			});
 		});
 	}

 };

