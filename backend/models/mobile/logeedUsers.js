const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const LogeedUser = new mongoose.Schema({
  uuid:          { type: String},
  userId:        { type: String},
  fcmToken:      { type: String },
  fullPhoneInfo: { type: []},
  fullUserData:  { type: []},
  created_at: { type: Date, default: new Date() },
});

LogeedUser.plugin(uniqueValidator)

module.exports = mongoose.model('LogeedUser', LogeedUser);
