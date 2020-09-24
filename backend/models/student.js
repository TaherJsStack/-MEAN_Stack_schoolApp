const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
require('mongoose-type-email');

const studentSchema = new mongoose.Schema({
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
  cardId:        { type: String, required: true },
  notes:         { type: String, required: true },
  email:         { type: mongoose.SchemaTypes.Email, required: true, unique: true },
  phone:         { type: Number, required: true, unique: true },
  ginder:        { type: String, required: true },
  roll:          { type: String, default: 'student' },
  level:         { type: String, required: true },
  className:     { type: String, default: ''},
  QRCodePath:    {  },
  QRCodeValue:   {  },
  payBus:        { type: Boolean },
  hasBus:        { type: Boolean },
  payBook:       { type: Boolean },
  hasBook:       { type: Boolean },
  imageUrl:      { type: String },
  haveClass:     { type: Boolean, default: false },
  birthdate:     { type: Date,   required: true },
  created_at:    { type: Date,   default: new Date()},
  activeAccount: { type: Boolean, required: true },
  creatorId:     { type: mongoose.Schema.Types.ObjectId,ref: 'Auth', required: true },
  creatorName:   { type: mongoose.Schema.Types.String, ref: 'Auth', required: true  },
  parentEmail:   { type: mongoose.Schema.Types.String, ref: 'Parent', required: true },
  parentPhone:   { type: mongoose.Schema.Types.Number, ref: 'Parent', required: true },
  educationalStage: { type: String , required: true },
  expenses: {
    bass:       { type: Boolean },
    books:      { type: Boolean },
    school:     { type: Boolean },
    clothes:    { type: Boolean },
  },

});

// get  error if user email is exist
// it work by 'mongoose unique validator
// to use it but unique: true like email
studentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Student', studentSchema);
