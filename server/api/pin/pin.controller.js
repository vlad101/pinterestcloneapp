'use strict';

var _ = require('lodash');
var Pin = require('./pin.model');
var ObjectId = require('mongoose').Schema.Types.ObjectId;

// Get list of pins
exports.index = function(req, res) {
  Pin.find(function(err, pins) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(pins.sort({'created': -1}));
  });
};

// Get list of pins by user id
exports.indexByUserId = function(req, res) {
  if(!req.params.userId) { return handleError(res, err); }
  Pin.find({userId:req.params.userId}, function (err, pins) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(pins);
  });
};

// Get a single pin
exports.show = function(req, res) {
  Pin.findById(req.params.id, function (err, pin) {
    if(err) { return handleError(res, err); }
    if(!pin) { return res.status(404).send('Not Found'); }
    return res.json(pin);
  });
};

// Creates a new pin in the DB.
exports.create = function(req, res) {
  Pin.create(req.body.pin, function(err, pin) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(pin);
  });
};

// Updates an existing pin in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Pin.findById(req.params.id, function (err, pin) {
    if (err) { return handleError(res, err); }
    if(!pin) { return res.status(404).send('Not Found'); }
    var updated = _.merge(pin, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(pin);
    });
  });
};

// Updates an existing pin userLike list in the DB.
exports.like = function(req, res) {
  // Find pin by pin id
  Pin.findById(req.params.id, function (err, pin) {
    if (err) { return handleError(res, err); }
    if(!pin) { return res.status(404).send('Not Found'); }
    // Push user to pin userLikes
    pin.userLikes.push(req.body.userId);
    pin.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(pin);
    });
  });
};

// Updates an existing pin userLike list in the DB.
exports.dislike = function(req, res) {
  // Find pin by pin id
  Pin.findById(req.params.id, function (err, pin) {
    if (err) { return handleError(res, err); }
    if(!pin) { return res.status(404).send('Not Found'); }
    // Find a user in user likes by user id
    for(var i = 0; i < pin.userLikes.length; i++){
      // Remove user from pin userLikes
      if(pin.userLikes[i] == req.body.userId)
        pin.userLikes.splice(i, 1);
    }
    pin.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(pin);
    });
  });
};

// Deletes a pin from the DB.
exports.destroy = function(req, res) {
  Pin.findById(req.params.id, function (err, pin) {
    if(err) { return handleError(res, err); }
    if(!pin) { return res.status(404).send('Not Found'); }
    pin.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}