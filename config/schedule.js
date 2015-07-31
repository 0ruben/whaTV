/**
 * Created by jaumard on 27/02/2015.
 */
module.exports.schedule = {
	//Every day at 6PM
   "0 * * * *"   : function ()
   {
   
	var jour = moment().add(5, 'days').format('DDMMYY');
	var heure = jour.format('HH')+1;
	ScrapperService.getProgrammes(heure, jour, function(programmes){

	});
   }
};
