/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var ObjectId = require('mongoose').Schema.Types.ObjectId;

User.find({}).remove(function() {
  User.create({
    _id : ObjectId("565a584b9fad22db2653982f"),
    twitter : { 
      displayName : "Vladimir Efros",
      username : "VEfros",
      token : "4149842657-7HATfFghiPb3xNULVyUTLeeGMCrXQWjwgnTI6Hl",
      id : "4149842657" 
    }
  }, function() {
      console.log('finished populating users');
  });
});