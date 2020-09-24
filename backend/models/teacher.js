const mongoose        = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
require('mongoose-type-email');

const teacherSchema = new mongoose.Schema({
  name: {
    firstname : { type: String, required: true },
    lastname  : { type: String, required: true }
  },
  address: {
    country: { type: String, required: true },
    street:  { type: String, required: true },
    zip:     { type: String, required: true },
    city:    { type: String, required: true },
  },
  roll:      { type: String, default: 'teacher' },
  notes:     { type: String, required: true },
  email:     { type: mongoose.SchemaTypes.Email, unique: true },
  phone:     { type: Number, required: true, unique: true },
  ginder:    { type: String, required: true },
  salary:    { type: String, required: true },
  subject:   { type: String, required: true },
  imageUrl:  { type: String, default: '' },
  JobType:   { type: String, required: true },
  creatorId: { type: String, required: true },
  workHours: { type: String, required: true },
  birthdate:  { type: Date,   required: true },
  created_at: { type: Date,   required: true },  
  activeAccount: { type: Boolean, required: true },
  stages: { type: [] },
  educationalStage: { 
    preschool:  { type: Boolean },
    elementary: { type: Boolean },
    middle:     { type: Boolean },
    high:       { type: Boolean },
   },

});

// get  error if user email is exist
// it work by 'mongoose unique validator
// to use it but unique: true like email
teacherSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Teacher', teacherSchema);
