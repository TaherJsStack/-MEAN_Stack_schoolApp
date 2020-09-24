const mongoose = require('mongoose');

const paySchema = new mongoose.Schema({

  bass:       { type: Number, required: true },
  books:      { type: Number, required: true },
  school:     { type: Number, required: true },
  clothes:    { type: Number, required: true },
  student:    {},
  added_at:   { type: Date, required: true   },
  creator_id: { type: String, required: true },
  student_id:   { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  studentName:  { type: mongoose.Schema.Types.String,   ref: 'Student', required: true },
  studentStage: { type: mongoose.Schema.Types.String,   ref: 'Student', required: true },
});

module.exports = mongoose.model('Payment', paySchema);
