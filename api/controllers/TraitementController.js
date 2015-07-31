/**
 * TraitementController
 *
 * @description :: Server-side logic for managing traitements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {

	test : function (req, res) {
		var moment = require('moment');
	var jour = moment().add(5, 'days').format('DDMMYYYY');
	var heure = moment().add(5, 'days').add(1, 'hours').format('HH');
		ScrapperService.getProgrammes(jour,heure, function(data){
			// console.log(data);
		
			res.status(200).end();
		})

	}
	
};

