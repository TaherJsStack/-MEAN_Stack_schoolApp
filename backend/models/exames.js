const mongoose = require('mongoose');

const ExamesSchema = new mongoose.Schema({
  term:       { type: String, required: true},
  notes:      { type: String, required: true},
  stage:      { type: String, required: true},
  level:      { type: String, required: true},
  class:      { type: String, required: true},
  month:      { type: String, required: true},
  type:       { type: String, required: true},
  textbook:   { type: String, required: true},
  fullDegree: { type: Number, required: true},
  creator:    { type: String, default: 'creator' },
  created_at: { type: Date,   default: new Date() },
  studentsDegree: { type: []},
  classId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Classes', required: true },

});

module.exports = mongoose.model('Exames', ExamesSchema);


  // :

