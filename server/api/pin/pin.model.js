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
  likes: {
            type: Number,
            default: 0,
            required: true
  },
  active: Boolean
});

module.exports = mongoose.model('Pin', PinSchema);