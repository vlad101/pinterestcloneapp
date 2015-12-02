'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PinSchema = new Schema({
  userId: { type: Schema.Types.ObjectId},
  title: {
            type: String,
            required: true
  },
  source: {
            type: String
  },
  userLikes: {
            type: Array
  },
  created:  { 
            type: Date,
            default: Date.now,
            required: true
  },
  active: Boolean
});

module.exports = mongoose.model('Pin', PinSchema);