const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  area:       { type: String, required: true}, 
  city:       { type: String, required: true}, 
  busNo:      { type: String, required: true}, 
  drivar:     { type: String, required: true},
  students:   { type: []},
  supervisor: { type: String, required: true},
  creator:    { type: String, default: 'creator'},
  created_at: { type: Date, default: new Date() },
});

module.exports = mongoose.model('Bus', BusSchema);
