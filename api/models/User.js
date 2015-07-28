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
  		required:true,
  		unique: true
  	},
  	password:{
  		type:'string',
  		// minLength:6
  	},
  	facebook_id:{
  		type:'integer',
  		unique:true
  	},
  	is_ios:{
  		type:'boolean'
  	},
    push_id:{
      type:'string'
    },
    pending_notif: {
      type: 'integer'
    }
  }
};

