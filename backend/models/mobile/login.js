const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
require('mongoose-type-email');

const loginSchema = new mongoose.Schema({
  auth:       { type: []},
  roll:       { type: String, required: true},
  email:      { type: mongoose.SchemaTypes.Email, required: true, unique: true},
  password:   { type: String},
  created_at: { type: Date, default: new Date() },
});

loginSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Login', loginSchema);
