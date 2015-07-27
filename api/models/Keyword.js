/**
* Keyword.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	beforeCreate: function (attrs, next) {
		attrs.cleanname = ToolsService.clean(attrs.str);
		next();
	},

attributes: {
	id:{
		type:'integer',
		autoIncrement:true,
		primaryKey: true
	},
	str:{
		type:'string',
		required:true
	},
	user:{
		model:'user'
	},
	cleanname:{
		type:'string'
	}

}
};

