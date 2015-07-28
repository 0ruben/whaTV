/**
 * Created by jaumard on 27/02/2015.
 */
module.exports.schedule = {
	//Every day at 6PM
   "0 18 * * *"   : function ()
   {
        Keyword.query("select * from keyword group by keyword").exec(function(err, keywords){
        	
        })
   }
};
