/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	id:{
  		type:'integer',
  		autoIncrement:true,
  		primaryKey: true
  	},
  	username:{
  		type:'string',
  		required:true
  	},
  	password:{
  		type:'password',
  		required:true,
  		minLength:6
  	},
  	facebook_id:{
  		type:'integer'
  	},
  	is_ios:{
  		type:'boolean'
  	}

  }
};

