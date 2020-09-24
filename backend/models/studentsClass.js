const mongoose = require('mongoose');

const studentsClassSchema = new mongoose.Schema({
    stageId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Stages', required: true },
    levelId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Stages', required: true },
    stageName: { type: mongoose.Schema.Types.String,   ref: 'Stages', required: true },
    levelName: { type: mongoose.Schema.Types.String,   ref: 'Stages', required: true },
    className: { type: String},
    exameDegree:  { type: []},
    students:  { type: []},
    subjects:  { type: []},
});
// created_at: { type: Date, default: new Date() },
// creator:    { type: String },

module.exports = mongoose.model('Classes', studentsClassSchema);
