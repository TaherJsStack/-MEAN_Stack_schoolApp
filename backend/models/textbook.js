const mongoose = require('mongoose');

const TextbooSchema = new mongoose.Schema({
  term:       { type: String},
  notes:      { type: String},
  stage:      { type: String},
  level:      { type: String},
  creator:    { type: String, default: 'creator' },
  created_at: { type: Date,   default: new Date() },
  termTextbooks: [],
});

module.exports = mongoose.model('Textbook', TextbooSchema);
