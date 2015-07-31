			var cheerio = require('cheerio');
			var request = require('request');
			var iconv = require('iconv-lite');



			module.exports={

				getProgrammes:function(date,heure,callbackGeneral){
					var dayData=[];
					var urls =[];
					request({encoding: null,url:'http://programme-tv.com/'+date+'/tnt/'+heure+'/mon-programme-television.html'}, function (error, response, html) {
						console.log(error);
						if (!error && response.statusCode == 200) {
							html = new Buffer(html);

							html = iconv.decode(html,'iso-8859-1');
							console.log(html);
							var $ = cheerio.load(html); // $ est la page où il y a tous les programmes de l'horaire donné


							urls= _.pluck(_.pluck($('h4').find('a'), 'attribs')  ,'href');
							console.log(urls);

							for (var i = urls.length - 1; i >= 0; i--) {
								urls[i] = 'http://www.programme-tv.com/mon-programme-television.html' + urls[i];
							}

								//	console.log(urls);


							}
							Keyword.find(function(err,keyWords){
								keyWords = _.uniq(_.pluck(keyWords,'cleanname'));


								async.eachLimit(urls,50,function(elem,callback){

									request({encoding:null, url:elem}, function (error, response, html) {
										if (!error && response.statusCode == 200) {
											
											html = new Buffer(html);
											html = iconv.decode(html,'iso-8859-1');
											var $ = cheerio.load(html);

											var data = {};

											tailleCourante = dayData.length-1;

											data.chaine = $('img[class="img-chaine"]').attr("alt");

											data.heure = $('p[class="label-heure"]').text();
											var texteDuree =  $('p[class="programme-suite"]').text();
											texteDuree = texteDuree.substring(texteDuree.indexOf(':'),texteDuree.indexOf('min'));
											// data.duree = texteDuree;
											data.titre = $('span[itemprop="name"]').text();
											data.soustitre = $('span[itemprop="alternativeHeadline"]').text();

											data.description = $('p[itemprop="description"]').text();
											data.casting = $('div[class="programme-casting onglet"]').text();
											dayData.push(data);
											ScrapperService.createProgramme(data,keyWords,function(){
												callback();
											});
										}
									});
		},function(){
			callbackGeneral(dayData);
		});

		});	
		});
		},

		createProgramme : function(data,keyWords,callback){
			Programme.create(data,function(err,programme){
				var clean = ToolsService.clean(programme.description)+" "+ToolsService.clean(programme.titre);
				var keywords = _.filter(keyWords, function(keyword){
					return clean.indexOf(keyword)>-1;
				});
				console.log(keywords);
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
			});
		}
	}