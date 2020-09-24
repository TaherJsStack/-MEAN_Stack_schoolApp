const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
require('mongoose-type-email');

const SocialLoginSchema = new mongoose.Schema({
  id:        { type: String},
  name:      { type: String},
  email:     { type: String},
  photoUrl:  { type: String},
  firstName: { type: String},
  lastName:  { type: String},
  authToken: { type: String},
  facebook:  { type: []},
  provider:  { type: String},
  created_at: { type: Date, default: new Date() },
});

SocialLoginSchema.plugin(uniqueValidator)

module.exports = mongoose.model('SocialLogin', SocialLoginSchema);
