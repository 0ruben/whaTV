/**
 * TraitementController
 *
 * @description :: Server-side logic for managing traitements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {

	getData : function (req, res) {
		var moment = require('moment');
	var jour = moment().add(1, 'days').format('DDMMYYYY');
	var heure = moment().add(1, 'days').add(1, 'hours').format('HH');
		ScrapperService.getProgrammes(jour,heure, function(data){
			 _.each(data, function(elem){
			 	console.log(elem.description);
			});
			res.status(200).end();
		})

	}
	
};

