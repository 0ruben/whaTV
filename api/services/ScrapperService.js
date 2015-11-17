 var cheerio = require('cheerio');
var request = require('request');
var iconv = require('iconv-lite');



module.exports={

	getProgrammes:function(date,heure,callbackGeneral){
		var list_progs=[];
		var page_encoding = 'utf-8';
		var selectors = {'time' : '.case_horaire', 'channel' : 'h3', 'title': '.case_horaire a', 'desc' : '.case_horaire a'};
		request({encoding: page_encoding,url:'http://webnext.fr/programme-tv-rss/epg_cache/programme-tv-rss_'+date+'.xml'}, function (error, response, html) {
			
			if (!error && response.statusCode == 200) {
				html = new Buffer(html);
				html = iconv.decode(html,page_encoding);
				var $ = cheerio.load(html); // $ est la page où il y a tous les programmes de l'horaire donné
	
				async.each($(selectors['channel']), function(channel, callback){ //Loops over all channels
					var channel_name = $(channel).text();
					var all_progs = $(channel).next().children($(selectors['time']));

					if(all_progs.length == 0)
						callback();

					_.each(all_progs, function(programme, index){ //Loops over all programmes
						prog = {};
						prog.heure = $(programme).text().substring(0,5);
						prog.chaine = channel_name;
						prog.titre = ToolsService.cleanHtml($(programme).children('a').text());
						var description = ToolsService.cleanHtml($(programme).children('a').attr('data-content'));
						prog.soustitre = description.substring(0, description.indexOf('>'));
						prog.description = description.substring(description.indexOf('>')+1, description.length);
						list_progs.push(prog);

						if(index == all_progs.length - 1){
							callback();
						}

					});

				},function(){
					ScrapperService.createProgramme(list_progs,function(){
						callbackGeneral(list_progs);
					});
				});

			}
		});
	},

	createProgramme : function(data,cb){
		Keyword.find(function(err,keyWords){
			keyWords = _.uniq(_.pluck(keyWords,'cleanname'));

			Programme.create(data,function(err,programmes){

				async.each(programmes,function(programme,callback){

					var clean = ToolsService.clean(programme.description)+" "+ToolsService.clean(programme.titre);
					var keywords = _.filter(keyWords, function(keyword){ return clean.indexOf(keyword)>-1; });

					if(keywords.length>0){
						_.each(keywords,function(keyword,index){
							KeywordProgramme.create({keyword: keyword,programme: programme.id},function(err,elem){
								
								if(index == keywords.length-1)
									callback();

							});
						});
					}

					else 
						callback();

				},function(){
					cb();
				});
			});
		});
	}
}
