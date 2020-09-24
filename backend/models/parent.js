const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
require('mongoose-type-email');

const parentSchema = new mongoose.Schema({
  name: {
    firstname : { 
      type: String, 
      required: true,
      minlenght: 3,
      maxlength: 15 },
    lastname  : { type: String, required: true }
  },
  address: {
    country: { type: String, required: true },
    street:  { type: String, required: true },
    zip:     { type: String, required: true },
    city:    { type: String, required: true },
  },
  notes:     { type: String },
  job:       { type: String, required: true },
  email:     { type: mongoose.SchemaTypes.Email, unique: true },
  phone:     { type: Number, required: true, unique: true },
  ginder:    { type: String, required: true },
  roll:      { type: String, required: true },
  childes:   { type : Array, default : []},
  imageUrl:  { type: String },
  birthdate:     { type: Date,    required: true },
  created_at:    { type: Date,    default: Date.now },
  parentCodeId:  { type: Number,  required: true},
  activeAccount: { type: Boolean, required: true },
});

// get  error if user email is exist
// it work by 'mongoose unique validator
// to use it but unique: true like email
parentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Parent', parentSchema);
