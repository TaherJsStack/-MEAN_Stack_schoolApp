const mongoose = require('mongoose');

const BusAttendSchema = new mongoose.Schema({
  day:        { type: String},
  month:      { type: String},
  type:       { type: String},
  area:       { type: String},
  busNo:      { type: String},
  notes:      { type: String},
  drivar:     { type: String},
  supervisor: { type: String},
  students:   { type: []},
  creator:    { type: String, default: 'creator'},
  created_at: { type: Date,   default: new Date() },
  busId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },

});

module.exports = mongoose.model('BusAttend',   BusAttendSchema);
