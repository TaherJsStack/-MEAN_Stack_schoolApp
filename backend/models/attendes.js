const mongoose = require('mongoose');

const AttendesSchema = new mongoose.Schema({
  type: { type: String},
  monthAttendes: [{
    month: { type: String},
    dayAttendes: [{
      day:   { type: String},
      class: { type: String},
    }],
  }],
});

module.exports = mongoose.model('Attendes', AttendesSchema);