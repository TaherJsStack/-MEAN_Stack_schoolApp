const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  imageUrl:    { type: String, required: true },
  title:       { type: String, required: true },
  bookAuth:    { type: String, required: true },
  subject:     { type: String, required: true },
  description: { type: String, required: true },
  created_at:  { type: Date,   default:  new Date()},
  creator:     { type: String },
});


module.exports = mongoose.model('Library', bookSchema);
