'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var mongooseTypes = require("mongoose-types");
mongooseTypes.loadTypes(mongoose, "url");
var Url = mongoose.SchemaTypes.Url;

var PinSchema = new Schema({
  userId: { type: Schema.Types.ObjectId},
  title: {
            type: String,
            required: true
  },
  source: {
            type: Url,
            required: true
  },
  likes: {
            type: Number,
            default: 0,
            required: true
  },
  active: Boolean
});

module.exports = mongoose.model('Pin', PinSchema);