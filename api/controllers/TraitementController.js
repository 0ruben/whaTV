/**
 * TraitementController
 *
 * @description :: Server-side logic for managing traitements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {

	test : function (req, res) {

		TraitementService.test('27', function(data){
			console.log(data);
		
			res.status(200).end();
		})

	}
	
};

