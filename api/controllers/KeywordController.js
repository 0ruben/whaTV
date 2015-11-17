/**
 * KeywordController
 *
 * @description :: Server-side logic for managing keywords
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	addKeyword:function(req,res){
 		var kw = ToolsService.clean(req.param("kw"));
 		Keyword.create({user: req.param('user'), str:req.param('kw')}).exec(function(err, keyword){
 			Programme.query("select id from programme where titre like '%"+kw+"%' or soustitre like '%"+kw+"%' or description like '%"+kw+"%'",function(err, programmes){
 				
 				if(err)
 					return res.status(400).end();

 				res.status(200).json(programmes);
 			});
 		});

 	},
	
	getKeywords:function(req, res){
		var keywords = _.map(req.param('keywords'), function(keyword){
			return "'"+ToolsService.clean(keyword)+"'";
		});
		if(keywords.length<2) keywords = "('a')";
		else keywords = "("+keywords.toString()+")";
		Keyword.query("select str, count(*) as compteur from keyword where cleanname like '%"+ToolsService.clean(req.param('keyword'))+"%' and cleanname NOT IN "+keywords+" group by str order by compteur desc limit "+req.param('limit'),function(err, keywords){
			if(err){
				console.log(err);
				return res.status(400).end();
			}
			else
				return res.status(200).json(_.uniq(_.pluck(keywords,'str')));
		});

    // getKeywords: function(req, res) {
    //     Keyword.query("select str, count(*) as compteur from keyword where str like '%" + ToolsService.clean(req.param('keyword')) + "%' and user<>" + req.param('user') + " group by str order by compteur desc limit " + req.param('limit')).exec(function(err, keywords) {
    //         if (err) {
    //             console.log(err);
    //             return res.status(400).end();
    //         } else
    //             return res.status(200).json(keywords);
    //     });

    },

    search: function(req, res){
    	Keyword.find({
    		cleanname : {'contains':  ToolsService.clean(req.param('keyword')), '!': _.pluck(req.param('keywords'),'cleanname')}
    	}, function(err, keywords){

    		if(err){
    			console.log(err);
    			return res.status(400).end();
    		}

    		else
    			res.status(200).json(keywords);
    	});
    }

};
