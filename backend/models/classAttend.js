const mongoose = require('mongoose');

const ClassAttendSchema = new mongoose.Schema({
  day:        { type: String},
  month:      { type: String},
  type:       { type: String},
  notes:      { type: String},
  stage:      { type: String},
  level:      { type: String},
  class:      { type: String},
  students:   { type: []},
  creator:    { type: String, default: 'creator'},
  created_at: { type: Date,   default: new Date() },
  classId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Classes', required: true },
});

module.exports = mongoose.model('ClassAttend',   ClassAttendSchema);
