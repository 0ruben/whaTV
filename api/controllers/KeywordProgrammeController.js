/**
 * KeywordprogrammeController
 *
 * @description :: Server-side logic for managing keywordprogrammes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

 	addKeyword:function(req,res){
 		var kw = ToolsService.clean(req.param("kw"));
 		Keyword.findOne({keyword:kw}).exec(function(err, keyword){
 			if(err){
 				console.log(err);
 				return res.status(400).end();
 			}
 			else if (!keyword){
 				Keyword.create({user: req.param('user'), str:req.param('kw')}).exec(function(err, keyword){
 					Programme.query("select id from programme where titre like '%"+kw+"%' or soustitre like '%"+kw+"%' or description like '%"+kw+"%' or casting like '%"+kw+"%'").exec(function(err, programmes){
 						programmes.forEach(function(programme){
 							KeywordProgramme.create({keyword:keyword.id, programme:programme.id});
 						});
 					});
 				});
 			}
 		})

 	}
};

