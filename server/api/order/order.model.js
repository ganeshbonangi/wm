'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({

  location: Object,
  empCount: Number,
  typeOfWork: String,
  typeOfShift: String,
  availebleDay: Array,
  startDate: String,
  endDate: String,
  endTime: String,
  startTime: String,
  desc: String,
  mob: Number,
  email: String,
  status:String,
  userId:Object,
  handledby:String,
  placed:String

});

module.exports = mongoose.model('Order', OrderSchema);