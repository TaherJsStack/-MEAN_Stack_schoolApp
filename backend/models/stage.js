const mongoose = require('mongoose');

const stageSchema = new mongoose.Schema({
  stageName:  { type: String },
  leveles: [{ 
    levelName:  { type: String },
    classesName: [ {
      className: { type: String, require: true }
    }]
   }],
});

module.exports = mongoose.model('Stages', stageSchema);
