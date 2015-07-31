/**
* Programme.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	chaine:{
  		type:'string'
  	},
  	heure:{
  		type:'string'
  	},
  	duree:{
  		type:'string'
  	},
  	titre:{
  		type:'string'
  	},
  	soustitre:{
  		type:'string'
  	},
  	description:{
  		type:'string',
      size: 2000
  	},
  	casting:{
  		type:'string'
  	},
  }
};

