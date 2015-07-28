			var cheerio = require('cheerio');
			var request = require('request');
			var moment = require('moment');
			var iconv = require('iconv-lite');



			module.exports={

				getProgrammes:function(date,heure,callbackGeneral){
					var dayData=[];
					var urls =[];
					request({encoding: null,url:'http://programme-tv.com/'+date+'/tnt/'+heure+'/mon-programme-television.html'}, function (error, response, html) {
						html = new Buffer(html);
						html = iconv.decode(html,'iso-8859-1');
						console.log(html);
						if (!error && response.statusCode == 200) {
							var $ = cheerio.load(html); // $ est la page où il y a tous les programmes de l'horaire donné

									urls= _.pluck(_.pluck($('h4').find('a'), 'attribs')  ,'href');
									console.log(urls);
								
									for (var i = urls.length - 1; i >= 0; i--) {
										urls[i] = 'http://www.programme-tv.com/mon-programme-television.html' + urls[i];
									}
								}
						callbackGeneral();


				

				async.eachLimit(urls,50,function(elem,callback){

					request(elem, function (error, response, html) {
						if (!error && response.statusCode == 200) {
						
							var $ = cheerio.load(html);

							var data = {};

							tailleCourante = dayData.length-1;

							data.chaine = $('img[class="img-chaine"]').attr("alt");

							data.heure = $('p[class="label-heure"]').text();
							var texteDuree =  $('p[class="programme-suite"]').text();
							texteDuree = texteDuree.substring(texteDuree.indexOf(':'),texteDuree.indexOf('min'));
							data.duree = texteDuree;
							data.titre = $('span[itemprop="name"]').text();
							data.sousTitre = $('span[itemprop="alternativeHeadline"]').text();
							// 	var texteSousTitre = cheerio.load('<span itemprop="alternativeHeadline">...</span>', {
			   	// 				normalizeWhitespace: true,
			   	// 				xmlMode: true
							// 	});
							// data.sousTitre = texteSousTitre.text();
							data.descriptionProgramme = $('p[itemprop="description"]').text();
							data.castingProgramme = $('div[class="programme-casting onglet"]').text();
							dayData.push(data);
							callback();
							}
					});
				},function(){
					callbackGeneral(dayData);
				});	
			});
			}
		}