'use strict';

var _ = require('lodash');

// Get user session
exports.getUserSession = function(req, res) {
  return res.status(200).json(req.session.user);
};

function handleError(res, err) {
  return res.status(500).send(err);
}